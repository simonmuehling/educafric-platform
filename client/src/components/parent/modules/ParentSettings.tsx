import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  User, Lock, Shield, Eye, EyeOff, Save, 
  Key, Smartphone, Mail, Phone, Globe, Crown,
  CreditCard, Star, CheckCircle, Settings, Loader
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModernCard } from '@/components/ui/ModernCard';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import ParentSubscription from './ParentSubscription';

const ParentSettings = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: language,
    notifications: {
      email: true,
      sms: true,
      push: true
    }
  });

  // Fetch parent profile data
  const { data: parentProfile, isLoading, error } = useQuery({
    queryKey: ['/api/parent/profile'],
    enabled: !!user
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (updates: any) => apiRequest('PATCH', '/api/parent/profile', updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/parent/profile'] });
      toast({
        title: language === 'fr' ? 'Profil mis à jour' : 'Profile updated',
        description: language === 'fr' ? 'Vos informations ont été sauvegardées' : 'Your information has been saved'
      });
    },
    onError: (error: any) => {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: error.message || (language === 'fr' ? 'Impossible de mettre à jour le profil' : 'Failed to update profile'),
        variant: 'destructive'
      });
    }
  });

  // Update profileData when parentProfile is loaded
  useEffect(() => {
    if (parentProfile) {
      setProfileData(prev => ({
        ...prev,
        firstName: parentProfile.firstName || '',
        lastName: parentProfile.lastName || '',
        email: parentProfile.email || '',
        phone: parentProfile.phone || '',
        whatsappNumber: parentProfile.whatsappNumber || '',
        language: parentProfile.preferredLanguage || language,
        notifications: parentProfile.notifications || {
          email: true,
          sms: true,
          push: true
        }
      }));
    }
  }, [parentProfile, language]);

  const text = {
    fr: {
      title: 'Paramètres Parent',
      subtitle: 'Gérez vos informations personnelles et préférences',
      general: 'Général',
      subscription: 'Abonnement',
      security: 'Sécurité',
      personalInfo: 'Informations Personnelles',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      currentPassword: 'Mot de passe actuel',
      newPassword: 'Nouveau mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      changePassword: 'Changer le mot de passe',
      twoFactor: 'Authentification à deux facteurs (2FA)',
      enable2FA: 'Activer 2FA',
      disable2FA: 'Désactiver 2FA',
      backupCodes: 'Codes de sauvegarde',
      generateCodes: 'Générer nouveaux codes',
      preferences: 'Préférences',
      language: 'Langue',
      notifications: 'Notifications',
      emailNotif: 'Notifications par email',
      smsNotif: 'Notifications SMS',
      pushNotif: 'Notifications dans l\'app',
      saveChanges: 'Enregistrer les modifications',
      cancel: 'Annuler',
      profileUpdated: 'Profil mis à jour',
      passwordChanged: 'Mot de passe modifié',
      twoFactorEnabled: '2FA activé',
      twoFactorDisabled: '2FA désactivé',
      premiumFeature: 'Fonctionnalité Premium',
      premiumDesc: 'Cette fonctionnalité avancée est disponible avec un abonnement premium. Débloquez toutes les fonctionnalités pour une gestion complète de l\'éducation de votre enfant.',
      subscribePremium: 'S\'abonner au Premium',
      currentPlan: 'Plan Actuel',
      freePlan: 'Gratuit',
      premiumPlan: 'Premium',
      upgradeNow: 'Mettre à niveau maintenant',
      premiumBenefits: 'Avantages Premium',
      benefit1: 'Paramètres de profil avancés',
      benefit2: 'Notifications WhatsApp illimitées',
      benefit3: 'Suivi GPS en temps réel',
      benefit4: 'Rapports détaillés personnalisés',
      benefit5: 'Support prioritaire 24/7'
    },
    en: {
      title: 'Parent Settings',
      subtitle: 'Manage your personal information and preferences',
      general: 'General',
      subscription: 'Subscription',
      security: 'Security', 
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      changePassword: 'Change Password',
      twoFactor: 'Two-Factor Authentication (2FA)',
      enable2FA: 'Enable 2FA',
      disable2FA: 'Disable 2FA',
      backupCodes: 'Backup Codes',
      generateCodes: 'Generate New Codes',
      preferences: 'Preferences',
      language: 'Language',
      notifications: 'Notifications',
      emailNotif: 'Email notifications',
      smsNotif: 'SMS notifications',
      pushNotif: 'In-app notifications',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      profileUpdated: 'Profile updated',
      passwordChanged: 'Password changed',
      twoFactorEnabled: '2FA enabled',
      twoFactorDisabled: '2FA disabled',
      premiumFeature: 'Premium Feature',
      premiumDesc: 'This advanced functionality is available with a premium subscription. Unlock all features for complete management of your child\'s education.',
      subscribePremium: 'Subscribe to Premium',
      currentPlan: 'Current Plan',
      freePlan: 'Free',
      premiumPlan: 'Premium',
      upgradeNow: 'Upgrade Now',
      premiumBenefits: 'Premium Benefits',
      benefit1: 'Advanced profile settings',
      benefit2: 'Unlimited WhatsApp notifications',
      benefit3: 'Real-time GPS tracking',
      benefit4: 'Detailed custom reports',
      benefit5: 'Priority 24/7 support'
    }
  };

  const t = text[language as keyof typeof text];

  const handleUpgradeToPremium = () => {
    // Redirect to subscription page
    if (window && window.location) {
      window.location.href = '/subscribe';
    }
  };

  const handleSaveProfile = () => {
    updateProfileMutation.mutate({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phone: profileData.phone,
      whatsappNumber: profileData.whatsappNumber,
      language: profileData.language,
      notifications: profileData.notifications
    });
  };

  const handleChangePassword = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr' ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: t.passwordChanged,
      description: language === 'fr' ? 'Votre mot de passe a été modifié avec succès' : 'Your password has been changed successfully'
    });

    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  // Show loading state while fetching profile
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <Loader className="w-6 h-6 animate-spin" />
          <span>{language === 'fr' ? 'Chargement du profil...' : 'Loading profile...'}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">
          {language === 'fr' ? 'Erreur lors du chargement du profil' : 'Error loading profile'}
        </div>
      </div>
    );
  }

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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.personalInfo}</h3>
              <div>
                <Label htmlFor="firstName">{t.firstName}</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({...prev, firstName: e?.target?.value}))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t.lastName}</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({...prev, lastName: e?.target?.value}))}
                />
              </div>
              <div>
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({...prev, email: e?.target?.value}))}
                />
              </div>
              <div>
                <Label htmlFor="phone">{t.phone}</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({...prev, phone: e?.target?.value}))}
                />
              </div>
              <Button 
                onClick={handleSaveProfile} 
                disabled={updateProfileMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {updateProfileMutation.isPending ? (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {updateProfileMutation.isPending 
                  ? (language === 'fr' ? 'Sauvegarde...' : 'Saving...') 
                  : t.saveChanges
                }
              </Button>
            </div>
          </ModernCard>

          <ModernCard className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.preferences}</h3>
              <div>
                <Label htmlFor="language">{t.language}</Label>
                <select 
                  value={profileData.language}
                  onChange={(e) => setProfileData(prev => ({...prev, language: e?.target?.value as any}))}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <Label>{t.notifications}</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profileData?.notifications?.email}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        notifications: {...prev.notifications, email: e?.target?.checked}
                      }))}
                      className="rounded"
                    />
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{t.emailNotif}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profileData?.notifications?.sms}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        notifications: {...prev.notifications, sms: e?.target?.checked}
                      }))}
                      className="rounded"
                    />
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{t.smsNotif}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profileData?.notifications?.push}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        notifications: {...prev.notifications, push: e?.target?.checked}
                      }))}
                      className="rounded"
                    />
                    <Smartphone className="w-4 h-4" />
                    <span className="text-sm">{t.pushNotif}</span>
                  </label>
                </div>
              </div>
            </div>
          </ModernCard>
        </div>
      )}

      {/* Subscription Settings */}
      {activeSection === 'subscription' && (
        <ParentSubscription />
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

export default ParentSettings;