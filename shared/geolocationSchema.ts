// Real-time Geolocation Family Safety Network Schema
import { pgTable, serial, integer, text, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

// Device tracking for family members
export const familyDevices = pgTable("family_devices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // Owner of the device
  deviceName: text("device_name").notNull(), // "Marie's Tablet", "Papa's Phone"
  deviceType: text("device_type").notNull(), // tablet, smartphone, smartwatch
  deviceId: text("device_id").notNull().unique(), // Unique device identifier
  isActive: boolean("is_active").default(true),
  batteryLevel: integer("battery_level"), // 0-100
  lastSeen: timestamp("last_seen"),
  networkType: text("network_type"), // wifi, 4G, 3G, offline
  parentalControl: boolean("parental_control").default(false),
  emergencyContact: text("emergency_contact"), // Phone number for emergencies
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Real-time location tracking
export const locationHistory = pgTable("location_history", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull(),
  userId: integer("user_id").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  accuracy: decimal("accuracy", { precision: 8, scale: 2 }), // GPS accuracy in meters
  altitude: decimal("altitude", { precision: 8, scale: 2 }),
  speed: decimal("speed", { precision: 6, scale: 2 }), // km/h
  heading: decimal("heading", { precision: 5, scale: 2 }), // Direction in degrees
  address: text("address"), // Reverse geocoded address
  isOnline: boolean("is_online").default(true),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Safe zones for family safety
export const safeZones = pgTable("safe_zones", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // "École Saint-Paul", "Maison", "Grand-mère"
  description: text("description"),
  centerLatitude: decimal("center_latitude", { precision: 10, scale: 8 }).notNull(),
  centerLongitude: decimal("center_longitude", { precision: 11, scale: 8 }).notNull(),
  radius: integer("radius").notNull(), // Radius in meters
  zoneType: text("zone_type").notNull(), // school, home, family, medical, emergency
  schoolId: integer("school_id"), // If it's a school zone
  familyId: integer("family_id"), // Associated family
  createdBy: integer("created_by").notNull(), // Parent who created the zone
  isActive: boolean("is_active").default(true),
  notifyOnEntry: boolean("notify_on_entry").default(true),
  notifyOnExit: boolean("notify_on_exit").default(true),
  allowedTimeStart: text("allowed_time_start"), // "07:30" - time format
  allowedTimeEnd: text("allowed_time_end"), // "17:00"
  allowedDays: text("allowed_days").array(), // ["monday", "tuesday", ...]
  createdAt: timestamp("created_at").defaultNow(),
});

// Geofencing alerts and notifications
export const geofenceAlerts = pgTable("geofence_alerts", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull(),
  userId: integer("user_id").notNull(), // Person being tracked
  safeZoneId: integer("safe_zone_id").notNull(),
  alertType: text("alert_type").notNull(), // entry, exit, unauthorized_time, speed_limit
  severity: text("severity").notNull(), // low, medium, high, critical
  message: text("message").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  isResolved: boolean("is_resolved").default(false),
  resolvedBy: integer("resolved_by"),
  resolvedAt: timestamp("resolved_at"),
  notificationsSent: jsonb("notifications_sent"), // Track which notifications were sent
  timestamp: timestamp("timestamp").defaultNow(),
});

// Family safety network - defines family relationships for tracking
export const familyNetworks = pgTable("family_networks", {
  id: serial("id").primaryKey(),
  familyName: text("family_name").notNull(), // "Famille Kamdem"
  primaryParentId: integer("primary_parent_id").notNull(),
  secondaryParentId: integer("secondary_parent_id"),
  emergencyContacts: jsonb("emergency_contacts"), // Array of emergency contact info
  sharedLocationEnabled: boolean("shared_location_enabled").default(true),
  emergencyMode: boolean("emergency_mode").default(false),
  lastEmergencyTest: timestamp("last_emergency_test"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Family network members
export const familyNetworkMembers = pgTable("family_network_members", {
  id: serial("id").primaryKey(),
  familyNetworkId: integer("family_network_id").notNull(),
  userId: integer("user_id").notNull(),
  memberRole: text("member_role").notNull(), // parent, child, guardian, emergency_contact
  canTrackOthers: boolean("can_track_others").default(false),
  canBeTracked: boolean("can_be_tracked").default(true),
  receiveAlerts: boolean("receive_alerts").default(true),
  emergencyPermissions: boolean("emergency_permissions").default(false),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Emergency panic button logs
export const emergencyPanic = pgTable("emergency_panic", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // Who triggered the panic
  deviceId: integer("device_id").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  panicType: text("panic_type").notNull(), // medical, security, lost, accident
  message: text("message"), // Optional panic message
  audioRecording: text("audio_recording_url"), // URL to audio recording if available
  imageEvidence: text("image_evidence_url"), // Photo evidence if available
  isResolved: boolean("is_resolved").default(false),
  resolvedBy: integer("resolved_by"),
  resolvedAt: timestamp("resolved_at"),
  responseTime: integer("response_time"), // Time to first responder contact (seconds)
  emergencyServices: boolean("emergency_services_contacted").default(false),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Location sharing preferences
export const locationSharingSettings = pgTable("location_sharing_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  shareWithFamily: boolean("share_with_family").default(true),
  shareWithSchool: boolean("share_with_school").default(false),
  shareLocationHistory: boolean("share_location_history").default(false),
  precisionLevel: text("precision_level").default("high"), // high, medium, low
  batteryOptimization: boolean("battery_optimization").default(true),
  offlineMode: boolean("offline_mode").default(false),
  dataUsageLimit: integer("data_usage_limit").default(50), // MB per month
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Geolocation analytics for optimization
export const locationAnalytics = pgTable("location_analytics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  deviceId: integer("device_id").notNull(),
  date: timestamp("date").notNull(),
  totalDistance: decimal("total_distance", { precision: 8, scale: 2 }), // km
  avgSpeed: decimal("avg_speed", { precision: 5, scale: 2 }), // km/h
  maxSpeed: decimal("max_speed", { precision: 5, scale: 2 }), // km/h
  timeAtSchool: integer("time_at_school"), // minutes
  timeAtHome: integer("time_at_home"), // minutes
  timeOutside: integer("time_outside"), // minutes
  batteryUsage: integer("battery_usage"), // percentage used for GPS
  dataUsage: decimal("data_usage", { precision: 6, scale: 2 }), // MB
  accuracyScore: decimal("accuracy_score", { precision: 4, scale: 2 }), // GPS quality score
  networkQuality: text("network_quality"), // excellent, good, fair, poor
  createdAt: timestamp("created_at").defaultNow(),
});

// African-optimized connectivity tracking
export const connectivityStatus = pgTable("connectivity_status", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").notNull(),
  userId: integer("user_id").notNull(),
  networkOperator: text("network_operator"), // MTN, Orange, Camtel
  signalStrength: integer("signal_strength"), // 0-100
  networkType: text("network_type"), // 5G, 4G, 3G, 2G, wifi
  dataRoaming: boolean("data_roaming").default(false),
  wifiConnected: boolean("wifi_connected").default(false),
  wifiName: text("wifi_name"),
  isOnline: boolean("is_online").default(true),
  lastOnline: timestamp("last_online"),
  offlineDuration: integer("offline_duration"), // seconds offline
  costOptimization: boolean("cost_optimization").default(true),
  timestamp: timestamp("timestamp").defaultNow(),
});

export type FamilyDevice = typeof familyDevices.$inferSelect;
export type LocationHistory = typeof locationHistory.$inferSelect;
export type SafeZone = typeof safeZones.$inferSelect;
export type GeofenceAlert = typeof geofenceAlerts.$inferSelect;
export type FamilyNetwork = typeof familyNetworks.$inferSelect;
export type FamilyNetworkMember = typeof familyNetworkMembers.$inferSelect;
export type EmergencyPanic = typeof emergencyPanic.$inferSelect;
export type LocationSharingSettings = typeof locationSharingSettings.$inferSelect;
export type LocationAnalytics = typeof locationAnalytics.$inferSelect;
export type ConnectivityStatus = typeof connectivityStatus.$inferSelect;