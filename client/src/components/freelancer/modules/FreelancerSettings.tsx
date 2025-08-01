import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/CardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ModernCard } from '@/components/ui/ModernCard';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, User, Bell, Shield, Clock, DollarSign, MapPin, CreditCard, Eye, EyeOff, Save, Lock, Smartphone } from 'lucide-react';
import FreelancerSubscription from './FreelancerSubscription';

const FreelancerSettings = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [profileData, setProfileData] = useState({
    name: (user as any)?.name || 'Dr. Amina Kone',
    email: user?.email || 'amina.kone@educafric.com',
    phone: '+237 656 200 472',
    specializations: 'Mathématiques, Physique, Sciences',
    hourlyRate: '2,500',
    bio: 'Professeure expérimentée en sciences avec 8 ans d\'expérience en tutorat privé.',
    location: 'Yaoundé, Cameroun',
    availability: 'Lundi-Vendredi 14h-18h, Samedi 9h-12h',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    newBookings: true,
    sessionReminders: true,
    paymentNotifications: true,
    parentMessages: true,
    smsNotifications: true,
    emailNotifications: true
  });

  const text = {
    fr: {
      title: 'Paramètres Freelancer',
      subtitle: 'Gestion complète de votre profil professionnel',
      general: 'Général',
      subscription: 'Abonnement',
      security: 'Sécurité',
      profile: 'Profil Professionnel',
      notifications: 'Préférences de Notification',
      availability: 'Disponibilité et Tarifs',
      name: 'Nom complet',
      email: 'Email professionnel',
      phone: 'Téléphone',
      specializations: 'Spécialisations',
      hourlyRate: 'Tarif horaire (CFA)',
      bio: 'Biographie professionnelle',
      location: 'Localisation',
      availabilityHours: 'Heures de disponibilité',
      newBookings: 'Nouvelles réservations',
      sessionReminders: 'Rappels de séances',
      paymentNotifications: 'Notifications de paiement',
      parentMessages: 'Messages des parents',
      smsNotifications: 'Notifications SMS',
      emailNotifications: 'Notifications email',
      currentPassword: 'Mot de passe actuel',
      newPassword: 'Nouveau mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      changePassword: 'Changer le mot de passe',
      twoFactor: 'Authentification à deux facteurs',
      enable2FA: 'Activer 2FA',
      disable2FA: 'Désactiver 2FA',
      save: 'Enregistrer les modifications',
      cancel: 'Annuler'
    },
    en: {
      title: 'Freelancer Settings',
      subtitle: 'Complete management of your professional profile',
      general: 'General',
      subscription: 'Subscription',
      security: 'Security',
      profile: 'Professional Profile',
      notifications: 'Notification Preferences',
      availability: 'Availability and Rates',
      name: 'Full name',
      email: 'Professional email',
      phone: 'Phone',
      specializations: 'Specializations',
      hourlyRate: 'Hourly rate (CFA)',
      bio: 'Professional biography',
      location: 'Location',
      availabilityHours: 'Available hours',
      newBookings: 'New bookings',
      sessionReminders: 'Session reminders',
      paymentNotifications: 'Payment notifications',
      parentMessages: 'Parent messages',
      smsNotifications: 'SMS notifications',
      emailNotifications: 'Email notifications',
      currentPassword: 'Current password',
      newPassword: 'New password',
      confirmPassword: 'Confirm password',
      changePassword: 'Change password',
      twoFactor: 'Two-factor authentication',
      enable2FA: 'Enable 2FA',
      disable2FA: 'Disable 2FA',
      save: 'Save changes',
      cancel: 'Cancel'
    }
  };

  const t = text[language as keyof typeof text];

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (setting: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    // API call to save settings
    console.log('Saving freelancer settings:', { profileData, notifications });
  };

  const handleChangePassword = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('Password changed successfully');
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.title}</h2>
        <p className="text-gray-600 mb-6">{t.subtitle}</p>
        
        {/* Section Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'general', label: t.general, icon: <User className="w-4 h-4" /> },
            { id: 'subscription', label: t.subscription, icon: <CreditCard className="w-4 h-4" /> },
            { id: 'security', label: t.security, icon: <Shield className="w-4 h-4" /> }
          ].map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'outline'}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              {section.icon}
              {section.label}
            </Button>
          ))}
        </div>
      </div>

      {/* General Settings */}
      {activeSection === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModernCard className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.profile}</h3>
              <div>
                <Label htmlFor="name">{t.name}</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => handleProfileUpdate('name', e?.target?.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileUpdate('email', e?.target?.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">{t.phone}</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleProfileUpdate('phone', e?.target?.value)}
                />
              </div>
              <div>
                <Label htmlFor="specializations">{t.specializations}</Label>
                <Input
                  id="specializations"
                  value={profileData.specializations}
                  onChange={(e) => handleProfileUpdate('specializations', e?.target?.value)}
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {t.hourlyRate}
                </Label>
                <Input
                  id="hourlyRate"
                  value={profileData.hourlyRate}
                  onChange={(e) => handleProfileUpdate('hourlyRate', e?.target?.value)}
                />
              </div>
              <div>
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {t.location}
                </Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => handleProfileUpdate('location', e?.target?.value)}
                />
              </div>
              <div>
                <Label htmlFor="bio">{t.bio}</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => handleProfileUpdate('bio', e?.target?.value)}
                />
              </div>
              <div>
                <Label htmlFor="availability" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t.availabilityHours}
                </Label>
                <Input
                  id="availability"
                  value={profileData.availability}
                  onChange={(e) => handleProfileUpdate('availability', e?.target?.value)}
                />
              </div>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                {t.save}
              </Button>
            </div>
          </ModernCard>

          <ModernCard className="p-6">
            <div className="space-y-4">
              {[
                { key: 'newBookings', label: t.newBookings },
                { key: 'sessionReminders', label: t.sessionReminders },
                { key: 'paymentNotifications', label: t.paymentNotifications },
                { key: 'parentMessages', label: t.parentMessages },
                { key: 'smsNotifications', label: t.smsNotifications },
                { key: 'emailNotifications', label: t.emailNotifications }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <span className="text-gray-700">{setting.label}</span>
                  <Switch
                    checked={notifications[setting.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => handleNotificationToggle(setting.key, checked)}
                  />
                </div>
              ))}
            </div>
          </ModernCard>
        </div>
      )}

      {/* Subscription Settings */}
      {activeSection === 'subscription' && (
        <FreelancerSubscription />
      )}

      {/* Security Settings */}
      {activeSection === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModernCard className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="currentPassword">{t.currentPassword}</Label>
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData(prev => ({...prev, currentPassword: e?.target?.value}))}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative">
                <Label htmlFor="newPassword">{t.newPassword}</Label>
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData(prev => ({...prev, newPassword: e?.target?.value}))}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative">
                <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={profileData.confirmPassword}
                  onChange={(e) => setProfileData(prev => ({...prev, confirmPassword: e?.target?.value}))}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button onClick={handleChangePassword} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Lock className="w-4 h-4 mr-2" />
                {t.changePassword}
              </Button>
            </div>
          </ModernCard>

          <ModernCard className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{t.twoFactor}</h4>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' 
                      ? 'Sécurisez votre compte avec l\'authentification à deux facteurs'
                      : 'Secure your account with two-factor authentication'}
                  </p>
                </div>
                <Badge variant={is2FAEnabled ? "default" : "secondary"}>
                  {is2FAEnabled 
                    ? (language === 'fr' ? 'Activé' : 'Enabled')
                    : (language === 'fr' ? 'Désactivé' : 'Disabled')
                  }
                </Badge>
              </div>
              
              <Button 
                onClick={() => setIs2FAEnabled(!is2FAEnabled)} 
                variant={is2FAEnabled ? "destructive" : "default"}
                className="w-full"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                {is2FAEnabled ? t.disable2FA : t.enable2FA}
              </Button>
            </div>
          </ModernCard>
        </div>
      )}
    </div>
  );
};

export default FreelancerSettings;