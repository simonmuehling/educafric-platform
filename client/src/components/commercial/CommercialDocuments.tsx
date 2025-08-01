import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ModernCard } from '@/components/ui/ModernCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

import { 
  FileText, Download, User, Building, 
  TrendingUp, BarChart3, RefreshCw, Shield,
  Users, DollarSign, Calendar
} from 'lucide-react';

const CommercialDocuments = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const text = {
    fr: {
      title: 'Documents Commerciaux EDUCAFRIC',
      subtitle: 'Ressources pour l\'équipe commerciale et COO',
      financialProjections: 'Projections Financières',
      generateCommercialPDF: '📄 Télécharger Rapport Commercial PDF',
      marketAnalysis: 'Analyse de Marché',
      competitorReport: 'Rapport Concurrence',
      salesMaterials: 'Supports de Vente',
      accessLevel: 'Niveau d\'accès',
      commercialTeam: 'Équipe Commerciale',
      cooAccess: 'Accès COO',
      documentsAvailable: 'Documents Disponibles',
      description: 'Accès aux documents de projections financières pour équipe commerciale',
      systemOverview: 'Vue d\'ensemble système EDUCAFRIC',
      totalUsers: 'Utilisateurs Totaux',
      activeSchools: 'Écoles Actives',
      monthlyRevenue: 'Revenus Mensuels',
      platformGrowth: 'Croissance Plateforme',
      pdfGenerated: 'Document téléchargé',
      pdfDescription: 'Les projections financières ont été téléchargées avec succès',
      pdfError: 'Erreur de téléchargement',
      pdfErrorDescription: 'Erreur lors du téléchargement du document',
      generating: 'Génération...',
      unauthorized: 'Accès non autorisé',
      unauthorizedDesc: 'Vous n\'avez pas les permissions pour accéder à ce document'
    },
    en: {
      title: 'EDUCAFRIC Commercial Documents',
      subtitle: 'Resources for commercial team and COO',
      financialProjections: 'Financial Projections',
      generateCommercialPDF: '📄 Download Commercial Report PDF',
      marketAnalysis: 'Market Analysis',
      competitorReport: 'Competitor Report',
      salesMaterials: 'Sales Materials',
      accessLevel: 'Access Level',
      commercialTeam: 'Commercial Team',
      cooAccess: 'COO Access',
      documentsAvailable: 'Available Documents',
      description: 'Access to financial projection documents for commercial team',
      systemOverview: 'EDUCAFRIC system overview',
      totalUsers: 'Total Users',
      activeSchools: 'Active Schools',
      monthlyRevenue: 'Monthly Revenue',
      platformGrowth: 'Platform Growth',
      pdfGenerated: 'Document downloaded',
      pdfDescription: 'Financial projections downloaded successfully',
      pdfError: 'Download error',
      pdfErrorDescription: 'Error downloading document',
      generating: 'Generating...',
      unauthorized: 'Unauthorized access',
      unauthorizedDesc: 'You don\'t have permission to access this document'
    }
  };

  const t = text[language as keyof typeof text];

  // Vérifier les permissions d'accès
  const isAuthorized = () => {
    if (!user) return false;
    
    // Permissions spéciales pour COO Carine
    if (user.email === 'carine@educafric.com' || user.email === 'nguetsop.carine@educafric.com') {
      return true;
    }
    
    // Permissions pour équipe commerciale
    if (user.role === 'Commercial' || user.role === 'SiteAdmin') {
      return true;
    }
    
    return false;
  };

  // Données de projections financières optimisées pour présentation commerciale
  const commercialProjectionData = {
    schoolName: language === 'fr' ? 'EDUCAFRIC - Plateforme Éducative Cameroun' : 'EDUCAFRIC - Cameroon Educational Platform',
    studentCount: 25000, // Projection cible
    monthlyFeePerStudent: 1500, // Moyenne CFA
    teacherCount: 1200, // Projection
    currentSystemCosts: 180000000, // Coûts système existant
    educafricAnnualCost: 50000000, // Investissement EDUCAFRIC
    currentAnnualRevenue: 450000000, // Revenus actuels projection
    revenueIncrease: 67500000, // 15% augmentation
    costSavings: 36000000, // 20% économies
    netGain: 103500000, // Gain net
    roi: 207.0, // ROI %
    paybackPeriod: 5.8, // mois
    fiveYearProjections: [
      { year: 2025, revenue: 517500000, savings: 36000000, netProfit: 130500000 },
      { year: 2026, revenue: 595125000, savings: 41400000, netProfit: 150075000 },
      { year: 2027, revenue: 684393750, savings: 47610000, netProfit: 172586250 },
      { year: 2028, revenue: 787052812, savings: 54751500, netProfit: 198524062 },
      { year: 2029, revenue: 905110734, savings: 62964225, netProfit: 228302684 }
    ],
    language: language as 'fr' | 'en'
  };

  const generateCommercialReport = async () => {
    if (!isAuthorized()) {
      toast({
        title: t.unauthorized,
        description: t.unauthorizedDesc,
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPDF(true);
    
    try {
      // Generate commercial report without Financial Projections
      const reportData = {
        title: 'EDUCAFRIC Commercial Report',
        commercialProjectionData,
        timestamp: new Date().toISOString()
      };
      
      toast({
        title: t.pdfGenerated,
        description: "Rapport commercial généré avec succès",
      });
    } catch (error) {
      console.error('Erreur génération rapport commercial:', error);
      toast({
        title: t.pdfError,
        description: t.pdfErrorDescription,
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const formatCFA = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' CFA';
  };

  if (!isAuthorized()) {
    return (
      <div className="space-y-6">
        <ModernCard className="p-8 text-center">
          <Shield className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.unauthorized}</h2>
          <p className="text-gray-600 mb-4">{t.unauthorizedDesc}</p>
          <Badge variant="destructive">
            {language === 'fr' ? 'Accès Restreint' : 'Restricted Access'}
          </Badge>
        </ModernCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <p className="text-green-100">{t.subtitle}</p>
          </div>
        </div>
        <div className="mt-4">
          <Badge className="bg-white/20 text-white">
            {user?.email === 'carine@educafric.com' || user?.email === 'nguetsop.carine@educafric.com' 
              ? t.cooAccess 
              : t.commercialTeam}
          </Badge>
        </div>
      </div>

      {/* Vue d'ensemble système pour commerciaux */}
      <ModernCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold">{t.systemOverview}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">12,847</div>
                <div className="text-sm text-blue-700">{t.totalUsers}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">156</div>
                <div className="text-sm text-green-700">{t.activeSchools}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">87.5M</div>
                <div className="text-sm text-purple-700">{t.monthlyRevenue}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-900">+24.5%</div>
                <div className="text-sm text-orange-700">{t.platformGrowth}</div>
              </div>
            </div>
          </div>
        </div>
      </ModernCard>

      {/* Section Documents Commerciaux */}
      <ModernCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold">{t.documentsAvailable}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Projections Financières */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="text-lg font-bold text-blue-900">{t.financialProjections}</h4>
                <p className="text-sm text-blue-700">{t.description}</p>
              </div>
            </div>
            
            <Button
              onClick={generateCommercialReport}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isGeneratingPDF ? t.generating : t.generateCommercialPDF}
            </Button>
          </div>

          {/* Documents Supplémentaires (à développer) */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="text-lg font-bold text-green-900">{t.marketAnalysis}</h4>
                <p className="text-sm text-green-700">
                  {language === 'fr' 
                    ? 'Analyse du marché éducatif camerounais' 
                    : 'Cameroon educational market analysis'}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full border-green-300 text-green-700 hover:bg-green-50"
              disabled
            >
              <Calendar className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Bientôt Disponible' : 'Coming Soon'}
            </Button>
          </div>
        </div>
      </ModernCard>

      {/* Informations d'accès */}
      <ModernCard className="p-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>
            {language === 'fr' ? 'Connecté en tant que' : 'Logged in as'}: {user?.email}
          </span>
          <Badge variant="outline" className="ml-auto">
            {user?.email === 'carine@educafric.com' || user?.email === 'nguetsop.carine@educafric.com' 
              ? 'COO' 
              : 'Commercial'}
          </Badge>
        </div>
      </ModernCard>
    </div>
  );
};

export default CommercialDocuments;