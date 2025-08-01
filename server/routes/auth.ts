import { Router } from 'express';
import { AuthService } from '../services/authService';
import { ProfileService } from '../services/profileService';
import { asyncHandler, requireAuth } from '../middleware/errorHandler';
import { validateBody } from '../middleware/validation';
import { 
  createUserSchema, 
  loginSchema, 
  passwordResetRequestSchema, 
  passwordResetSchema, 
  changePasswordSchema,
  updateProfileSchema 
} from '@shared/schemas';

const router = Router();

// Register
router.post('/register', 
  validateBody(createUserSchema),
  asyncHandler(async (req, res) => {
    const user = await AuthService.register(req.body);
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Registration successful but session creation failed' 
        });
      }
      res.json({ 
        success: true, 
        message: 'Registration successful', 
        data: user 
      });
    });
  })
);

// Login
router.post('/login',
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const user = await AuthService.login(req.body);
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Login successful but session creation failed' 
        });
      }
      res.json({ 
        success: true, 
        message: 'Login successful', 
        data: user 
      });
    });
  })
);

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Logout failed' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Logout successful' 
    });
  });
});

// Get current user
router.get('/me', requireAuth, asyncHandler(async (req, res) => {
  const user = await ProfileService.getProfile((req.user as any).id);
  res.json({ 
    success: true, 
    data: user 
  });
}));

// Password reset request
router.post('/forgot-password',
  validateBody(passwordResetRequestSchema),
  asyncHandler(async (req, res) => {
    const result = await AuthService.requestPasswordReset(req.body);
    res.json({ 
      success: true, 
      ...result 
    });
  })
);

// Password reset
router.post('/reset-password',
  validateBody(passwordResetSchema),
  asyncHandler(async (req, res) => {
    const result = await AuthService.resetPassword(req.body);
    res.json({ 
      success: true, 
      ...result 
    });
  })
);

// Change password
router.post('/change-password',
  requireAuth,
  validateBody(changePasswordSchema),
  asyncHandler(async (req, res) => {
    const result = await AuthService.changePassword((req.user as any).id, req.body);
    res.json({ 
      success: true, 
      ...result 
    });
  })
);

// Update profile
router.patch('/profile',
  requireAuth,
  validateBody(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const profile = await ProfileService.updateProfile((req.user as any).id, req.body);
    res.json({ 
      success: true, 
      data: profile 
    });
  })
);

// Delete account
router.delete('/account',
  requireAuth,
  asyncHandler(async (req, res) => {
    const result = await ProfileService.deleteAccount((req.user as any).id);
    req.logout((err) => {
      if (err) console.error('Logout error after deletion:', err);
    });
    res.json({ 
      success: true, 
      ...result 
    });
  })
);

export default router;