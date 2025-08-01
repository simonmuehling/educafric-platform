import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  BookOpen, Award, Star, Edit, Save, 
  Clock, DollarSign, Users, TrendingUp,
  Camera, RefreshCw, Upload
} from 'lucide-react';

interface FreelancerProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  specializations: string[];
  experience: number;
  hourlyRate: number;
  availability: string;
  languages: string[];
  rating: number;
  totalStudents: number;
  completedLessons: number;
  bio: string;
  certifications: string[];
  profilePicture?: string;
}

const FunctionalFreelancerProfile: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<FreelancerProfile>>({});

  // Fetch freelancer profile
  const { data: profileData, isLoading, refetch } = useQuery<FreelancerProfile>({
    queryKey: ['/api/freelancer/profile'],
    enabled: !!user
  });

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (profileData: Partial<FreelancerProfile>) => {
      const response = await fetch('/api/freelancer/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profileData)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/freelancer/profile'] });
      setIsEditing(false);
      setEditedProfile({});
      toast({
        title: language === 'fr' ? 'Profil mis à jour' : 'Profile updated',
        description: language === 'fr' ? 'Votre profil a été mis à jour avec succès' : 'Your profile has been updated successfully',
      });
    },
    onError: () => {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr' ? 'Impossible de mettre à jour le profil' : 'Failed to update profile',
        variant: 'destructive'
      });
    }
  });

  const text = {
    fr: {
      title: 'Mon Profil',
      subtitle: 'Gérez votre profil professionnel d\'enseignant indépendant',
      personalInfo: 'Informations personnelles',
      professionalInfo: 'Informations professionnelles',
      statistics: 'Statistiques',
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      location: 'Localisation',
      specializations: 'Spécialisations',
      experience: 'Expérience',
      hourlyRate: 'Tarif horaire',
      availability: 'Disponibilité',
      languages: 'Langues',
      rating: 'Note moyenne',
      totalStudents: 'Total élèves',
      completedLessons: 'Cours terminés',
      bio: 'Biographie',
      certifications: 'Certifications',
      years: 'ans',
      fcfa: 'FCFA/heure',
      students: 'élèves',
      lessons: 'cours',
      loading: 'Chargement...',
      refresh: 'Actualiser',
      uploadPhoto: 'Changer photo',
      excellent: 'Excellent',
      good: 'Bien',
      average: 'Moyen'
    },
    en: {
      title: 'My Profile',
      subtitle: 'Manage your freelance teacher professional profile',
      personalInfo: 'Personal information',
      professionalInfo: 'Professional information',
      statistics: 'Statistics',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      specializations: 'Specializations',
      experience: 'Experience',
      hourlyRate: 'Hourly Rate',
      availability: 'Availability',
      languages: 'Languages',
      rating: 'Average Rating',
      totalStudents: 'Total Students',
      completedLessons: 'Completed Lessons',
      bio: 'Biography',
      certifications: 'Certifications',
      years: 'years',
      fcfa: 'FCFA/hour',
      students: 'students',
      lessons: 'lessons',
      loading: 'Loading...',
      refresh: 'Refresh',
      uploadPhoto: 'Change photo',
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average'
    }
  };

  const t = text[language as keyof typeof text];

  const profile = profileData || {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    specializations: [],
    experience: 0,
    hourlyRate: 0,
    availability: '',
    languages: [],
    rating: 0,
    totalStudents: 0,
    completedLessons: 0,
    bio: '',
    certifications: []
  };

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMutation.mutate(editedProfile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
  };

  const updateField = (field: keyof FreelancerProfile, value: any) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return t.excellent;
    if (rating >= 3.5) return t.good;
    return t.average;
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  const currentProfile = isEditing ? { ...profile, ...editedProfile } : profile;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-600 mt-1">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                {t.cancel}
              </Button>
              <Button 
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {t.save}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => refetch()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.refresh}
              </Button>
              <Button onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-2" />
                {t.edit}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">{t.rating}</p>
                <p className={`text-3xl font-bold`}>{currentProfile?.rating?.toFixed(1)}</p>
                <p className="text-xs text-blue-100">{getRatingText(currentProfile.rating)}</p>
              </div>
              <Star className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">{t.totalStudents}</p>
                <p className="text-3xl font-bold">{currentProfile.totalStudents}</p>
                <p className="text-xs text-green-100">{t.students}</p>
              </div>
              <Users className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">{t.completedLessons}</p>
                <p className="text-3xl font-bold">{currentProfile.completedLessons}</p>
                <p className="text-xs text-purple-100">{t.lessons}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">{t.hourlyRate}</p>
                <p className="text-3xl font-bold">{currentProfile?.hourlyRate?.toLocaleString()}</p>
                <p className="text-xs text-orange-100">{t.fcfa}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <User className="w-5 h-5 mr-2" />
                {t.personalInfo}
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">{t.firstName}</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={currentProfile.firstName}
                      onChange={(e) => updateField('firstName', e?.target?.value)}
                    />
                  ) : (
                    <p className="mt-1 font-medium">{currentProfile.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">{t.lastName}</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={currentProfile.lastName}
                      onChange={(e) => updateField('lastName', e?.target?.value)}
                    />
                  ) : (
                    <p className="mt-1 font-medium">{currentProfile.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {t.email}
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={currentProfile.email}
                    onChange={(e) => updateField('email', e?.target?.value)}
                  />
                ) : (
                  <p className="mt-1 font-medium">{currentProfile.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {t.phone}
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={currentProfile.phone}
                    onChange={(e) => updateField('phone', e?.target?.value)}
                  />
                ) : (
                  <p className="mt-1 font-medium">{currentProfile.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {t.location}
                </Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={currentProfile.location}
                    onChange={(e) => updateField('location', e?.target?.value)}
                  />
                ) : (
                  <p className="mt-1 font-medium">{currentProfile.location}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">{t.bio}</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={currentProfile.bio}
                    onChange={(e) => updateField('bio', e?.target?.value)}
                    rows={4}
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{currentProfile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Award className="w-5 h-5 mr-2" />
                {t.professionalInfo}
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">{t.experience}</Label>
                  {isEditing ? (
                    <Input
                      id="experience"
                      type="number"
                      value={currentProfile.experience}
                      onChange={(e) => updateField('experience', parseInt(e?.target?.value) || 0)}
                    />
                  ) : (
                    <p className="mt-1 font-medium">{currentProfile.experience} {t.years}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="hourlyRate">{t.hourlyRate}</Label>
                  {isEditing ? (
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={currentProfile.hourlyRate}
                      onChange={(e) => updateField('hourlyRate', parseInt(e?.target?.value) || 0)}
                    />
                  ) : (
                    <p className="mt-1 font-medium">{currentProfile?.hourlyRate?.toLocaleString()} {t.fcfa}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="availability">{t.availability}</Label>
                {isEditing ? (
                  <Input
                    id="availability"
                    value={currentProfile.availability}
                    onChange={(e) => updateField('availability', e?.target?.value)}
                  />
                ) : (
                  <p className="mt-1 font-medium">{currentProfile.availability}</p>
                )}
              </div>

              <div>
                <Label>{t.specializations}</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {currentProfile.(Array.isArray(specializations) ? specializations : []).map((spec, index) => (
                    <Badge key={index} variant="secondary">{spec}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>{t.languages}</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {currentProfile.(Array.isArray(languages) ? languages : []).map((lang, index) => (
                    <Badge key={index} variant="outline">{lang}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>{t.certifications}</Label>
                <div className="mt-2 space-y-2">
                  {currentProfile.(Array.isArray(certifications) ? certifications : []).map((cert, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <Award className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Picture and Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                  {currentProfile.firstName[0]}{currentProfile.lastName[0]}
                </div>
                <h3 className="text-xl font-semibold">{currentProfile.firstName} {currentProfile.lastName}</h3>
                <p className="text-gray-600">{currentProfile?.specializations?.join(', ')}</p>
                <Button variant="outline" className="mt-4" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  {t.uploadPhoto}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">{t.statistics}</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.experience}</span>
                <span className="font-medium">{currentProfile.experience} {t.years}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.rating}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{currentProfile?.rating?.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.totalStudents}</span>
                <span className="font-medium">{currentProfile.totalStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.completedLessons}</span>
                <span className="font-medium">{currentProfile.completedLessons}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FunctionalFreelancerProfile;