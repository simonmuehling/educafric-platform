// Real-time Geolocation Family Safety Network API Routes
import { Request, Response } from 'express';
import { z } from 'zod';
import { geolocationService } from '../services/geolocationService';
import { storage } from '../storage';
import { requireAuth } from '../middleware/auth';

// Validation schemas
const updateLocationSchema = z.object({
  deviceId: z.number(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracy: z.number().optional(),
  altitude: z.number().optional(),
  speed: z.number().optional(),
  heading: z.number().optional()
});

const createSafeZoneSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  centerLatitude: z.number().min(-90).max(90),
  centerLongitude: z.number().min(-180).max(180),
  radius: z.number().min(10).max(5000), // 10m to 5km
  zoneType: z.enum(['school', 'home', 'family', 'medical', 'emergency']),
  schoolId: z.number().optional(),
  allowedTimeStart: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  allowedTimeEnd: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  allowedDays: z.array(z.string()).optional()
});

const emergencyPanicSchema = z.object({
  deviceId: z.number(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  panicType: z.enum(['medical', 'security', 'lost', 'accident']),
  message: z.string().max(500).optional()
});

const createFamilyNetworkSchema = z.object({
  familyName: z.string().min(1).max(100),
  emergencyContacts: z.array(z.object({
    name: z.string(),
    phone: z.string(),
    relationship: z.string()
  })).optional()
});

// Update device location
export async function updateLocation(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const validation = updateLocationSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid location data',
        errors: validation.error.errors
      });
    }

    const locationData = {
      ...validation.data,
      userId: user.id,
      timestamp: new Date()
    };

    const result = await geolocationService.updateLocation(locationData);
    
    res.json({
      success: result.success,
      alerts: result.alerts,
      safeZoneStatus: result.safeZoneStatus,
      timestamp: locationData.timestamp
    });
  } catch (error) {
    console.error('[GEOLOCATION_API] Update location failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update location' 
    });
  }
}

// Get family locations
export async function getFamilyLocations(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    // Mock family network and locations for testing
    const locations = [
      {
        userId: 25,
        userName: "Marie Kamdem",
        role: "child",
        latitude: 4.0511,
        longitude: 9.7679,
        accuracy: 5,
        timestamp: new Date().toISOString(),
        isOnline: true,
        address: "École Saint-Paul, Douala"
      },
      {
        userId: 24,
        userName: "Jean-Pierre Kamdem", 
        role: "parent",
        latitude: 4.0501,
        longitude: 9.7669,
        accuracy: 8,
        timestamp: new Date().toISOString(),
        isOnline: true,
        address: "Bureau, Akwa, Douala"
      }
    ];
    
    res.json({
      success: true,
      familyName: "Famille Kamdem",
      locations,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('[GEOLOCATION_API] Get family locations failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get family locations' 
    });
  }
}

// Create safe zone
export async function createSafeZone(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const validation = createSafeZoneSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid safe zone data',
        errors: validation.error.errors
      });
    }

    // Mock family network for testing
    const zoneData = {
      ...validation.data,
      familyId: 1, // Mock family ID
      createdBy: user.id
    };

    const safeZone = await geolocationService.createSafeZone(zoneData);
    
    res.json({
      success: true,
      safeZone,
      message: `Safe zone "${zoneData.name}" created successfully`
    });
  } catch (error) {
    console.error('[GEOLOCATION_API] Create safe zone failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create safe zone' 
    });
  }
}

// Get safe zones for family
export async function getSafeZones(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    // Mock safe zones for testing
    const safeZones = [
      {
        id: 1,
        name: "École Saint-Paul",
        description: "Zone scolaire avec horaires de cours",
        centerLatitude: "4.0511",
        centerLongitude: "9.7679",
        radius: 300,
        zoneType: "school",
        isActive: true,
        allowedTimeStart: "07:00",
        allowedTimeEnd: "18:00",
        allowedDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        createdAt: new Date()
      },
      {
        id: 2,
        name: "Maison familiale",
        description: "Domicile de la famille Kamdem",
        centerLatitude: "4.0501",
        centerLongitude: "9.7669", 
        radius: 200,
        zoneType: "home",
        isActive: true,
        allowedTimeStart: "00:00",
        allowedTimeEnd: "23:59",
        allowedDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        createdAt: new Date()
      }
    ];
    
    res.json({
      success: true,
      safeZones,
      familyName: "Famille Kamdem"
    });
  } catch (error) {
    console.error('[GEOLOCATION_API] Get safe zones failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get safe zones' 
    });
  }
}

// Trigger emergency panic
export async function triggerEmergencyPanic(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const validation = emergencyPanicSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid emergency data',
        errors: validation.error.errors
      });
    }

    const panicData = {
      ...validation.data,
      userId: user.id
    };

    const result = await geolocationService.triggerEmergencyPanic(panicData);
    
    if (result.success) {
      res.json({
        success: true,
        emergencyId: result.emergencyId,
        message: 'Emergency alert sent to family members',
        responseTime: result.responseTime
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to process emergency alert' 
      });
    }
  } catch (error) {
    console.error('[GEOLOCATION_API] Emergency panic failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process emergency alert' 
    });
  }
}

// Create family network
export async function createFamilyNetwork(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const validation = createFamilyNetworkSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid family network data',
        errors: validation.error.errors
      });
    }

    // Check if user already has a family network
    const existingNetwork = await storage.getFamilyNetworkByUserId(user.id);
    if (existingNetwork) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already belongs to a family network' 
      });
    }

    const familyNetwork = await storage.createFamilyNetwork({
      familyName: validation.data.familyName,
      primaryParentId: user.id,
      emergencyContacts: validation.data.emergencyContacts || [],
      sharedLocationEnabled: true,
      emergencyMode: false
    });

    // Add creator as primary parent member
    await storage.createFamilyNetworkMember({
      familyNetworkId: familyNetwork.id,
      userId: user.id,
      memberRole: 'parent',
      canTrackOthers: true,
      canBeTracked: true,
      receiveAlerts: true,
      emergencyPermissions: true
    });

    // Create default safe zones
    await geolocationService.createDefaultSafeZones(familyNetwork.id);
    
    res.json({
      success: true,
      familyNetwork,
      message: `Family network "${validation.data.familyName}" created successfully`
    });
  } catch (error) {
    console.error('[GEOLOCATION_API] Create family network failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create family network' 
    });
  }
}

// Get geofence alerts
export async function getGeofenceAlerts(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const { limit = 50, severity } = req.query;
    const familyNetwork = await storage.getFamilyNetworkByUserId(user.id);
    
    if (!familyNetwork) {
      return res.status(404).json({ 
        success: false, 
        message: 'Family network not found' 
      });
    }

    const alerts = await storage.getGeofenceAlerts(
      familyNetwork.id, 
      parseInt(limit as string), 
      severity as string
    );
    
    res.json({
      success: true,
      alerts,
      totalCount: alerts.length
    });
  } catch (error) {
    console.error('[GEOLOCATION_API] Get geofence alerts failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get geofence alerts' 
    });
  }
}

// Get location analytics
export async function getLocationAnalytics(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const { period = '7d', userId } = req.query;
    const targetUserId = userId ? parseInt(userId as string) : user.id;

    // Check permissions
    if (targetUserId !== user.id) {
      const familyNetwork = await storage.getFamilyNetworkByUserId(user.id);
      if (!familyNetwork) {
        return res.status(403).json({ 
          success: false, 
          message: 'Insufficient permissions' 
        });
      }

      const member = await storage.getFamilyNetworkMember(familyNetwork.id, user.id);
      if (!member || !member.canTrackOthers) {
        return res.status(403).json({ 
          success: false, 
          message: 'Insufficient permissions to view analytics' 
        });
      }
    }

    const analytics = await storage.getLocationAnalytics(targetUserId, period as string);
    
    res.json({
      success: true,
      analytics,
      period,
      userId: targetUserId
    });
  } catch (error) {
    console.error('[GEOLOCATION_API] Get location analytics failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get location analytics' 
    });
  }
}

// Register device
export async function registerDevice(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const { deviceName, deviceType, deviceId, parentalControl = false } = req.body;

    if (!deviceName || !deviceType || !deviceId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Device name, type, and ID are required' 
      });
    }

    const device = await storage.createFamilyDevice({
      userId: user.id,
      deviceName,
      deviceType,
      deviceId,
      isActive: true,
      parentalControl,
      emergencyContact: user.phone
    });

    res.json({
      success: true,
      device,
      message: `Device "${deviceName}" registered successfully`
    });
  } catch (error) {
    console.error('[GEOLOCATION_API] Register device failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to register device' 
    });
  }
}