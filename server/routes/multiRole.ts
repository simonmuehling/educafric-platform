import { Router } from "express";
import { MultiRoleDetectionService } from "../services/multiRoleDetectionService";
import { storage } from "../storage";
import bcrypt from "bcrypt";

const router = Router();

// Detect potential roles based on phone number
router.post("/detect-roles", async (req, res) => {
  try {
    const { phoneNumber, email } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    
    const suggestions = await MultiRoleDetectionService.detectPotentialRoles(phoneNumber, email);
    
    res.json(suggestions);
  } catch (error: any) {
    console.error('[MULTI_ROLE] Error detecting roles:', error);
    res.status(500).json({ 
      message: "Error detecting roles", 
      error: error.message 
    });
  }
});

// Register user with multiple roles
router.post("/register-multi-role", async (req, res) => {
  try {
    const { userData, selectedRoles } = req.body;
    
    if (!userData || !selectedRoles || selectedRoles.length === 0) {
      return res.status(400).json({ 
        message: "User data and selected roles are required" 
      });
    }
    
    // Check if user already exists
    const existingUser = await storage.getUserByPhone(userData.phone);
    if (existingUser) {
      return res.status(409).json({ 
        message: "User with this phone number already exists" 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    // Create user with primary role
    const primaryRole = selectedRoles[0];
    const newUser = await storage.createUser({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      phone: userData.phone,
      role: primaryRole.role,
      schoolId: primaryRole.role.includes('Teacher') || primaryRole.role.includes('Director') || primaryRole.role.includes('Admin') 
        ? primaryRole.affiliationId : undefined,
      preferredLanguage: userData.preferredLanguage || 'fr'
    });
    
    // Add secondary roles
    for (let i = 1; i < selectedRoles.length; i++) {
      await storage.addUserRole(newUser.id, selectedRoles[i]);
    }
    
    // Return user without password
    const { password, ...userResponse } = newUser;
    
    res.status(201).json({
      message: "Multi-role user created successfully",
      user: userResponse,
      roles: selectedRoles
    });
    
  } catch (error: any) {
    console.error('[MULTI_ROLE] Error creating multi-role user:', error);
    res.status(500).json({ 
      message: "Error creating user", 
      error: error.message 
    });
  }
});

// Get multi-role options for existing user
router.get("/user-roles/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const roleOptions = await MultiRoleDetectionService.getMultiRoleOptions(userId);
    
    res.json(roleOptions);
  } catch (error: any) {
    console.error('[MULTI_ROLE] Error getting user roles:', error);
    res.status(500).json({ 
      message: "Error getting user roles", 
      error: error.message 
    });
  }
});

// Add additional role to existing user
router.post("/add-role/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { role, affiliationId, affiliationName } = req.body;
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    if (!role || !affiliationId) {
      return res.status(400).json({ 
        message: "Role and affiliation ID are required" 
      });
    }
    
    await storage.addUserRole(userId, {
      role,
      schoolId: role.includes('Teacher') || role.includes('Director') || role.includes('Admin') 
        ? affiliationId : undefined,
      isActive: true,
      createdAt: new Date()
    });
    
    res.json({
      message: "Role added successfully",
      role,
      affiliationName
    });
    
  } catch (error: any) {
    console.error('[MULTI_ROLE] Error adding role:', error);
    res.status(500).json({ 
      message: "Error adding role", 
      error: error.message 
    });
  }
});

// Get schools where user can work as teacher
router.get("/teacher-schools/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Get schools where teacher is affiliated
    const teacherSchools = await storage.getTeachersByPhone(user.phone);
    
    // Get current school if any
    const currentSchool = user.schoolId ? await storage.getSchool(user.schoolId) : null;
    
    const schools = teacherSchools.map(t => ({
      id: t.id,
      name: t.schoolName,
      position: t.position,
      isCurrent: currentSchool?.id === t.id
    }));
    
    res.json({
      currentSchool: currentSchool ? {
        id: currentSchool.id,
        name: currentSchool.name
      } : null,
      affiliatedSchools: schools,
      canManageMultiple: schools.length > 1
    });
    
  } catch (error: any) {
    console.error('[MULTI_ROLE] Error getting teacher schools:', error);
    res.status(500).json({ 
      message: "Error getting teacher schools", 
      error: error.message 
    });
  }
});

// Switch teacher's active school
router.post("/switch-school/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { schoolId } = req.body;
    
    if (isNaN(userId) || !schoolId) {
      return res.status(400).json({ 
        message: "Valid user ID and school ID are required" 
      });
    }
    
    // Verify user is affiliated with this school
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const teacherSchools = await storage.getTeachersByPhone(user.phone);
    const canAccess = teacherSchools.some(t => t.id === schoolId);
    
    if (!canAccess) {
      return res.status(403).json({ 
        message: "User is not affiliated with this school" 
      });
    }
    
    // Update user's active school
    const updatedUser = await storage.updateUser(userId, { schoolId });
    
    const school = await storage.getSchool(schoolId);
    
    res.json({
      message: "School switched successfully",
      currentSchool: {
        id: school?.id,
        name: school?.name
      },
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        role: updatedUser.role,
        schoolId: updatedUser.schoolId
      }
    });
    
  } catch (error: any) {
    console.error('[MULTI_ROLE] Error switching school:', error);
    res.status(500).json({ 
      message: "Error switching school", 
      error: error.message 
    });
  }
});

export default router;