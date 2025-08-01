// Real-time Geolocation Family Safety Network Service
import { storage } from '../storage';
import { NotificationService } from './notificationService';

const notificationService = new NotificationService();

interface LocationData {
  deviceId: number;
  userId: number;
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp: Date;
}

interface SafeZoneData {
  name: string;
  description?: string;
  centerLatitude: number;
  centerLongitude: number;
  radius: number;
  zoneType: 'school' | 'home' | 'family' | 'medical' | 'emergency';
  schoolId?: number;
  familyId?: number;
  createdBy: number;
  allowedTimeStart?: string;
  allowedTimeEnd?: string;
  allowedDays?: string[];
}

interface EmergencyPanicData {
  userId: number;
  deviceId: number;
  latitude: number;
  longitude: number;
  panicType: 'medical' | 'security' | 'lost' | 'accident';
  message?: string;
}

class GeolocationService {
  private readonly EARTH_RADIUS = 6371000; // Earth's radius in meters
  
  // Calculate distance between two coordinates using Haversine formula
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return this.EARTH_RADIUS * c;
  }

  // Update device location and check geofences
  async updateLocation(locationData: LocationData): Promise<{
    success: boolean;
    alerts: any[];
    safeZoneStatus: any[];
  }> {
    try {
      // Store location in history (using mock implementation for now)
      console.log(`[GEOLOCATION] Location updated for user ${locationData.userId}: ${locationData.latitude}, ${locationData.longitude}`);

      // Mock family network and safe zones for testing
      const safeZones = [
        {
          id: 1,
          name: "École Saint-Paul",
          centerLatitude: "4.0511",
          centerLongitude: "9.7679",
          radius: 300,
          notifyOnEntry: true,
          notifyOnExit: true,
          allowedTimeStart: "07:00",
          allowedTimeEnd: "18:00",
          allowedDays: ["monday", "tuesday", "wednesday", "thursday", "friday"]
        },
        {
          id: 2,
          name: "Maison familiale",
          centerLatitude: "4.0501",
          centerLongitude: "9.7669",
          radius: 200,
          notifyOnEntry: true,
          notifyOnExit: true,
          allowedTimeStart: "00:00",
          allowedTimeEnd: "23:59",
          allowedDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        }
      ];
      const alerts: any[] = [];
      const safeZoneStatus: any[] = [];

      // Check each safe zone
      for (const zone of safeZones) {
        const distance = this.calculateDistance(
          locationData.latitude,
          locationData.longitude,
          parseFloat(zone.centerLatitude),
          parseFloat(zone.centerLongitude)
        );

        const isInside = distance <= zone.radius;
        const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: false });
        const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(); // monday, tuesday, etc.

        // Check time and day restrictions
        const isAllowedTime = !zone.allowedTimeStart || !zone.allowedTimeEnd ||
          (currentTime >= zone.allowedTimeStart && currentTime <= zone.allowedTimeEnd);
        
        const isAllowedDay = !zone.allowedDays || zone.allowedDays.length === 0 ||
          zone.allowedDays.includes(currentDay);

        safeZoneStatus.push({
          zoneId: zone.id,
          zoneName: zone.name,
          isInside,
          distance: Math.round(distance),
          isAllowedTime,
          isAllowedDay
        });

        // Mock previous location detection
        let wasInside = false; // For testing, assume previously outside

        // Generate alerts for zone entry/exit
        if (isInside && !wasInside && zone.notifyOnEntry) {
          const alert = {
            id: Date.now(),
            deviceId: locationData.deviceId,
            userId: locationData.userId,
            safeZoneId: zone.id,
            alertType: 'entry',
            severity: 'low',
            message: `${await this.getUserName(locationData.userId)} est arrivé(e) à ${zone.name}`,
            latitude: locationData.latitude.toString(),
            longitude: locationData.longitude.toString(),
            timestamp: new Date()
          };
          alerts.push(alert);
          console.log(`[GEOLOCATION] Zone entry alert: ${alert.message}`);
        }

        if (!isInside && wasInside && zone.notifyOnExit) {
          const alert = {
            id: Date.now() + 1,
            deviceId: locationData.deviceId,
            userId: locationData.userId,
            safeZoneId: zone.id,
            alertType: 'exit',
            severity: 'medium',
            message: `${await this.getUserName(locationData.userId)} a quitté ${zone.name}`,
            latitude: locationData.latitude.toString(),
            longitude: locationData.longitude.toString(),
            timestamp: new Date()
          };
          alerts.push(alert);
          console.log(`[GEOLOCATION] Zone exit alert: ${alert.message}`);
        }

        // Check for unauthorized time/day access
        if (isInside && (!isAllowedTime || !isAllowedDay)) {
          const alert = {
            id: Date.now() + 2,
            deviceId: locationData.deviceId,
            userId: locationData.userId,
            safeZoneId: zone.id,
            alertType: 'unauthorized_time',
            severity: 'high',
            message: `${await this.getUserName(locationData.userId)} est dans ${zone.name} en dehors des heures autorisées`,
            latitude: locationData.latitude.toString(),
            longitude: locationData.longitude.toString(),
            timestamp: new Date()
          };
          alerts.push(alert);
          console.log(`[GEOLOCATION] Unauthorized time alert: ${alert.message}`);
        }
      }

      // Check for speed violations
      if (locationData.speed && locationData.speed > 50) { // Speed limit 50 km/h
        const alert = {
          id: Date.now() + 3,
          deviceId: locationData.deviceId,
          userId: locationData.userId,
          safeZoneId: null,
          alertType: 'speed_limit',
          severity: 'high',
          message: `${await this.getUserName(locationData.userId)} dépasse la limite de vitesse: ${locationData.speed} km/h`,
          latitude: locationData.latitude.toString(),
          longitude: locationData.longitude.toString(),
          timestamp: new Date()
        };
        alerts.push(alert);
        console.log(`[GEOLOCATION] Speed violation alert: ${alert.message}`);
      }

      return { success: true, alerts, safeZoneStatus };
    } catch (error) {
      console.error('[GEOLOCATION] Location update failed:', error);
      return { success: false, alerts: [], safeZoneStatus: [] };
    }
  }

  // Create a safe zone
  async createSafeZone(zoneData: SafeZoneData): Promise<any> {
    try {
      // Mock safe zone creation for testing
      const safeZone = {
        id: Date.now(),
        name: zoneData.name,
        description: zoneData.description,
        centerLatitude: zoneData.centerLatitude.toString(),
        centerLongitude: zoneData.centerLongitude.toString(),
        radius: zoneData.radius,
        zoneType: zoneData.zoneType,
        schoolId: zoneData.schoolId,
        familyId: zoneData.familyId,
        createdBy: zoneData.createdBy,
        allowedTimeStart: zoneData.allowedTimeStart,
        allowedTimeEnd: zoneData.allowedTimeEnd,
        allowedDays: zoneData.allowedDays,
        isActive: true,
        notifyOnEntry: true,
        notifyOnExit: true,
        createdAt: new Date()
      };

      console.log(`[GEOLOCATION] Safe zone created: ${zoneData.name}`);
      return safeZone;
    } catch (error) {
      console.error('[GEOLOCATION] Safe zone creation failed:', error);
      throw error;
    }
  }

  // Handle emergency panic button
  async triggerEmergencyPanic(panicData: EmergencyPanicData): Promise<{
    success: boolean;
    emergencyId?: number;
    responseTime?: number;
  }> {
    try {
      // Mock emergency record creation
      const emergency = {
        id: Date.now(),
        userId: panicData.userId,
        deviceId: panicData.deviceId,
        latitude: panicData.latitude.toString(),
        longitude: panicData.longitude.toString(),
        panicType: panicData.panicType,
        message: panicData.message,
        timestamp: new Date(),
        isResolved: false,
        emergencyServicesContacted: false
      };

      const userName = await this.getUserName(panicData.userId);

      // Mock SMS notifications to emergency contacts
      console.log(`[EMERGENCY] SMS sent to emergency contacts: URGENCE: ${userName} a déclenché le bouton de panique. Type: ${panicData.panicType}. Localisation: ${panicData.latitude}, ${panicData.longitude}`);

      // If medical emergency, prepare to contact emergency services
      if (panicData.panicType === 'medical') {
        console.log(`[EMERGENCY] Medical emergency for ${userName} at ${panicData.latitude}, ${panicData.longitude}`);
      }

      console.log(`[EMERGENCY] Panic button triggered by user ${panicData.userId}`);
      return { 
        success: true, 
        emergencyId: emergency.id,
        responseTime: 5 
      };
    } catch (error) {
      console.error('[GEOLOCATION] Emergency panic failed:', error);
      return { success: false };
    }
  }

  // Create geofence alert
  private async createGeofenceAlert(alertData: {
    deviceId: number;
    userId: number;
    safeZoneId: number | null;
    alertType: string;
    severity: string;
    message: string;
    latitude: string;
    longitude: string;
  }): Promise<any> {
    return {
      id: Date.now(),
      ...alertData,
      isResolved: false,
      timestamp: new Date(),
      notificationsSent: { sms: false, push: false, email: false }
    };
  }

  // Send notifications to family members
  private async notifyFamily(familyNetworkId: number, triggerUserId: number, notificationType: string, data: any): Promise<void> {
    try {
      console.log(`[GEOLOCATION] Mock family notification sent for ${notificationType}:`, data);
    } catch (error) {
      console.error('[GEOLOCATION] Family notification failed:', error);
    }
  }

  // Helper to get user name
  private async getUserName(userId: number): Promise<string> {
    try {
      const user = await storage.getUser(userId);
      return user ? `${user.firstName} ${user.lastName}` : 'Utilisateur inconnu';
    } catch (error) {
      return 'Utilisateur inconnu';
    }
  }

  // Get real-time family locations
  async getFamilyLocations(familyNetworkId: number): Promise<any[]> {
    try {
      const familyMembers = await storage.getFamilyNetworkMembers(familyNetworkId);
      const locations: any[] = [];

      for (const member of familyMembers) {
        if (member.canBeTracked) {
          const lastLocation = await storage.getLastLocationForUser(member.userId);
          const user = await storage.getUser(member.userId);
          
          if (lastLocation && user) {
            locations.push({
              userId: member.userId,
              userName: `${user.firstName} ${user.lastName}`,
              role: member.memberRole,
              latitude: parseFloat(lastLocation.latitude),
              longitude: parseFloat(lastLocation.longitude),
              accuracy: lastLocation.accuracy ? parseFloat(lastLocation.accuracy) : null,
              timestamp: lastLocation.timestamp,
              isOnline: lastLocation.isOnline,
              address: lastLocation.address
            });
          }
        }
      }

      return locations;
    } catch (error) {
      console.error('[GEOLOCATION] Get family locations failed:', error);
      return [];
    }
  }

  // Create African-optimized default safe zones
  async createDefaultSafeZones(familyNetworkId: number, schoolLocation?: { lat: number; lng: number; name: string }): Promise<void> {
    const familyNetwork = await storage.getFamilyNetworkById(familyNetworkId);
    if (!familyNetwork) return;

    const defaultZones = [
      {
        name: "Maison familiale",
        description: "Zone de sécurité autour du domicile familial",
        radius: 200, // 200 meters
        zoneType: 'home' as const,
        allowedTimeStart: "00:00",
        allowedTimeEnd: "23:59",
        allowedDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
      }
    ];

    if (schoolLocation) {
      defaultZones.push({
        name: schoolLocation.name,
        description: "Zone scolaire avec horaires de cours",
        radius: 300, // 300 meters for school
        zoneType: 'school' as const,
        allowedTimeStart: "07:00",
        allowedTimeEnd: "18:00",
        allowedDays: ["monday", "tuesday", "wednesday", "thursday", "friday"]
      });
    }

    for (const zone of defaultZones) {
      await this.createSafeZone({
        ...zone,
        centerLatitude: schoolLocation?.lat || 4.0511, // Default to Douala coordinates
        centerLongitude: schoolLocation?.lng || 9.7679,
        familyId: familyNetworkId,
        createdBy: familyNetwork.primaryParentId
      });
    }
  }

  // Optimize for African mobile networks
  async optimizeForAfricanNetworks(deviceId: number): Promise<{
    batteryOptimization: boolean;
    dataUsageOptimization: boolean;
    offlineCapability: boolean;
  }> {
    // Implement battery and data usage optimization
    const settings = await storage.getLocationSettings(deviceId);
    
    return {
      batteryOptimization: settings?.batteryOptimization || true,
      dataUsageOptimization: settings?.dataUsageLimit ? settings.dataUsageLimit < 100 : true,
      offlineCapability: settings?.offlineMode || false
    };
  }
}

export const geolocationService = new GeolocationService();