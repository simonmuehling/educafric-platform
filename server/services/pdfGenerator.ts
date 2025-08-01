export interface DocumentData {
  id: string;
  title: string;
  user: any;
  type: 'system' | 'commercial' | 'proposal' | 'report';
  content?: string;
}

export class PDFGenerator {
  static async generateSystemReport(data: DocumentData): Promise<Buffer> {
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
    const doc = new jsPDF();
    
    // Configuration
    doc.setFont('helvetica');
    
    // En-tête avec logo
    doc.setFontSize(20);
    doc.setTextColor(0, 121, 242); // #0079F2
    doc.text('EDUCAFRIC', 20, 30);
    doc.setFontSize(16);
    doc.text('Plateforme Éducative Africaine', 20, 40);
    
    // Ligne de séparation
    doc.setDrawColor(0, 121, 242);
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);
    
    // Métadonnées document
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Document ID: ${data.id}`, 20, 55);
    doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 20, 62);
    doc.text(`Généré par: ${data.user.email}`, 20, 69);
    doc.text(`Type: Rapport Système`, 20, 76);
    
    // Titre principal
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(data.title || 'Rapport Système EDUCAFRIC', 20, 90);
    
    // Contenu principal
    doc.setFontSize(12);
    let yPosition = 110;
    
    // Section Informations système
    doc.setFontSize(14);
    doc.setTextColor(0, 121, 242);
    doc.text('Informations du Système', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const systemInfo = [
      'Utilisateurs actifs: 12,847',
      'Écoles connectées: 156',
      'Revenus mensuels: 87,500,000 CFA',
      'Croissance: +24.5%',
      'Nouveaux utilisateurs (30j): 2,341',
      'Taux de rétention: 89.2%'
    ];
    
    systemInfo.forEach(info => {
      doc.text(`• ${info}`, 25, yPosition);
      yPosition += 8;
    });
    
    yPosition += 10;
    
    // Section Documents récents
    doc.setFontSize(14);
    doc.setTextColor(0, 121, 242);
    doc.text('Documents Récents', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const recentDocs = [
      'Rapport mensuel Janvier 2025',
      'Projections financières Q1 2025',
      'Analyse utilisateurs Yaoundé',
      'Statistiques écoles privées',
      'Rapport sécurité platform'
    ];
    
    recentDocs.forEach(docName => {
      doc.text(`• ${docName}`, 25, yPosition);
      yPosition += 6;
    });
    
    yPosition += 15;
    
    // Section Statistiques détaillées
    doc.setFontSize(14);
    doc.setTextColor(0, 121, 242);
    doc.text('Statistiques Détaillées', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const detailedStats = [
      'Performance du système:',
      '  - Temps de réponse moyen: 245ms',
      '  - Disponibilité: 99.8%',
      '  - Charge CPU moyenne: 23.4%',
      '  - Utilisation mémoire: 67.2%',
      '',
      'Activité utilisateurs:',
      '  - Sessions actives simultanées: 1,247',
      '  - Pages vues (24h): 45,892',
      '  - Temps moyen par session: 18min 34s',
      '  - Taux de rebond: 12.3%',
      '',
      'Répartition géographique:',
      '  - Yaoundé: 45% des utilisateurs',
      '  - Douala: 32% des utilisateurs',
      '  - Autres villes: 23% des utilisateurs'
    ];
    
    detailedStats.forEach(stat => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      doc.text(stat, 25, yPosition);
      yPosition += 6;
    });
    
    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('© 2025 EDUCAFRIC - Confidentiel', 20, 285);
      doc.text(`Page ${i}/${pageCount}`, 170, 285);
    }
    
    return Buffer.from(doc.output('arraybuffer'));
  }
  
  static async generateCommercialDocument(data: DocumentData): Promise<Buffer> {
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
    const doc = new jsPDF();
    
    // Configuration
    doc.setFont('helvetica');
    
    // En-tête commercial
    doc.setFontSize(20);
    doc.setTextColor(139, 92, 246); // #8B5CF6
    doc.text('EDUCAFRIC', 20, 30);
    doc.setFontSize(14);
    doc.text('Solution Éducative Digitale', 20, 40);
    
    // Ligne de séparation
    doc.setDrawColor(139, 92, 246);
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);
    
    // Métadonnées
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Document Commercial ID: ${data.id}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 62);
    doc.text(`Représentant: ${data.user.email}`, 20, 69);
    
    // Titre principal
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(data.title || 'Document Commercial EDUCAFRIC', 20, 85);
    
    // Contenu commercial
    doc.setFontSize(12);
    let yPosition = 105;
    
    // Section Présentation
    doc.setFontSize(14);
    doc.setTextColor(139, 92, 246);
    doc.text('Présentation EDUCAFRIC', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const presentation = [
      'EDUCAFRIC est la première plateforme éducative numérique',
      'spécialement conçue pour le marché africain.',
      '',
      'Notre solution offre:',
      '• Gestion complète des écoles',
      '• Communication parents-enseignants',
      '• Suivi des performances académiques',
      '• Paiements en ligne sécurisés',
      '• Support multilingue (FR/EN)',
      '• Optimisé pour les réseaux africains'
    ];
    
    presentation.forEach(line => {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 30;
      }
      doc.text(line, 20, yPosition);
      yPosition += 8;
    });
    
    yPosition += 10;
    
    // Section Tarifs
    doc.setFontSize(14);
    doc.setTextColor(139, 92, 246);
    doc.text('Plans Tarifaires (CFA)', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const pricing = [
      'ÉCOLES:',
      '• Plan Basic: 50,000 CFA/an',
      '  - Jusqu\'à 200 élèves',
      '  - Fonctionnalités essentielles',
      '',
      '• Plan Premium: 100,000 CFA/an',
      '  - Élèves illimités',
      '  - Toutes les fonctionnalités',
      '  - Support prioritaire',
      '',
      'PARENTS:',
      '• École Publique: 1,000 CFA/mois',
      '• École Privée: 1,500 CFA/mois',
      '  - Réductions famille nombreuse'
    ];
    
    pricing.forEach(line => {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 30;
      }
      doc.text(line, 20, yPosition);
      yPosition += 7;
    });
    
    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('© 2025 EDUCAFRIC - info@educafric.com', 20, 285);
      doc.text(`Page ${i}/${pageCount}`, 170, 285);
    }
    
    return Buffer.from(doc.output('arraybuffer'));
  }
  
  static async generateProposalDocument(data: DocumentData): Promise<Buffer> {
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
    const doc = new jsPDF();
    
    // Configuration
    doc.setFont('helvetica');
    
    // En-tête proposition
    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129); // #10B981
    doc.text('EDUCAFRIC', 20, 30);
    doc.setFontSize(14);
    doc.text('Proposition de Partenariat', 20, 40);
    
    // Ligne de séparation
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);
    
    // Métadonnées
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Proposition ID: ${data.id}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 62);
    doc.text(`Contact: ${data.user.email}`, 20, 69);
    
    // Titre principal
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(data.title || 'Proposition de Partenariat EDUCAFRIC', 20, 85);
    
    // Contenu proposition
    doc.setFontSize(12);
    let yPosition = 105;
    
    const proposalContent = [
      'Cher partenaire,',
      '',
      'Nous vous proposons un partenariat stratégique avec EDUCAFRIC',
      'pour révolutionner l\'éducation en Afrique.',
      '',
      'Avantages du partenariat:',
      '• Accès au marché éducatif africain',
      '• Technologie éprouvée et adaptée',
      '• Support technique complet',
      '• Formation des équipes',
      '• Revenus partagés',
      '',
      'Nos références:',
      '• 156 écoles partenaires',
      '• 12,847 utilisateurs actifs',
      '• 87.5M CFA de revenus mensuels',
      '• 89.2% de taux de satisfaction',
      '',
      'Prochaines étapes:',
      '1. Présentation détaillée',
      '2. Négociation des termes',
      '3. Signature du contrat',
      '4. Déploiement pilote',
      '5. Expansion régionale'
    ];
    
    proposalContent.forEach(line => {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 30;
      }
      doc.text(line, 20, yPosition);
      yPosition += 8;
    });
    
    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('© 2025 EDUCAFRIC - Confidentiel', 20, 285);
      doc.text(`Page ${i}/${pageCount}`, 170, 285);
    }
    
    return Buffer.from(doc.output('arraybuffer'));
  }
}