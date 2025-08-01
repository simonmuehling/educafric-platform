import { User } from '@shared/schema';

// Consolidated Bilingual SMS Templates - Cost-efficient for African markets
export const SMS_TEMPLATES = {
  // Attendance notifications - Include child name
  ABSENCE_ALERT: {
    en: (childName: string, date: string, className?: string) => 
      `${childName}${className ? ` (${className})` : ''} absent ${date}. Contact school if needed.`,
    fr: (childName: string, date: string, className?: string) => 
      `${childName}${className ? ` (${className})` : ''} absent ${date}. Contactez école si nécessaire.`
  },
  
  LATE_ARRIVAL: {
    en: (childName: string, time: string, className?: string) => 
      `${childName}${className ? ` (${className})` : ''} arrived late at ${time}.`,
    fr: (childName: string, time: string, className?: string) => 
      `${childName}${className ? ` (${className})` : ''} arrivé en retard à ${time}.`
  },

  // Grade notifications - Include child name and subject
  NEW_GRADE: {
    en: (childName: string, subject: string, grade: string) => 
      `${childName}: ${subject} grade ${grade}. Well done!`,
    fr: (childName: string, subject: string, grade: string) => 
      `${childName}: note ${subject} ${grade}. Bravo!`
  },

  LOW_GRADE_ALERT: {
    en: (childName: string, subject: string, grade: string) => 
      `${childName}: ${subject} ${grade}. Needs support. Contact teacher.`,
    fr: (childName: string, subject: string, grade: string) => 
      `${childName}: ${subject} ${grade}. Besoin aide. Contactez prof.`
  },

  // Payment notifications - Include child name for fees
  SCHOOL_FEES_DUE: {
    en: (childName: string, amount: string, dueDate: string) => 
      `${childName}: School fees ${amount} due ${dueDate}. Pay via app.`,
    fr: (childName: string, amount: string, dueDate: string) => 
      `${childName}: Frais ${amount} dus ${dueDate}. Payez via app.`
  },

  PAYMENT_CONFIRMED: {
    en: (childName: string, amount: string, reference: string) => 
      `${childName}: Payment ${amount} received. Ref: ${reference}. Thank you!`,
    fr: (childName: string, amount: string, reference: string) => 
      `${childName}: Paiement ${amount} reçu. Réf: ${reference}. Merci!`
  },

  // Emergency notifications - Include affected person
  EMERGENCY_ALERT: {
    en: (personName: string, situation: string) => 
      `URGENT: ${personName} - ${situation}. Contact school immediately.`,
    fr: (personName: string, situation: string) => 
      `URGENT: ${personName} - ${situation}. Contactez école immédiatement.`
  },

  // Medical notifications
  MEDICAL_INCIDENT: {
    en: (childName: string, incident: string) => 
      `${childName}: ${incident}. Please collect from school nurse.`,
    fr: (childName: string, incident: string) => 
      `${childName}: ${incident}. Veuillez venir chercher à infirmerie.`
  },

  // General notifications
  SCHOOL_ANNOUNCEMENT: {
    en: (title: string, date: string) => 
      `School: ${title} - ${date}. Check app for details.`,
    fr: (title: string, date: string) => 
      `École: ${title} - ${date}. Vérifiez app pour détails.`
  },

  // Password Reset - Keep existing
  PASSWORD_RESET: {
    en: (code: string) => `Your Educafric password reset code: ${code}. Valid for 10 minutes.`,
    fr: (code: string) => `Votre code Educafric: ${code}. Valide 10 minutes.`
  },

  // Homework reminders
  HOMEWORK_REMINDER: {
    en: (childName: string, subject: string, dueDate: string) => 
      `${childName}: ${subject} homework due ${dueDate}. Check app.`,
    fr: (childName: string, subject: string, dueDate: string) => 
      `${childName}: Devoir ${subject} pour ${dueDate}. Voir app.`
  },

  // ========== GEOLOCATION & GPS TRACKING NOTIFICATIONS ==========
  
  // Safe Zone Notifications
  ZONE_ENTRY: {
    en: (childName: string, zoneName: string, time: string) => 
      `${childName} entered ${zoneName} at ${time}. Safe arrival confirmed.`,
    fr: (childName: string, zoneName: string, time: string) => 
      `${childName} est arrivé à ${zoneName} à ${time}. Arrivée confirmée.`
  },

  ZONE_EXIT: {
    en: (childName: string, zoneName: string, time: string) => 
      `${childName} left ${zoneName} at ${time}. Track location in app.`,
    fr: (childName: string, zoneName: string, time: string) => 
      `${childName} a quitté ${zoneName} à ${time}. Suivez dans app.`
  },

  // School Arrival/Departure
  SCHOOL_ARRIVAL: {
    en: (childName: string, schoolName: string, time: string) => 
      `${childName} arrived at ${schoolName} at ${time}. Attendance confirmed.`,
    fr: (childName: string, schoolName: string, time: string) => 
      `${childName} arrivé à ${schoolName} à ${time}. Présence confirmée.`
  },

  SCHOOL_DEPARTURE: {
    en: (childName: string, schoolName: string, time: string) => 
      `${childName} left ${schoolName} at ${time}. Pickup confirmed.`,
    fr: (childName: string, schoolName: string, time: string) => 
      `${childName} a quitté ${schoolName} à ${time}. Récupération confirmée.`
  },

  // Home Arrival/Departure  
  HOME_ARRIVAL: {
    en: (childName: string, time: string) => 
      `${childName} arrived home safely at ${time}.`,
    fr: (childName: string, time: string) => 
      `${childName} est rentré à la maison à ${time}.`
  },

  HOME_DEPARTURE: {
    en: (childName: string, time: string) => 
      `${childName} left home at ${time}. Journey started.`,
    fr: (childName: string, time: string) => 
      `${childName} a quitté la maison à ${time}. Trajet commencé.`
  },

  // Location Alerts
  LOCATION_ALERT: {
    en: (childName: string, location: string, time: string) => 
      `ALERT: ${childName} at unexpected location: ${location} at ${time}. Check app.`,
    fr: (childName: string, location: string, time: string) => 
      `ALERTE: ${childName} dans lieu inattendu: ${location} à ${time}. Voir app.`
  },

  SPEED_ALERT: {
    en: (childName: string, speed: string, location: string) => 
      `ALERT: ${childName} moving at ${speed} km/h near ${location}. Check safety.`,
    fr: (childName: string, speed: string, location: string) => 
      `ALERTE: ${childName} se déplace à ${speed} km/h près ${location}. Vérifier sécurité.`
  },

  // Device Status
  LOW_BATTERY: {
    en: (childName: string, deviceType: string, batteryLevel: string) => 
      `${childName}'s ${deviceType} battery: ${batteryLevel}%. Please charge device.`,
    fr: (childName: string, deviceType: string, batteryLevel: string) => 
      `Batterie ${deviceType} de ${childName}: ${batteryLevel}%. Rechargez appareil.`
  },

  DEVICE_OFFLINE: {
    en: (childName: string, deviceType: string, lastSeen: string) => 
      `${childName}'s ${deviceType} offline since ${lastSeen}. Check device.`,
    fr: (childName: string, deviceType: string, lastSeen: string) => 
      `${deviceType} de ${childName} hors ligne depuis ${lastSeen}. Vérifier appareil.`
  },

  GPS_DISABLED: {
    en: (childName: string, deviceType: string) => 
      `GPS disabled on ${childName}'s ${deviceType}. Please enable location services.`,
    fr: (childName: string, deviceType: string) => 
      `GPS désactivé sur ${deviceType} de ${childName}. Activez localisation.`
  },

  // Emergency Location
  PANIC_BUTTON: {
    en: (childName: string, location: string, time: string) => 
      `EMERGENCY: ${childName} activated panic button at ${location}, ${time}. Call immediately!`,
    fr: (childName: string, location: string, time: string) => 
      `URGENCE: ${childName} a activé alarme à ${location}, ${time}. Appelez immédiatement!`
  },

  SOS_LOCATION: {
    en: (childName: string, coordinates: string, address: string) => 
      `SOS: ${childName} needs help at ${address} (${coordinates}). Contact emergency services.`,
    fr: (childName: string, coordinates: string, address: string) => 
      `SOS: ${childName} a besoin d'aide à ${address} (${coordinates}). Contactez secours.`
  }
};

// Email Templates - More detailed than SMS
export const EMAIL_TEMPLATES = {
  ATTENDANCE_REPORT: {
    en: {
      subject: (studentName: string) => `Attendance Update - ${studentName}`,
      html: (studentName: string, date: string, status: string, details: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #d97706;">Attendance Notification</h2>
          <p>Dear Parent/Guardian,</p>
          <p>This is to inform you about your child's attendance:</p>
          <div style="background: #fef3c7; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <strong>Student:</strong> ${studentName}<br>
            <strong>Date:</strong> ${date}<br>
            <strong>Status:</strong> ${status}<br>
            <strong>Details:</strong> ${details}
          </div>
          <p>If you have any questions, please contact the school.</p>
          <p>Best regards,<br>Educafric Team</p>
        </div>`
    },
    fr: {
      subject: (studentName: string) => `Mise à jour de présence - ${studentName}`,
      html: (studentName: string, date: string, status: string, details: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #d97706;">Notification de Présence</h2>
          <p>Cher Parent/Tuteur,</p>
          <p>Ceci pour vous informer de la présence de votre enfant:</p>
          <div style="background: #fef3c7; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <strong>Étudiant:</strong> ${studentName}<br>
            <strong>Date:</strong> ${date}<br>
            <strong>Statut:</strong> ${status}<br>
            <strong>Détails:</strong> ${details}
          </div>
          <p>Si vous avez des questions, veuillez contacter l'école.</p>
          <p>Cordialement,<br>Équipe Educafric</p>
        </div>`
    }
  }
};

// WhatsApp Templates - Brief but more interactive than SMS
export const WHATSAPP_TEMPLATES = {
  GRADE_UPDATE: {
    en: (studentName: string, subject: string, grade: string) => 
      `📚 *Grade Update*\n\n*Student:* ${studentName}\n*Subject:* ${subject}\n*Grade:* ${grade}\n\nView full report in Educafric app`,
    fr: (studentName: string, subject: string, grade: string) => 
      `📚 *Mise à jour Note*\n\n*Étudiant:* ${studentName}\n*Matière:* ${subject}\n*Note:* ${grade}\n\nVoir rapport complet dans app Educafric`
  },

  ABSENCE_ALERT: {
    en: (studentName: string, date: string) => 
      `⚠️ *Absence Alert*\n\n*Student:* ${studentName}\n*Date:* ${date}\n\nPlease confirm if this is expected or contact school.`,
    fr: (studentName: string, date: string) => 
      `⚠️ *Alerte Absence*\n\n*Étudiant:* ${studentName}\n*Date:* ${date}\n\nVeuillez confirmer si c'est prévu ou contactez école.`
  }
};

export interface NotificationData {
  type: 'sms' | 'email' | 'whatsapp' | 'push';
  recipient: User;
  template: string;
  data: Record<string, any>;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  language: 'en' | 'fr';
}

export class NotificationService {
  private static instance: NotificationService;
  
  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Consolidated notification sending
  async sendNotification(notification: NotificationData): Promise<boolean> {
    try {
      switch (notification.type) {
        case 'sms':
          return await this.sendSMS(notification);
        case 'email':
          return await this.sendEmail(notification);
        case 'whatsapp':
          return await this.sendWhatsApp(notification);
        case 'push':
          return await this.sendPushNotification(notification);
        default:
          console.error(`Unknown notification type: ${notification.type}`);
          return false;
      }
    } catch (error) {
      console.error(`Notification send error:`, error);
      return false;
    }
  }

  // Send multiple notifications efficiently
  async sendBatch(notifications: NotificationData[]): Promise<boolean[]> {
    const promises = notifications.map(notification => this.sendNotification(notification));
    return Promise.all(promises);
  }

  // Smart notification routing based on priority and user preferences
  async sendSmartNotification(
    user: User,
    templateKey: string,
    data: Record<string, any>,
    priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal'
  ): Promise<boolean[]> {
    const language = user.preferredLanguage || 'en';
    const notifications: NotificationData[] = [];

    // Always send push notifications
    notifications.push({
      type: 'push',
      recipient: user,
      template: templateKey,
      data,
      priority,
      language: language as 'en' | 'fr'
    });

    // Send SMS for high priority or urgent notifications
    if (priority === 'high' || priority === 'urgent') {
      if (user.phone) {
        notifications.push({
          type: 'sms',
          recipient: user,
          template: templateKey,
          data,
          priority,
          language: language as 'en' | 'fr'
        });
      }
    }

    // Send WhatsApp for urgent notifications if available
    if (priority === 'urgent' && user.whatsappNumber) {
      notifications.push({
        type: 'whatsapp',
        recipient: user,
        template: templateKey,
        data,
        priority,
        language: language as 'en' | 'fr'
      });
    }

    // Send email for detailed notifications
    if (priority !== 'low' && user.email) {
      notifications.push({
        type: 'email',
        recipient: user,
        template: templateKey,
        data,
        priority,
        language: language as 'en' | 'fr'
      });
    }

    return this.sendBatch(notifications);
  }

  private async sendSMS(notification: NotificationData): Promise<boolean> {
    if (!process.env.VONAGE_API_KEY || !process.env.VONAGE_API_SECRET) {
      console.warn('Vonage credentials not configured');
      return false;
    }

    try {
      // Import Vonage dynamically to avoid startup errors if not configured
      const { Vonage } = await import('@vonage/server-sdk');
      
      const vonage = new Vonage({
        apiKey: process.env.VONAGE_API_KEY!,
        apiSecret: process.env.VONAGE_API_SECRET!,
      });

      const template = SMS_TEMPLATES[notification.template as keyof typeof SMS_TEMPLATES];
      if (!template) {
        console.error(`SMS template not found: ${notification.template}`);
        console.log('Available templates:', Object.keys(SMS_TEMPLATES));
        return false;
      }

      // Get the template function for the language
      const templateFn = template[notification.language as 'en' | 'fr'];
      if (!templateFn) {
        console.error(`Template function not found for language: ${notification.language}`);
        return false;
      }

      // Build message with proper parameters  
      const dataValues = Object.values(notification.data);
      const message = templateFn(...dataValues as any);
      
      const response = await vonage.sms.send({
        to: notification.recipient.phone!,
        from: 'Educafric',
        text: message
      });

      console.log(`SMS sent to ${notification.recipient.phone}: ${message.slice(0, 50)}...`);
      return response.messages[0].status === '0';
    } catch (error) {
      console.error('SMS send error:', error);
      return false;
    }
  }

  private async sendEmail(notification: NotificationData): Promise<boolean> {
    // Email implementation would go here
    // For now, just log the email content
    console.log(`Email notification sent to ${notification.recipient.email}`);
    return true;
  }

  private async sendWhatsApp(notification: NotificationData): Promise<boolean> {
    // WhatsApp Business API implementation would go here
    // For now, just log the WhatsApp content
    console.log(`WhatsApp notification sent to ${notification.recipient.whatsappNumber}`);
    return true;
  }

  private async sendPushNotification(notification: NotificationData): Promise<boolean> {
    // Push notification implementation would go here
    // For now, just log the push notification
    console.log(`Push notification sent to user ${notification.recipient.id}`);
    return true;
  }

  // Helper methods for common notification scenarios
  async notifyAttendance(
    parent: User,
    studentName: string,
    status: 'absent' | 'late',
    details: { date: string; time?: string }
  ): Promise<boolean[]> {
    const templateKey = status === 'absent' ? 'ABSENT' : 'LATE';
    const data = status === 'absent' 
      ? { studentName, date: details.date }
      : { studentName, time: details.time };

    return this.sendSmartNotification(parent, templateKey, data, 'high');
  }

  async notifyGrade(
    parent: User,
    studentName: string,
    subject: string,
    grade: string,
    isLowGrade: boolean = false
  ): Promise<boolean[]> {
    const templateKey = isLowGrade ? 'LOW_GRADE' : 'NEW_GRADE';
    const priority = isLowGrade ? 'high' : 'normal';
    
    return this.sendSmartNotification(
      parent, 
      templateKey, 
      { studentName, subject, grade }, 
      priority
    );
  }

  async notifyPayment(
    parent: User,
    amount: string,
    type: 'due' | 'received',
    dueDate?: string
  ): Promise<boolean[]> {
    const templateKey = type === 'due' ? 'PAYMENT_DUE' : 'PAYMENT_RECEIVED';
    const data = type === 'due' 
      ? { amount, dueDate } 
      : { amount };

    return this.sendSmartNotification(parent, templateKey, data, 'high');
  }

  async notifyEmergency(
    users: User[],
    message: string
  ): Promise<boolean[][]> {
    const promises = users.map(user => 
      this.sendSmartNotification(user, 'EMERGENCY', { message }, 'urgent')
    );
    
    return Promise.all(promises);
  }
}

export default NotificationService.getInstance();