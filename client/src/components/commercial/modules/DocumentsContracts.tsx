import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { FileText, Search, Download, Eye, Share, Plus, Filter, Calendar, Building2, Trash2 } from 'lucide-react';

const DocumentsContracts = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const text = {
    fr: {
      title: 'Documents & Contrats',
      subtitle: 'Hub documentaire commercial et gestion des contrats',
      searchPlaceholder: 'Rechercher document...',
      addDocument: 'Ajouter Document',
      all: 'Tous',
      contracts: 'Contrats',
      brochures: 'Brochures',
      templates: 'Modèles',
      legal: 'Juridiques',
      marketing: 'Marketing',
      name: 'Nom',
      type: 'Type',
      school: 'École',
      date: 'Date',
      status: 'Statut',
      size: 'Taille',
      actions: 'Actions',
      view: 'Voir',
      download: 'Télécharger',
      share: 'Partager',
      edit: 'Modifier',
      draft: 'Brouillon',
      signed: 'Signé',
      pending: 'En Attente',
      expired: 'Expiré',
      contract: 'Contrat',
      brochure: 'Brochure',
      template: 'Modèle',
      proposal: 'Proposition'
    },
    en: {
      title: 'Documents & Contracts',
      subtitle: 'Commercial document hub and contract management',
      searchPlaceholder: 'Search documents...',
      addDocument: 'Add Document',
      all: 'All',
      contracts: 'Contracts',
      brochures: 'Brochures',
      templates: 'Templates',
      legal: 'Legal',
      marketing: 'Marketing',
      name: 'Name',
      type: 'Type',
      school: 'School',
      date: 'Date',
      status: 'Status',
      size: 'Size',
      actions: 'Actions',
      view: 'View',
      download: 'Download',
      share: 'Share',
      edit: 'Edit',
      draft: 'Draft',
      signed: 'Signed',
      pending: 'Pending',
      expired: 'Expired',
      contract: 'Contract',
      brochure: 'Brochure',
      template: 'Template',
      proposal: 'Proposal'
    }
  };

  const t = text[language as keyof typeof text];

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: 'Contrat Premium - École Bilingue Yaoundé',
      type: 'contract',
      category: 'contracts',
      school: 'École Primaire Bilingue Yaoundé',
      date: '2024-01-20',
      status: 'signed',
      size: '2.4 MB',
      format: 'PDF',
      description: 'Contrat annuel premium avec services étendus',
      content: `CONTRAT DE SERVICE EDUCAFRIC
École Primaire Bilingue de Yaoundé

OBJET DU CONTRAT
Le présent contrat définit les termes et conditions de fourniture des services de la plateforme éducative EDUCAFRIC à l'École Primaire Bilingue de Yaoundé pour l'année scolaire 2024-2025.

SERVICES INCLUS

1. PLATEFORME ÉDUCATIVE COMPLÈTE
   • Accès illimité à tous les modules EDUCAFRIC
   • Gestion académique intégrée (notes, bulletins, emplois du temps)
   • Système de communication multi-canal (SMS, WhatsApp, Email)
   • Outils de gestion financière et paiements

2. FORMATION ET ACCOMPAGNEMENT
   • Formation initiale du personnel (20 heures)
   • Support technique 24/7 en français
   • Mise à jour gratuite de la plateforme
   • Assistance à la migration des données existantes

3. MODULES PREMIUM ACTIVÉS
   • Géolocalisation des élèves et personnel
   • Rapports avancés et tableaux de bord
   • Intégration Orange Money / MTN Mobile Money
   • Système de notifications push avancé

TARIFICATION
Abonnement annuel: 65,000 CFA
Paiement: Trimestriel (16,250 CFA par trimestre)
Frais d'installation: 15,000 CFA (unique)

ENGAGEMENTS EDUCAFRIC
• Disponibilité service: 99.5%
• Temps de réponse support: < 2 heures
• Sauvegarde quotidienne des données
• Conformité RGPD et sécurité des données

ENGAGEMENTS ÉCOLE
• Formation du personnel désigné
• Respect des conditions d'utilisation
• Paiement selon échéancier convenu
• Communication des modifications organisationnelles

DURÉE ET RÉSILIATION
Durée: 12 mois renouvelable
Préavis résiliation: 30 jours
Transfert données: Gratuit en fin de contrat

CONDITIONS PARTICULIÈRES
• Nombre maximum d'utilisateurs: 150
• Espace de stockage: 10 GB
• Nombre de SMS inclus: 2,000/mois
• Support prioritaire inclus

Fait à Yaoundé, le 20 janvier 2024

Pour EDUCAFRIC:                    Pour l'École:
Simon ABANDA                       Directeur Académique
Directeur Commercial               École Primaire Bilingue Yaoundé

Signature: _________________      Signature: _________________

EDUCAFRIC Platform v4.2.3
Contact: support@educafric.com | Tél: +237 XXX XXX XXX`
    },
    {
      id: 2,
      name: 'Brochure Marketing 2024',
      type: 'brochure',
      category: 'brochures',
      school: 'Usage général',
      date: '2024-01-15',
      status: 'finalized',
      size: '3.2 MB',
      format: 'PDF',
      description: 'Matériel de présentation commercial EDUCAFRIC',
      content: 'EDUCAFRIC - Révolutionnez l\'éducation en Afrique. Plateforme éducative complète pour les écoles africaines avec gestion académique, outils pédagogiques et communication intégrée.'
    },
    {
      id: 3,
      name: 'Proposition Lycée Excellence',
      type: 'proposal',
      category: 'contracts',
      school: 'Lycée Excellence Douala',
      date: '2024-01-10',
      status: 'pending',
      size: '1.8 MB',
      format: 'PDF',
      description: 'Proposition commerciale pour implémentation complète',
      content: 'PROPOSITION COMMERCIALE - Lycée Excellence Douala - Implémentation plateforme EDUCAFRIC avec formation personnalisée et migration des données existantes.'
    },
    {
      id: 4,
      name: 'Modele Contrat Partenariat Établissement EDUCAFRIC 2025',
      type: 'template',
      category: 'templates',
      school: 'Template general',
      date: '2025-02-01',
      status: 'finalized',
      size: '1.5 MB',
      format: 'PDF',
      description: 'Modèle de contrat de partenariat éducatif pour établissements scolaires avec approche collaborative',
      content: `EDUCAFRIC - CONTRAT DE PARTENARIAT ÉDUCATIF 2025
ACCORD DE COLLABORATION PÉDAGOGIQUE ET TECHNOLOGIQUE
Version Partenariat Établissements - Février 2025

=== PRÉAMBULE ===

NATURE DU PARTENARIAT
Le présent accord établit un partenariat stratégique entre EDUCAFRIC et l'établissement scolaire partenaire dans le cadre de la transformation numérique de l'éducation en Afrique.

PARTENAIRES

EDUCAFRIC - PARTENAIRE TECHNOLOGIQUE:
Entité juridique: AFRO METAVERSE MARKETING SARL
Siège social: Yaoundé, Cameroun
Secteur: Innovation éducative et technologies numériques
Email: partenariats@educafric.com
Téléphone: +237 XXX XXX XXX
Représentant: [DIRECTEUR PARTENARIATS], Directeur des Partenariats Éducatifs

ÉTABLISSEMENT PARTENAIRE:
Nom de l'établissement: [NOM DE L'ÉCOLE PARTENAIRE]
Statut: [Public/Privé/Conventionné]
Adresse: [ADRESSE COMPLÈTE]
Directeur/Directrice: [NOM DU DIRECTEUR]
Contact: [EMAIL ET TÉLÉPHONE]
Effectifs: [NOMBRE D'ÉLÈVES] élèves, [NOMBRE] enseignants

VISION PARTENARIALE
Ensemble, nous nous engageons à révolutionner l'expérience éducative africaine en combinant l'excellence pédagogique traditionnelle avec les innovations technologiques modernes.

OBJECTIFS STRATÉGIQUES COMMUNS
✓ Amélioration de la qualité éducative par le numérique
✓ Renforcement de la communication école-famille-communauté
✓ Développement des compétences numériques du personnel
✓ Optimisation de la gestion administrative et pédagogique
✓ Promotion de l'innovation éducative en Afrique
✓ Création d'un modèle de référence pour d'autres établissements

=== ARTICLE 1 - CADRE DU PARTENARIAT ===

1.1 MISSION ÉDUCATIVE COMMUNE
Le partenariat vise à créer un écosystème éducatif numérique exemplaire qui servira de modèle pour la transformation digitale des établissements africains.

1.2 DURÉE DU PARTENARIAT
• Partenariat initial: 3 ans renouvelables
• Phase pilote: 6 mois d'accompagnement renforcé
• Évaluation semestrielle des résultats
• Possibilité d'extension selon bilan de performance

1.3 TERRITOIRE DE COLLABORATION
• Implémentation exclusive dans l'établissement partenaire
• Possibilité d'extension aux établissements associés
• Participation aux réseaux d'écoles EDUCAFRIC
• Rayonnement régional comme école de référence

=== ARTICLE 2 - ENGAGEMENTS MUTUELS ===

2.1 ENGAGEMENTS D'EDUCAFRIC

INNOVATION TECHNOLOGIQUE:
• Mise à disposition de la plateforme EDUCAFRIC complète
• Accès prioritaire aux nouvelles fonctionnalités
• Personnalisation selon les besoins spécifiques
• Interface bilingue français/anglais adaptée

ACCOMPAGNEMENT PÉDAGOGIQUE:
• Formation approfondie de l'équipe dirigeante
• Coaching personnalisé des enseignants
• Ateliers mensuels d'innovation pédagogique
• Certification EDUCAFRIC pour le personnel

SUPPORT TECHNIQUE PRIVILÉGIÉ:
• Ligne directe support partenaires prioritaires
• Intervention sur site si nécessaire
• Maintenance préventive trimestrielle
• Garantie uptime 99,7% avec compensation

2.2 ENGAGEMENTS DE L'ÉTABLISSEMENT PARTENAIRE

LEADERSHIP PÉDAGOGIQUE:
• Nomination d'un coordinateur digital dédié
• Participation active aux formations proposées
• Feedback constructif pour amélioration continue
• Partage d'expériences avec réseau partenaires

COMMUNICATION ET PROMOTION:
• Autorisation d'utilisation comme référence client
• Participation aux événements EDUCAFRIC
• Témoignages et études de cas
• Accueil de délégations d'autres établissements

=== ARTICLE 3 - CONDITIONS FINANCIÈRES PARTENARIALES ===

3.1 MODÈLE ÉCONOMIQUE COLLABORATIF
Le partenariat fonctionne sur un modèle gagnant-gagnant avec des conditions préférentielles reflétant l'engagement mutuel dans l'innovation éducative africaine.

3.2 TARIFICATION PARTENAIRE PRIVILÉGIÉ
• Écoles publiques/conventionnées: 35.000 CFA/mois (350.000 CFA/an)
• Écoles privées: 65.000 CFA/mois (650.000 CFA/an)
• Établissements d'excellence: 95.000 CFA/mois (950.000 CFA/an)
• Réduction partenaire stratégique: -25% sur tarifs standards

3.3 MODALITÉS DE PAIEMENT FLEXIBLES
• Paiement semestriel avec 10% de réduction
• Paiement annual avec 20% de réduction
• Possibilité d'échelonnement personnalisé
• Orange Money, MTN Mobile Money, virements bancaires
• Période d'évaluation: 60 jours sans engagement

3.4 INVESTISSEMENTS PARTAGÉS
EDUCAFRIC investit dans:
• Formation approfondie équipe (valeur 500.000 CFA)
• Personnalisation interface aux couleurs de l'école
• Développement fonctionnalités spécifiques demandées
• Support marketing et communication

L'ÉTABLISSEMENT investit dans:
• Infrastructure réseau minimum requis
• Équipement basique (tablettes/ordinateurs selon besoins)
• Temps formation personnel
• Promotion du partenariat dans son réseau

=== ARTICLE 4 - PROPRIÉTÉ INTELLECTUELLE ET INNOVATION ===

4.1 DROITS ET PROPRIÉTÉS
• EDUCAFRIC: Plateforme, code source, algorithmes, marque
• ÉTABLISSEMENT: Données scolaires exclusives + méthodes pédagogiques
• COMMUN: Innovations développées ensemble, retours d'expérience

4.2 CONFIDENTIALITÉ RENFORCÉE
• Protection données élèves/parents selon standards internationaux
• Clause de non-concurrence mutuelle sur le territoire
• Partage sécurisé des bonnes pratiques dans le réseau EDUCAFRIC

=== ARTICLE 5 - GOUVERNANCE ET SUIVI DU PARTENARIAT ===

5.1 COMITÉ DE PILOTAGE
Composition: 2 représentants EDUCAFRIC + 2 représentants établissement
Réunions: Trimestrielles + réunions extraordinaires si besoin
Missions: Suivi performance, ajustements, planification évolutions

5.2 INDICATEURS DE PERFORMANCE PARTAGÉS
• Taux d'adoption par les enseignants: objectif 90%
• Satisfaction parents (enquêtes): objectif 85%
• Amélioration résultats scolaires: suivi sur 2 ans
• Réduction temps administratif: objectif -40%

=== ARTICLE 6 - ÉVOLUTION ET RENOUVELLEMENT DU PARTENARIAT ===

6.1 MÉCANISMES D'ÉVOLUTION
• Révision annuelle des termes selon performances
• Possibilité d'upgrade vers statut "École Ambassadrice EDUCAFRIC"
• Extension automatique si objectifs atteints à 80%
• Négociation de nouvelles modalités selon besoins émergents

6.2 CONDITIONS DE SORTIE AMIABLE
• Préavis de 90 jours minimum pour fin de partenariat
• Accompagnement migration données garantie 6 mois
• Possibilité de reprendre le partenariat dans les 24 mois
• Engagement de confidentialité permanent sur les innovations communes

=== ARTICLE 7 - FEUILLE DE ROUTE D'IMPLÉMENTATION ===

PHASE 1 - PRÉPARATION (Mois 1-2):
• Audit infrastructure existante
• Formation équipe dirigeante (40h)
• Paramétrage personnalisé plateforme
• Migration données existantes

PHASE 2 - DÉPLOIEMENT (Mois 3-4):
• Formation enseignants par vagues (80h total)
• Mise en service progressive par niveaux
• Accompagnement quotidien sur site
• Tests et ajustements continus

PHASE 3 - STABILISATION (Mois 5-6):
• Formation parents et communication
• Optimisation processus
• Première évaluation partenariale
• Planification développements futurs

=== DISPOSITIONS FINALES ===

DROIT APPLICABLE:
Législation camerounaise - Tribunaux de Yaoundé compétents
Langue officielle du contrat: Français
Médiation préalable obligatoire en cas de différend

ANNEXES TECHNIQUES:
• Annexe A: Spécifications techniques détaillées
• Annexe B: Plan de formation personnalisé
• Annexe C: Indicateurs de performance et reporting
• Annexe D: Charte qualité du partenariat

=== SIGNATURES ===

POUR EDUCAFRIC                           POUR L'ÉTABLISSEMENT PARTENAIRE
AFRO METAVERSE MARKETING SARL

_________________________              _________________________
[NOM DU REPRÉSENTANT]                   [NOM DU DIRECTEUR]
Directeur des Partenariats              Directeur de l'établissement
Date: _______________                   Date: _______________
Signature et cachet                     Signature et cachet


Fait en deux exemplaires à ____________, le _______________

---
Document généré par EDUCAFRIC Platform v4.2.3
Contrat de Partenariat Éducatif - www.educafric.com
"Ensemble, révolutionnons l'éducation africaine"`
    },
    {
      id: 5,
      name: 'CGV Educafric 2024',
      type: 'legal',
      category: 'legal',
      school: 'Document légal',
      date: '2024-01-01',
      status: 'finalized',
      size: '890 KB',
      format: 'PDF',
      description: 'CGV mises à jour 2024',
      content: 'CONDITIONS GÉNÉRALES DE VENTE EDUCAFRIC 2024 - Document légal officiel avec conditions commerciales, tarification, modalités de paiement et cadre juridique pour les services EDUCAFRIC en Afrique. Version mise à jour janvier 2024.'
    },
    {
      id: 6,
      name: 'Guide Marketing Digital',
      type: 'brochure',
      category: 'marketing',
      school: 'Formation commerciale',
      date: '2024-01-25',
      status: 'finalized',
      size: '4.1 MB',
      format: 'PDF',
      description: 'Stratégies marketing pour écoles africaines',
      content: `GUIDE MARKETING DIGITAL EDUCAFRIC 2025
STRATÉGIES NUMÉRIQUES POUR ÉCOLES AFRICAINES
Guide Pratique - Formation Commerciale

=== SOMMAIRE ===

1. Introduction au Marketing Digital Éducatif Africain
2. Comprendre le Marché Éducatif Numérique en Afrique
3. Stratégies de Communication Digitale pour Écoles
4. Utilisation des Réseaux Sociaux en Contexte Éducatif
5. Marketing Mobile et SMS en Afrique
6. Email Marketing et Newsletters Éducatives
7. Techniques de Prospection Digitale B2B/B2C
8. Gestion de la Réputation en Ligne
9. Mesure de Performance et Analytics
10. Études de Cas - Succès EDUCAFRIC

=== CHAPITRE 1 - INTRODUCTION AU MARKETING DIGITAL ÉDUCATIF ===

POURQUOI LE MARKETING DIGITAL POUR LES ÉCOLES AFRICAINES ?

Révolution Numérique en Cours :
• 470 millions d'africains connectés à internet (2024)
• 80% des parents africains utilisent WhatsApp quotidiennement
• 65% des décisions éducatives influencées par le digital
• Croissance de 25% par an du e-learning en Afrique

Avantages Spécifiques au Contexte Africain :
• Coût réduit par rapport au marketing traditionnel (-70%)
• Portée géographique étendue (zones rurales incluses)
• Communication multilingue (français/anglais/langues locales)
• Mesure précise du retour sur investissement
• Adaptation aux habitudes de consommation mobile

Défis Uniques à Surmonter :
• Connectivité internet intermittente
• Préférences pour la communication orale
• Méfiance envers les nouvelles technologies
• Budget marketing limité des établissements
• Concurrence traditionnelle forte

=== CHAPITRE 2 - COMPRENDRE LE MARCHÉ ÉDUCATIF NUMÉRIQUE ===

SEGMENTATION DU MARCHÉ ÉDUCATIF AFRICAIN

Écoles Publiques (40% du marché) :
• Budget limité mais besoins importants
• Décision centralisée (Ministère/Délégation)
• Cycle de décision long (6-12 mois)
• Sensibilité prix très élevée
• Priorité : efficacité administrative

Écoles Privées Confessionnelles (35% du marché) :
• Budget modéré, gestion prudente des finances
• Décision collégiale (Conseil d'administration)
• Cycle de décision moyen (3-6 mois)
• Recherche de solutions durables
• Priorité : qualité pédagogique et communication

Écoles Privées Laïques (20% du marché) :
• Budget plus élevé, innovation recherchée
• Décision rapide (Directeur/Propriétaire)
• Cycle de décision court (1-3 mois)
• Ouverture aux nouvelles technologies
• Priorité : différenciation concurrentielle

Freelancers Éducatifs (5% du marché) :
• Budget personnel très limité
• Décision individuelle immédiate
• Sensibilité prix extrême
• Recherche de rentabilité rapide
• Priorité : simplicité d'utilisation

PERSONAS CIBLES DÉTAILLÉS

Le Directeur d'École Publique :
• Âge : 45-60 ans
• Formation : Diplôme pédagogique + expérience
• Principales préoccupations : Budget, conformité, efficacité
• Canaux de communication : Email officiel, téléphone
• Motivations : Modernisation sans surcoût, respect des directives
• Freins : Procédures bureaucratiques, validation hiérarchique

La Directrice d'École Privée :
• Âge : 35-50 ans
• Formation : MBA ou formation commerciale
• Principales préoccupations : Satisfaction parents, rentabilité
• Canaux de communication : WhatsApp, réseaux sociaux, email
• Motivations : Différenciation, satisfaction client, croissance
• Freins : ROI incertain, résistance au changement équipe

Le Parent d'Élève Urbain :
• Âge : 30-45 ans
• Profil : Cadre, commerçant, fonctionnaire
• Revenus : 150,000 - 800,000 CFA/mois
• Équipement : Smartphone, connexion internet
• Motivations : Suivi enfant, communication école
• Canaux préférés : WhatsApp (85%), SMS (70%), Email (45%)

=== CHAPITRE 3 - STRATÉGIES DE COMMUNICATION DIGITALE ===

FRAMEWORK DE COMMUNICATION ÉDUCATIVE DIGITALE

Stratégie AIDA Adaptée au Contexte Africain :

ATTENTION (Capter l'intérêt) :
• Messages percutants en langues locales
• Témoignages d'écoles locales reconnues
• Statistiques d'amélioration concrètes
• Vidéos de démonstration courtes (30 sec max)
• Visuels colorés et professionnels africains

INTÉRÊT (Susciter l'engagement) :
• Études de cas détaillées d'écoles similaires
• Démonstrations personnalisées gratuites
• Webinaires en français/anglais
• Contenus éducatifs gratuits (guides, templates)
• Témoignages vidéo de directeurs satisfaits

DÉSIR (Créer l'envie d'acquérir) :
• Essais gratuits étendus (60 jours)
• Offres de lancement exclusives
• Comparaisons avec solutions existantes
• Calculs de retour sur investissement personnalisés
• Garanties de satisfaction et de résultats

ACTION (Déclencher l'achat) :
• Processus d'inscription simplifié
• Support d'implémentation inclus
• Formation équipe comprise dans l'offre
• Paiement mobile (Orange Money, MTN)
• Facilités de paiement échelonné

MESSAGES CLÉS PAR CIBLE

Pour les Écoles Publiques :
• "Modernisez votre école sans dépasser votre budget"
• "Conformité garantie avec les directives ministérielles"
• "Formation incluse pour votre personnel existant"
• "Support technique gratuit en français"
• "Amélioration de l'efficacité administrative de 60%"

Pour les Écoles Privées :
• "Démarquez-vous avec la technologie éducative de pointe"
• "Satisfaites les parents avec une communication moderne"
• "Augmentez vos inscriptions grâce à votre image innovante"
• "Réduisez vos coûts administratifs de 40%"
• "Fidélisez vos familles avec un service premium"

Pour les Parents :
• "Suivez la scolarité de votre enfant en temps réel"
• "Communiquez directement avec les enseignants"
• "Recevez toutes les informations importantes instantanément"
• "Sécurisez le trajet de votre enfant avec la géolocalisation"
• "Accédez à l'historique complet des notes et présences"

=== CHAPITRE 4 - RÉSEAUX SOCIAUX EN CONTEXTE ÉDUCATIF ===

STRATÉGIE FACEBOOK POUR ÉCOLES AFRICAINES

Pourquoi Facebook ?
• 180 millions d'utilisateurs africains actifs
• Plateforme préférée des parents (65% de présence)
• Possibilité de ciblage géographique précis
• Coût publicitaire avantageux en Afrique
• Format vidéo très engageant

Types de Contenus Performants :
• Témoignages vidéo de directeurs (portée moyenne : +300%)
• Démonstrations de fonctionnalités (engagement : +250%)
• Success stories d'élèves (partages : +400%)
• Conseils éducatifs gratuits (sauvegardes : +180%)
• Événements éducatifs en live (commentaires : +320%)

Calendrier de Publication Optimal :
• Lundi 8h-10h : Conseils pédagogiques
• Mercredi 15h-17h : Témoignages écoles
• Vendredi 18h-20h : Success stories élèves
• Dimanche 16h-18h : Contenus inspirants parents

Budgets Publicitaires Recommandés :
• Écoles urbaines : 50,000 CFA/mois
• Écoles périurbaines : 25,000 CFA/mois
• Couverture nationale : 200,000 CFA/mois
• Événements spéciaux : 75,000 CFA/campagne

STRATÉGIE WHATSAPP BUSINESS

Avantages Uniques pour l'Afrique :
• 95% de taux d'ouverture des messages
• Application la plus utilisée (80% des smartphones)
• Communication directe et personnalisée
• Possibilité d'envoyer documents et vidéos
• Fonctionnement même avec faible connexion

Mise en Place du WhatsApp Business :
1. Création du profil professionnel EDUCAFRIC
2. Configuration des messages automatiques
3. Création de catalogues de services
4. Mise en place des réponses rapides
5. Formation équipe commerciale à l'utilisation

Templates de Messages Efficaces :

Message d'Accueil :
"🎓 Bonjour ! Bienvenue chez EDUCAFRIC, la solution éducative moderne pour l'Afrique. Comment pouvons-nous transformer votre école aujourd'hui ?"

Suivi Prospect École :
"Bonjour [Nom Directeur], Suite à notre échange sur EDUCAFRIC, j'ai préparé une démonstration personnalisée de 15 minutes pour votre école. Quand seriez-vous disponible cette semaine ?"

Relance Parent :
"Bonjour [Nom Parent], Votre essai gratuit EDUCAFRIC se termine dans 3 jours. Souhaitez-vous que nous planifions un appel pour répondre à vos questions ?"

=== CHAPITRE 5 - MARKETING MOBILE ET SMS ===

POURQUOI LE SMS RESTE ROI EN AFRIQUE

Statistiques Clés :
• 98% de taux de lecture des SMS
• 450 millions d'abonnés mobiles en Afrique
• 85% des téléphones supportent les SMS
• Coût moyen : 10-25 CFA par SMS
• Temps de lecture moyen : 3 secondes

Avantages Spécifiques au Contexte Africain :
• Fonctionne sur tous types de téléphones
• Pas besoin d'internet pour recevoir
• Habitude bien ancrée dans la population
• Taux de conversion élevé (12-18%)
• Possibilité de personnalisation avancée

CAMPAGNES SMS EFFICACES

Campagne de Sensibilisation École :
Message : "🏫 [Nom École], modernisez votre gestion avec EDUCAFRIC ! Démonstration gratuite cette semaine. Répondez OUI pour un RDV. educafric.com"
Timing : Mardi 14h-16h
Cible : Directeurs d'écoles privées
Taux de réponse attendu : 8-12%

Campagne Parents Prospects :
Message : "👨‍👩‍👧‍👦 Suivez la scolarité de votre enfant en temps réel ! Essai gratuit EDUCAFRIC 30 jours. Téléchargez l'app : [lien court]"
Timing : Dimanche 17h-19h
Cible : Parents zones urbaines
Taux de conversion attendu : 5-8%

Campagne Réactivation :
Message : "🔔 [Prénom], votre essai EDUCAFRIC expire demain ! 50% de réduction sur votre 1er mois. Code : AFRIQUE50. Activez maintenant : [lien]"
Timing : Jeudi 19h-21h
Cible : Utilisateurs essai inactifs
Taux de conversion attendu : 15-25%

OPTIMISATION DES CAMPAGNES MOBILES

A/B Testing Systématique :
• Version A vs Version B pour chaque message
• Test sur 10% de la base avant envoi massif
• Mesure des taux d'ouverture, clics, conversions
• Optimisation continue basée sur les résultats
• Documentation des meilleures pratiques

Segmentation Avancée :
• Par région géographique (urbain/rural)
• Par type d'établissement (public/privé)
• Par taille d'école (petite/moyenne/grande)
• Par niveau d'adoption technologique
• Par budget disponible estimé

=== CHAPITRE 6 - EMAIL MARKETING ÉDUCATIF ===

CONSTRUCTION DE LISTES EMAIL QUALIFIÉES

Sources de Collecte d'Emails :
• Inscriptions site web educafric.com
• Formulaires lors de démonstrations
• Webinaires éducatifs gratuits
• Téléchargements de guides pratiques
• Échanges de cartes de visite événements

Lead Magnets Performants :
• "Guide de Digitalisation d'École en 30 Jours"
• "Template Bulletin Scolaire Camerounais"
• "Checklist Rentrée Scolaire Moderne"
• "Calcul ROI Plateforme Éducative"
• "Webinaire : Communication École-Parents"

SÉQUENCES EMAIL AUTOMATISÉES

Séquence d'Onboarding Directeur (7 emails sur 14 jours) :

Email 1 - Bienvenue (Immédiat) :
Objet : "🎓 Bienvenue dans la révolution éducative africaine !"
Contenu : Présentation EDUCAFRIC, bénéfices clés, lien démo
CTA : "Planifier ma démonstration gratuite"

Email 2 - Éducation (J+2) :
Objet : "Comment réduire votre charge administrative de 60% ?"
Contenu : Étude de cas École Saint-Charles Douala
CTA : "Télécharger l'étude de cas complète"

Email 3 - Social Proof (J+4) :
Objet : "125 écoles africaines nous font déjà confiance"
Contenu : Témoignages vidéo, statistiques satisfaction
CTA : "Voir tous les témoignages"

Email 4 - Démonstration (J+7) :
Objet : "Votre démonstration personnalisée vous attend"
Contenu : Lien calendrier, bénéfices spécifiques
CTA : "Réserver ma démo maintenant"

Email 5 - Objections (J+10) :
Objet : "Les 5 préoccupations principales des directeurs"
Contenu : FAQ détaillée, réponses rassurantes
CTA : "Poser ma question personnelle"

Email 6 - Urgence (J+12) :
Objet : "Dernière chance - Offre de lancement expire demain"
Contenu : Récapitulatif offre, témoignages urgents
CTA : "Profiter de l'offre maintenant"

Email 7 - Relance finale (J+14) :
Objet : "Nous restons à votre disposition"
Contenu : Résumé valeur, contact direct
CTA : "Maintenir le contact"

INDICATEURS DE PERFORMANCE EMAIL

KPIs à Surveiller :
• Taux d'ouverture : Objectif 25-35% (secteur éducatif)
• Taux de clic : Objectif 8-15%
• Taux de désabonnement : <2%
• Taux de conversion : 3-8%
• Score de délivrabilité : >95%

Optimisations Techniques :
• Authentification SPF/DKIM configurée
• Listes nettoyées régulièrement
• Tests anti-spam systématiques
• Design responsive mobile
• Temps de chargement <3 secondes

=== CHAPITRE 7 - PROSPECTION DIGITALE B2B/B2C ===

STRATÉGIE DE PROSPECTION LINKEDIN

Pourquoi LinkedIn pour l'Éducation ?
• 25 millions de professionnels africains
• Directeurs d'écoles privées très présents
• Possibilité de ciblage par secteur/poste
• Crédibilité professionnelle élevée
• Partage de contenus éducatifs valorisants

Construction du Profil Commercial EDUCAFRIC :
• Photo professionnelle de qualité
• Titre accrocheur : "Spécialiste Transformation Digitale Éducative"
• Résumé axé sur les résultats clients
• Publications régulières de conseils éducatifs
• Recommandations de directeurs satisfaits

Messages de Prospection Efficaces :

Premier Contact :
"Bonjour [Prénom], J'ai vu que vous dirigez [Nom École] depuis [X] ans. Félicitations pour votre engagement éducatif ! Je aide les directeurs comme vous à moderniser leur gestion sans bouleverser leurs habitudes. Seriez-vous ouvert à un échange de 15 minutes cette semaine ?"

Suivi Après Connexion :
"Merci d'avoir accepté ma connexion ! [École] semble être un établissement innovant. Nos écoles partenaires augmentent leur satisfaction parents de 40% en moyenne. Puis-je vous montrer comment en 15 minutes ?"

Relance Après Silence :
"[Prénom], j'imagine que la rentrée vous occupe beaucoup ! Juste un rappel rapide : j'ai une démo EDUCAFRIC prête spécialement pour [École]. 15 minutes pour voir comment économiser 10h/semaine d'administration ?"

PROSPECTION TÉLÉPHONIQUE DIGITALEMENT ASSISTÉE

Préparation Digitale Avant Appel :
• Recherche LinkedIn/Facebook de l'établissement
• Vérification des avis Google de l'école
• Identification des défis probables (via site web)
• Préparation d'arguments personnalisés
• Planification du timing optimal d'appel

Script d'Appel à Froid Optimisé :

Introduction (15 secondes) :
"Bonjour [Titre] [Nom], [Prénom] d'EDUCAFRIC. Je vous appelle car j'aide spécifiquement les écoles [caractéristique spécifique] comme [Nom École] à moderniser leur gestion. Avez-vous 2 minutes ?"

Accroche Personnalisée (30 secondes) :
"J'ai vu que [École] met l'accent sur [point fort identifié]. Nos écoles partenaires comme [école similaire locale] ont réduit leur temps administratif de 40% tout en améliorant la communication parents. Cela pourrait-il vous intéresser ?"

Découverte Rapide (45 secondes) :
"Actuellement, comment gérez-vous [point de douleur identifié] ? ... Je vois. C'est exactement le défi que nous résolvons pour [référence locale]. Puis-je vous montrer comment en 15 minutes cette semaine ?"

Closing (15 secondes) :
"Parfait ! Je vous envoie un lien de calendrier par WhatsApp pour que vous choisissiez le créneau qui vous convient. Merci [Titre] [Nom] !"

=== CHAPITRE 8 - GESTION DE LA RÉPUTATION EN LIGNE ===

SURVEILLANCE DE L'E-RÉPUTATION EDUCAFRIC

Outils de Monitoring Recommandés :
• Google Alerts sur "EDUCAFRIC"
• Surveillance mentions réseaux sociaux
• Suivi avis Google My Business
• Monitoring forums éducatifs africains
• Veille concurrentielle automatisée

Points de Surveillance Critiques :
• Avis clients sur toutes plateformes
• Mentions dans médias éducatifs
• Discussions forums de directeurs
• Commentaires sur publications sociales
• Retours clients lors d'événements

STRATÉGIE DE GESTION DES AVIS

Avis Positifs (Amplification) :
• Remerciement public personnalisé
• Partage sur tous canaux sociaux
• Inclusion dans matériel commercial
• Invitation à témoignage vidéo
• Récompense/recognition du client

Avis Négatifs (Gestion de Crise) :

Réponse Immédiate (dans les 2h) :
"Bonjour [Nom], Merci pour ce retour. Nous prenons très au sérieux votre expérience. Je vous contact directement pour comprendre et résoudre rapidement ce problème. Cordialement, [Nom] - Équipe EDUCAFRIC"

Actions Correctives :
• Contact téléphonique immédiat du client
• Identification et correction du problème
• Compensation si nécessaire
• Suivi satisfaction après résolution
• Formation équipe si problème récurrent

Communication Post-Résolution :
"Mise à jour : Nous avons résolu le problème évoqué par [Nom] grâce à [actions prises]. Nous remercions tous nos clients qui nous aident à nous améliorer continuellement."

CONSTRUCTION DE PREUVES SOCIALES

Témoignages Vidéo Structurés :

Questions Guide pour Directeurs :
1. "Présentez-vous et votre établissement"
2. "Quel était votre défi avant EDUCAFRIC ?"
3. "Pourquoi avoir choisi notre solution ?"
4. "Quels résultats avez-vous obtenus ?"
5. "Que diriez-vous aux directeurs hésitants ?"

Format Optimal :
• Durée : 2-3 minutes maximum
• Qualité HD avec bon éclairage
• Sous-titres français et anglais
• Logo école et EDUCAFRIC visibles
• Données de contact validées

Études de Cas Documentées :

Structure Type :
• Situation initiale (défis, contexte)
• Solution EDUCAFRIC déployée
• Processus d'implémentation
• Résultats mesurables obtenus
• Témoignage authentique
• Visuels avant/après
• Coordonnées de référence

=== CHAPITRE 9 - MESURE DE PERFORMANCE ET ANALYTICS ===

DASHBOARD COMMERCIAL EDUCAFRIC

KPIs Primaires (Suivi Quotidien) :
• Leads générés par canal
• Taux de conversion prospect → démo
• Taux de conversion démo → vente
• Valeur moyenne des contrats
• Temps de cycle de vente moyen

KPIs Secondaires (Suivi Hebdomadaire) :
• Coût d'acquisition client (CAC)
• Lifetime Value (LTV) moyenne
• Ratio LTV/CAC par segment
• Taux de rétention annuel
• Net Promoter Score (NPS)

Outils de Mesure Intégrés :
• Google Analytics 4 configuré
• Facebook Pixel installé
• Tracking WhatsApp Business
• CRM avec pipeline détaillé
• Tableaux de bord automatisés

OPTIMISATION BASÉE SUR LES DONNÉES

Tests A/B Systématiques :

Landing Pages :
• Titres accrocheurs vs descriptifs
• Vidéos de démo vs images statiques
• Formulaires courts vs détaillés
• CTA urgents vs informatifs
• Témoignages vs statistiques

Campagnes Publicitaires :
• Audiences larges vs ciblées
• Visuels techniques vs émotionnels
• Messages bénéfices vs fonctionnalités
• Budgets journaliers vs accelerés
• Horaires de diffusion optimaux

Emails Marketing :
• Objets personnalisés vs génériques
• Contenu court vs détaillé
• Fréquence quotidienne vs hebdomadaire
• Design coloré vs sobre
• CTA multiples vs unique

REPORTING MENSUEL STANDARDISÉ

Structure de Rapport Commercial :

1. Résumé Executif
• Objectifs du mois vs réalisé
• 3 points positifs principaux
• 3 axes d'amélioration identifiés
• Budget consommé vs prévu
• Prévisions mois suivant

2. Performance par Canal
• Détail leads par source
• Coûts et conversions
• ROI calculé par canal
• Recommandations d'optimisation
• Réallocation budget proposée

3. Pipeline Commercial
• Évolution prospects par étape
• Affaires en cours de négociation
• Prévisions de closing
• Blocages identifiés
• Actions correctives planifiées

4. Satisfaction Client
• NPS du mois
• Témoignages reçus
• Problèmes remontés
• Résolutions apportées
• Plan d'amélioration

=== CHAPITRE 10 - ÉTUDES DE CAS SUCCÈS EDUCAFRIC ===

CAS #1 : ÉCOLE PRIVÉE BILINGUE YAOUNDÉ

Contexte Initial :
• 280 élèves, 18 enseignants
• Gestion 100% papier
• 15h/semaine administration bulletins
• 40% parents mécontents communication
• Concurrence forte quartier

Stratégie Marketing Déployée :
• Campagne Facebook ciblée parents Yaoundé
• Témoignages vidéo autres écoles
• Démonstration gratuite sur site
• Offre de lancement -30% première année
• Formation équipe incluse

Résultats Obtenus (après 6 mois) :
• Temps bulletins : 15h → 2h (-87%)
• Satisfaction parents : 60% → 94%
• Nouvelles inscriptions : +23%
• Temps communication : -60%
• ROI EDUCAFRIC : 340%

Témoignage Directrice :
"EDUCAFRIC a transformé notre école ! Les parents nous félicitent maintenant pour notre modernité. Nos bulletins sont prêts en 2 clics au lieu de 2 semaines. C'est magique !"

CAS #2 : RÉSEAU D'ÉCOLES PUBLIQUES BAFOUSSAM

Contexte Initial :
• 5 écoles, 1,200 élèves total
• Coordination difficile entre sites
• Rapports manuels au Ministère
• Communication parents inexistante
• Budget très contraint

Défis Marketing Spécifiques :
• Sensibilité prix extrême
• Validation hiérarchique longue
• Résistance au changement
• Formation équipe nécessaire
• Démonstration ROI obligatoire

Approche Personnalisée :
• Présentation officielle Délégation
• Tarif préférentiel secteur public
• Paiement échelonné 12 mois
• Formation extensive gratuite
• Support prioritaire garantie

Résultats Exceptionnels (après 1 an) :
• Efficacité administrative : +70%
• Satisfaction Délégation : 95%
• Communication parents instaurée
• Économies annuelles : 2.4M CFA
• Modèle répliqué 3 autres régions

Témoignage Délégué :
"Le projet EDUCAFRIC dépasse nos attentes ! Nous avons enfin des statistiques fiables et la communication avec les familles fonctionne. Un exemple pour tout le Cameroun."

CAS #3 : FREELANCER RÉPÉTITEUR DOUALA

Contexte Initial :
• 45 élèves cours particuliers
• Gestion cahiers et téléphone
• Facturation manuelle mensuelle
• Retards de paiement fréquents
• Croissance limitée par organisation

Stratégie Marketing Adaptée :
• Approche directe WhatsApp
• Démonstration mobile sur téléphone
• Tarif spécial freelancer
• Paiement mobile uniquement
• Formation vidéo simplifiée

Transformation Digitale Réussie :
• Organisation clients automatisée
• Facturation électronique instantanée
• Paiement mobile sécurisé
• Communication parents fluide
• Croissance possible sans limite

Impact Mesurable (après 3 mois) :
• Retards paiement : 40% → 5%
• Temps administratif : -75%
• Satisfaction parents : +85%
• Nouveaux clients : +60%
• Revenus mensuels : +45%

Témoignage Répétiteur :
"EDUCAFRIC m'a fait passer de répétiteur à entrepreneur éducatif ! Mes parents paient maintenant par mobile et reçoivent tout par WhatsApp. Je peux enfin me concentrer sur l'enseignement."

=== CONCLUSION ET PLAN D'ACTION ===

RÉCAPITULATIF DES STRATÉGIES CLÉS

1. Adaptation au Contexte Africain
• Privilégier mobile et SMS
• Messages multilingues
• Tarification accessible
• Paiement mobile intégré
• Support technique local

2. Canaux Prioritaires
• WhatsApp Business (95% portée)
• Facebook (engagement fort)
• SMS (conversion élevée)
• Email (nurturing long terme)
• LinkedIn (B2B qualifié)

3. Messages Différenciants
• Économies réelles mesurables
• Témoignages locaux authentiques
• Formation et support inclus
• Conformité réglementaire
• Innovation accessible

PLAN D'ACTION 90 JOURS

Mois 1 - Fondations
• Configuration outils analytics
• Création contenus de base
• Lancement campagnes test
• Formation équipe commerciale
• Première mesures performance

Mois 2 - Optimisation
• Analyse résultats premiers tests
• Ajustement messages et cibles
• Élargissement canaux performants
• Réduction canaux inefficaces
• Documentation meilleures pratiques

Mois 3 - Expansion
• Déploiement stratégies validées
• Augmentation budgets performants
• Développement nouveaux contenus
• Automatisation processus validés
• Planification stratégie long terme

BUDGET MARKETING RECOMMANDÉ

Répartition Mensuelle Type (École Privée) :
• Facebook Ads : 40% (150,000 CFA)
• SMS Marketing : 25% (95,000 CFA)
• WhatsApp Business : 15% (55,000 CFA)
• Email Marketing : 10% (35,000 CFA)
• LinkedIn Ads : 10% (35,000 CFA)
Total : 370,000 CFA/mois

ROI Attendu : 400-600% première année

RESSOURCES COMPLÉMENTAIRES

• Templates d'emails en français/anglais
• Scripts d'appels téléphoniques
• Visuels réseaux sociaux personnalisés
• Calculateurs ROI automatisés
• Guides de formation équipe commerciale

---
EDUCAFRIC Platform v4.2.3
Guide Marketing Digital Afrique - www.educafric.com
"Ensemble, révolutionnons l'éducation africaine"`
    },
    {
      id: 7,
      name: 'Guide Complet EDUCAFRIC - Pour Commerciaux',
      type: 'guide',
      category: 'guides',
      school: 'Document formation',
      date: '2025-02-01',
      status: 'finalized',
      size: '2.8 MB',
      format: 'PDF',
      description: 'Guide complet non-technique EDUCAFRIC avec informations generales sur la plateforme',
      content: `GUIDE COMPLET EDUCAFRIC
Plateforme Educative Numerique Africaine - Version 2025

PAGE 1 - PRESENTATION GENERALE

QU'EST-CE QU'EDUCAFRIC ?

EDUCAFRIC est la solution educative complete pensee pour l'Afrique. Notre plateforme transforme la gestion scolaire traditionnelle en experience numerique moderne, accessible et securisee.

POUR QUI ?
- Ecoles publiques et privees
- Parents d'eleves 
- Enseignants et repetiteurs
- Eleves de tous niveaux

FONCTIONNALITES PRINCIPALES

GESTION SCOLAIRE COMPLETE
- Inscription et profils eleves
- Emplois du temps interactifs
- Presence electronique quotidienne
- Notes et bulletins automatises
- Communication directe parents-enseignants

COMMUNICATION MODERNE
- Messages instantanes ecole-famille
- Notifications SMS internationales
- Alertes automatiques (absences, notes, evenements)
- Calendrier partage des activites
- Support francais et anglais

ACCES MOBILE OPTIMISE
- Applications iPhone et Android
- Consultation hors ligne
- Notifications temps reel
- Interface simple et intuitive
- Securite renforcee

SUIVI SECURISE
- Geolocalisation optionnelle des eleves
- Zones de securite personnalisables
- Alertes d'entree et sortie
- Suivi trajets domicile-ecole
- Notifications parents immediates

TARIFS ACCESSIBLES AFRIQUE

ECOLES PUBLIQUES
25.000 CFA par mois
- Jusqu'a 200 eleves inclus
- Toutes fonctionnalites de base
- Support technique inclus
- Formation equipe 8 heures

ECOLES PRIVEES  
75.000 CFA par mois
- Jusqu'a 500 eleves inclus
- Fonctionnalites avancees
- Geolocalisation complete
- Support prioritaire 24/7
- Formation etendue 40 heures

PARENTS
1.000 a 1.500 CFA par mois
- Suivi complet enfant
- Communications illimitees
- Acces mobile total
- Historique notes et absences

REPETITEURS/ENSEIGNANTS PRIVES
12.500 CFA par semestre
- Gestion jusqu'a 50 eleves
- Outils de suivi personnalise
- Communication parents directe
- Facturation automatisee

METHODES DE PAIEMENT

SOLUTIONS LOCALES AFRICAINES
- Orange Money (Cameroun, Cote d'Ivoire, Mali, Senegal)
- MTN Mobile Money (Cameroun, Ghana, Ouganda, Rwanda)
- Moov Money (Benin, Burkina Faso, Togo)
- Wave (Senegal, Cote d'Ivoire)

PAIEMENTS INTERNATIONAUX
- Cartes de credit Visa/Mastercard
- Virements bancaires internationaux
- PayPal pour clients diaspora
- Western Union pour transferts

COMMUNICATION INTERNATIONALE
- SMS vers plus de 190 pays
- Tarifs optimises Afrique
- Notifications multilingues
- Support WhatsApp Business

PAGE 2 - AVANTAGES ET MISE EN PLACE

POURQUOI CHOISIR EDUCAFRIC ?

ECONOMIES REELLES
- Reduction couts administratifs 70%
- Economie papier et impression 80%
- Gain temps gestion 60%
- ROI positif des 6 premiers mois

AVANTAGES TECHNOLOGIQUES
- Pas d'installation logiciel
- Acces internet simple
- Sauvegardes automatiques
- Mises a jour gratuites
- Securite maximale

SPECIFICITES AFRICAINES
- Adapte aux programmes camerounais
- Systeme SIL a Terminale
- Calendrier scolaire local
- Fetes et conges africains
- Support clientele francophone

FORMATION ET ACCOMPAGNEMENT

MISE EN PLACE RAPIDE
Semaine 1: Configuration plateforme
Semaine 2: Formation utilisateurs  
Semaine 3: Tests et ajustements
Semaine 4: Lancement officiel

FORMATION COMPLETE INCLUSE
- Formation directeurs/administrateurs
- Formation corps enseignant
- Formation personnel secretariat
- Formation utilisation parents
- Documentation complete francais

SUPPORT PERMANENT
- Assistance technique 24h/7j
- Hotline telephone francais
- Support email prioritaire
- Interventions a distance
- Maintenance preventive

RESULTATS CLIENTS

TEMOIGNAGES ECOLES
"Nos bulletins sont maintenant prets en 2 clics au lieu de 2 semaines"
- Lycee Bilingue de Yaounde

"Les parents sont enfin informes en temps reel"  
- College Prive Saint-Joseph Douala

"Fini les registres papier, tout est numerique et securise"
- Ecole Publique de Bafoussam

STATISTIQUES SATISFACTION
- 95% ecoles satisfaites premiere annee
- 87% renouvellement contrats
- 92% parents recommandent solution
- 78% reduction appels telephoniques

DEMONSTRATION ET CONTACT

ESSAI GRATUIT 30 JOURS
- Acces complet toutes fonctionnalites
- Donnees test realistiques
- Formation initiale gratuite
- Support complet inclus

ENVIRONMENT DE DEMONSTRATION
- Interface complete disponible
- Donnees ecoles africaines reelles
- Scenarios d'usage typiques
- Tests toutes fonctionnalites

CONTACTS SUPPORT

Support Technique
Email: support@educafric.com
Telephone: +237 XXX XXX XXX
Horaires: Lundi-Samedi 7h-20h

Formation Utilisateurs  
Email: formation@educafric.com
Telephone: +237 XXX XXX XXX
Disponible: Sur rendez-vous

NEXT STEPS - DEMARRER AVEC EDUCAFRIC

1. EVALUATION BESOINS
- Analyse situation actuelle ecole
- Definition objectifs numeriques
- Evaluation nombre utilisateurs
- Choix plan adapte

2. DEMONSTRATION PERSONNALISEE
- Presentation fonctionnalites cles
- Tests scenarios reel ecole
- Questions/reponses detaillees
- Devis personnalise gratuit

3. SIGNATURE ET LANCEMENT
- Contrat adaptation besoins
- Planning implementation 4 semaines
- Formation equipes incluse
- Go-live accompagne

EDUCAFRIC - REVOLUTIONNER L'EDUCATION EN AFRIQUE
www.educafric.com - Version Guide 2025`
    },
    {
      id: 8,
      name: 'CONTRAT PARTENARIAT ETABLISSEMENTS FREELANCERS 2025',
      type: 'contract',
      category: 'contracts',
      school: 'Document officiel',
      date: '2025-01-30',
      status: 'finalized',
      size: '4.5 MB',
      format: 'PDF',
      description: 'Contrat officiel EDUCAFRIC pour etablissements scolaires et freelancers educatifs',
      content: `EDUCAFRIC - CONTRAT DE PARTENARIAT ETABLISSEMENTS SCOLAIRES ET FREELANCERS 2025

Document Information
- Date de creation: 30 janvier 2025
- Version: 3.0 (Mise a jour Educafric)
- Validite: Du 1er janvier 2025 au 31 decembre 2025  
- Destinataires: Directeurs d'Ecole, Freelancers Educatifs, Equipe Juridique
- Objectif: Contrat officiel de partenariat Educafric pour etablissements et repetiteurs

PREAMBULE

Le present contrat definit les modalites de partenariat entre EDUCAFRIC (exploite par AFRO METAVERSE MARKETING SARL) et les etablissements scolaires ainsi que les freelancers educatifs (repetiteurs) pour l'utilisation de la plateforme numerique educative africaine.

Parties Contractantes:
- EDUCAFRIC : Plateforme educative technologique
- ETABLISSEMENTS SCOLAIRES : Ecoles publiques, privees, confessionnelles
- FREELANCERS EDUCATIFS : Repetiteurs independants, centres de formation

Mission Educafric:
Democratiser l'acces aux technologies educatives en Afrique et moderniser l'ecosysteme educatif par l'innovation numerique.

ARTICLE 1 - OBJET DU CONTRAT

1.1 Services Fournis par Educafric

Plateforme de Gestion Scolaire Complete
- Gestion des eleves: Inscription, profils, historique academique
- Gestion des enseignants: Profils, matieres, planning, absences
- Classes et niveaux: Organisation SIL a Terminale (systeme camerounais)
- Emploi du temps numerique: Creation et consultation interactive
- Presences electroniques: Appel numerique quotidien
- Notes et evaluations: Saisie, calcul moyennes automatique

Systeme de Bulletins Numeriques
- Bulletins digitaux professionnels: Templates officiels camerounais
- Calculs automatiques: Moyennes, rangs, appreciations
- Export PDF: Bulletins formates pour impression
- Distribution automatique: Envoi parents par email/SMS
- Historique complet: Conservation multi-annees securisee

Communication Ecole-Famille Integree
- Messages directs: Communication enseignants vers parents
- Notifications automatisees: Absences, notes, evenements
- Annonces ecole: Diffusion informations importantes
- Calendrier evenements: Reunions, examens, activites
- Support multilingue: Francais et anglais natif

Acces Mobile et Technologies Avancees
- Applications natives: iOS et Android optimisees
- Mode hors ligne: Consultation sans internet
- Notifications push: Alertes temps reel
- Geolocalisation: Suivi securise eleves (optionnel)
- WhatsApp Business: Communication automatisee

Rapports et Analytics
- Tableaux de bord: Vue d'ensemble performance
- Statistiques presences: Suivi assiduite detaille
- Analyses academiques: Performance par matiere/niveau
- Intelligence artificielle: Predictions et recommandations
- Rapports automatises: Syntheses mensuelles directeur

ARTICLE 2 - TARIFICATION ET ABONNEMENTS

2.1 Plans Etablissements Scolaires

Plan Ecole Publique
Prix: 25.000 CFA/mois (250.000 CFA/an)
Eleves inclus: Jusqu'a 200 eleves
Economie annuelle: 50.000 CFA (2 mois gratuits)

Fonctionnalites Incluses:
- Gestion complete eleves/enseignants
- Bulletins digitaux illimites
- Communication parents automatisee
- Emploi du temps interactif
- Presences electroniques
- Support technique dedie
- Notifications SMS (1000/mois)
- Formation equipe (8h incluses)

Tarification Progressive:
- 0-200 eleves: 25.000 CFA/mois
- 201-500 eleves: +100 CFA/eleve/mois
- 501-1000 eleves: +75 CFA/eleve/mois
- +1000 eleves: Tarif negocie

Plan Ecole Privee
Prix: 75.000 CFA/mois (750.000 CFA/an)
Eleves inclus: Jusqu'a 500 eleves
Economie annuelle: 150.000 CFA (2 mois gratuits)

Tout du Plan Public +:
- Geolocalisation securite eleves
- Systeme paiement integre
- Module comptabilite avance
- Branding ecole personnalise
- Application mobile ecole
- Analytics IA predictive
- Support prioritaire 24/7
- Formation equipe (40h incluses)

Plan Ecole Enterprise
Prix: 150.000 CFA/mois (1.500.000 CFA/an)
Eleves: Illimites
Solution complete sur mesure

Solution Premium:
- Toutes fonctionnalites incluses
- Multi-campus sans limite
- Personnalisation complete
- Integrations sur mesure
- Infrastructure dediee
- Equipe support dediee

2.2 Plans Freelancers/Repetiteurs

Plan Freelancer Standard
Prix: 12.500 CFA/semestre (25.000 CFA/an)
Eleves: Jusqu'a 50 eleves maximum

Fonctionnalites incluses:
- Gestion eleves personnelle
- Planning cours particuliers
- Suivi progression individuelle
- Communication parents directe
- Facturation automatisee
- Rapports de performance
- Support technique email

Plan Freelancer Pro
Prix: 20.000 CFA/semestre (40.000 CFA/an)
Eleves: Jusqu'a 150 eleves maximum

Tout du Standard +:
- Geolocalisation cours (optionnel)
- Multi-matieres illimitees
- Templates cours avances
- Analytics performance detaillees
- Branding personnel
- Support telephonique prioritaire

2.3 Modalites de Paiement

Methodes de Paiement Acceptees:
- Orange Money (Cameroun)
- MTN Mobile Money (Cameroun)
- Stripe (cartes internationales)
- Virement bancaire (grandes ecoles)
- Especes (agents locaux)

Conditions de Paiement:
- Paiement mensuel: Debite automatiquement le 1er du mois
- Paiement annuel: 15% de reduction appliquee
- Periode d'essai: 30 jours gratuits pour toutes les formules
- Resiliation: Preavis de 30 jours requis

ARTICLE 3 - OBLIGATIONS ET RESPONSABILITES

3.1 Obligations d'Educafric

Support Technique:
- Support technique 24/7 en francais
- Temps de reponse: < 4 heures ouvrables
- Formation initiale gratuite incluse
- Mises a jour automatiques gratuites
- Sauvegarde quotidienne des donnees
- Garantie uptime 99.5%

Securite et Confidentialite:
- Chiffrement SSL/TLS obligatoire
- Conformite GDPR et lois camerounaises
- Protection donnees personnelles eleves
- Acces securise par roles
- Audit securite annuel
- Plan de reprise d'activite

3.2 Obligations du Partenaire

Etablissements Scolaires:
- Designer 2 administrateurs maximum
- Former le personnel a l'utilisation
- Respecter les conditions d'utilisation
- Paiement des frais dans les delais
- Communication changements importants
- Participation aux mises a jour critiques

Freelancers:
- Utilisation ethique de la plateforme
- Respect de la propriete intellectuelle
- Non-revente des acces
- Mise a jour informations personnelles
- Respect des horaires de maintenance

ARTICLE 4 - FORMATION ET ACCOMPAGNEMENT

4.1 Formation Initiale

Pour les Etablissements:
- Formation directeur/administrateurs: 8 heures
- Formation enseignants: 16 heures
- Formation secretariat: 4 heures
- Support documentation complete
- Webinaires de perfectionnement mensuels

Pour les Freelancers:
- Session individuelle: 2 heures
- Documentation pas-a-pas
- Tutoriels video francais
- Groupe WhatsApp support

4.2 Support Continu

Canaux de Communication:
- Email: support@educafric.com
- WhatsApp: +237 XXX XXX XXX
- Telephone: +237 XXX XXX XXX
- Chat en ligne: www.educafric.com

Horaires de Support:
- Lundi-Vendredi: 7h00-19h00 (GMT+1)
- Samedi: 8h00-16h00 (GMT+1)
- Urgences 24/7: numero dedie

ARTICLE 5 - DONNEES ET PROPRIETE INTELLECTUELLE

5.1 Propriete des Donnees

Donnees Scolaires:
- Propriete exclusive de l'etablissement
- Droit d'exportation complete
- Suppression garantie a la resiliation
- Acces lecture seule pour maintenance

Donnees Educafric:
- Code source: propriete Educafric
- Base de donnees plateforme: propriete Educafric
- Algorithmes IA: propriete Educafric
- Templates: licence d'utilisation accordee

5.2 Confidentialite

Engagements Mutuels:
- Non-divulgation informations sensibles
- Protection donnees personnelles eleves/parents
- Acces restreint personnel autorise uniquement
- Signalement incidents securite obligatoire

ARTICLE 6 - DUREE ET RESILIATION

6.1 Duree du Contrat

Periode Contractuelle:
- Duree initiale: 12 mois renouvelables
- Renouvellement: Automatique sauf denonciation
- Preavis resiliation: 30 jours minimum
- Periode d'essai: 30 jours gratuits

6.2 Conditions de Resiliation

Resiliation par Educafric:
- Non-paiement: apres 30 jours de retard
- Violation conditions d'utilisation
- Utilisation frauduleuse
- Preavis: 15 jours minimum

Resiliation par le Partenaire:
- Preavis ecrit: 30 jours minimum
- Motif non requis
- Remboursement: au prorata temporis
- Export donnees: garanti 90 jours

ARTICLE 7 - RESPONSABILITES ET LIMITES

7.1 Limitation de Responsabilite

Exclusions:
- Dommages indirects ou consecutifs
- Perte de benefices
- Interruption d'activite
- Force majeure (pannes electriques, etc.)

Plafond de Responsabilite:
- Maximum: montant des frais annuels payes
- Assurance responsabilite civile professionnelle
- Couverture: 500.000.000 CFA

7.2 Garanties de Service

Engagements Qualite:
- Disponibilite plateforme: 99.5% minimum
- Temps de reponse support: < 4h ouvrables
- Resolution incidents: < 24h ouvrables
- Maintenance preventive: annoncee 48h avant

ARTICLE 8 - DISPOSITIONS FINALES

8.1 Droit Applicable

Juridiction:
- Droit camerounais applicable
- Tribunaux de Yaounde competents
- Langue du contrat: francais
- Arbitrage possible si accord mutuel

8.2 Modifications

Evolutions Contractuelles:
- Modifications par avenant ecrit uniquement
- Notification changements: 30 jours minimum
- Droit de resiliation si refus modifications majeures

8.3 Integralite

Clause de Totalite:
- Le present contrat annule tous accords anterieurs
- Conditions generales consultables sur www.educafric.com
- Versions francaise et anglaise: version francaise prevaut

CONTACTS ET SIGNATURES

EDUCAFRIC
AFRO METAVERSE MARKETING SARL
Adresse: Yaounde, Cameroun
Email: contact@educafric.com
Tel: +237 XXX XXX XXX

Directeur General: Simon ABANDA
Date: ________________
Signature: ________________

PARTENAIRE
Ecole/Freelancer: ________________
Directeur/Responsable: ________________
Date: ________________
Signature: ________________

---
Document genere par EDUCAFRIC Platform v4.2.3
www.educafric.com - Revolutionner l'education en Afrique`
    },
    {
      id: 9,
      name: 'Présentation Dashboards EDUCAFRIC 2025',
      type: 'brochure',
      category: 'brochures',
      school: 'Documentation client',
      date: '2025-02-01',
      status: 'finalized',
      size: '2.8 MB',
      format: 'PDF',
      description: 'Présentation complète de tous les tableaux de bord utilisateurs EDUCAFRIC',
      content: `PRÉSENTATION DASHBOARDS EDUCAFRIC 2025
Guide Complet des Interfaces Utilisateurs

=== ARCHITECTURE UTILISATEURS ===

EDUCAFRIC propose 5 profils principaux d'utilisateurs, chacun avec son dashboard personnalisé et ses modules spécifiques adaptés à ses besoins éducatifs.

=== 1. DASHBOARD ENSEIGNANT ===

MODULES DISPONIBLES:

✓ MES CLASSES
Fonction: Permet de gérer toutes les classes assignées à l'enseignant
Usage: Visualisation des élèves, effectifs, répartition par matière
Avantage: Suivi personnalisé de chaque classe

✓ SAISIE DES NOTES
Fonction: Interface pour enregistrer les évaluations et examens
Usage: Saisie rapide des notes par matière et par période
Avantage: Calculs automatiques des moyennes et statistiques

✓ EMPLOI DU TEMPS
Fonction: Consultation et gestion du planning personnel
Usage: Visualisation des créneaux d'enseignement, salles assignées
Avantage: Organisation optimale du temps de travail

✓ GESTION DEVOIRS
Fonction: Création et suivi des devoirs donnés aux élèves
Usage: Attribution de devoirs, fixation des échéances, corrections
Avantage: Suivi pédagogique complet des travaux élèves

✓ COMMUNICATION PARENTS
Fonction: Interface directe pour échanger avec les familles
Usage: Messages individuels, notifications de notes, alertes
Avantage: Renforcement du lien école-famille

✓ RAPPORTS DE CLASSE
Fonction: Génération de statistiques et analyses de performance
Usage: Rapports de notes, évolution des élèves, comparatifs
Avantage: Outils d'aide à la décision pédagogique

✓ RESSOURCES PÉDAGOGIQUES
Fonction: Bibliothèque de contenus éducatifs partagés
Usage: Accès aux supports de cours, exercices, évaluations
Avantage: Mutualisation des ressources entre enseignants

=== 2. DASHBOARD DIRECTEUR D'ÉCOLE ===

MODULES DISPONIBLES:

✓ GESTION ÉTABLISSEMENT
Fonction: Administration complète de l'établissement scolaire
Usage: Supervision générale, paramètres école, organisation pédagogique
Avantage: Contrôle centralisé de toutes les activités scolaires

✓ GESTION DU PERSONNEL
Fonction: Administration des enseignants et personnel administratif
Usage: Affectations, emplois du temps, évaluations de performance
Avantage: Optimisation des ressources humaines de l'établissement

✓ SUIVI ACADÉMIQUE GLOBAL
Fonction: Vue d'ensemble des résultats scolaires par classe et matière
Usage: Analyses statistiques, comparatifs de performance, tendances
Avantage: Pilotage stratégique de la qualité éducative

✓ GESTION FINANCIÈRE
Fonction: Administration budgétaire et suivi des paiements
Usage: Frais de scolarité, salaires, dépenses, rapports financiers
Avantage: Maîtrise complète de la santé financière de l'école

✓ COMMUNICATION INSTITUTIONNELLE
Fonction: Interface avec parents, autorités éducatives et partenaires
Usage: Messages officiels, rapports périodiques, communication de crise
Avantage: Représentation efficace de l'établissement

✓ TABLEAUX DE BORD DIRECTEUR
Fonction: Indicateurs clés de performance (KPI) en temps réel
Usage: Effectifs, taux de réussite, assiduité, satisfaction parents
Avantage: Prise de décision basée sur des données précises

✓ PLANIFICATION STRATÉGIQUE
Fonction: Outils de développement et projets d'établissement
Usage: Plans annuels, objectifs pédagogiques, projets d'amélioration
Avantage: Vision à long terme et développement durable de l'école

✓ GESTION DES INSCRIPTIONS
Fonction: Administration des admissions et réinscriptions
Usage: Processus d'inscription, validation dossiers, listes d'attente
Avantage: Optimisation du processus administratif d'admission

✓ SUPERVISION PÉDAGOGIQUE
Fonction: Suivi de la qualité de l'enseignement et des programmes
Usage: Évaluations enseignants, respect des programmes, innovations
Avantage: Garantie de l'excellence pédagogique de l'établissement

=== 3. DASHBOARD ÉLÈVE ===

MODULES DISPONIBLES:

✓ MES NOTES
Fonction: Consultation de toutes les évaluations personnelles
Usage: Visualisation des notes par matière, moyennes, évolution
Avantage: Suivi autonome de la progression scolaire

✓ EMPLOI DU TEMPS
Fonction: Planning personnel des cours et activités
Usage: Consultation des créneaux, salles, changements éventuels
Avantage: Organisation personnelle et anticipation

✓ DEVOIRS À RENDRE
Fonction: Liste des travaux à effectuer avec échéances
Usage: Suivi des devoirs assignés, statuts de rendu
Avantage: Gestion efficace des obligations scolaires

✓ BULLETINS NUMÉRIQUES
Fonction: Accès aux bulletins officiels dématérialisés
Usage: Consultation et téléchargement des bulletins trimestriels
Avantage: Accès immédiat aux résultats officiels

✓ COMMUNICATION
Fonction: Messages avec enseignants et administration
Usage: Reception d'informations, alertes, rappels importants
Avantage: Connexion directe avec l'équipe éducative

✓ RESSOURCES D'APPRENTISSAGE
Fonction: Accès aux supports de cours et exercices
Usage: Consultation de documents pédagogiques partagés
Avantage: Révisions et approfondissements autonomes

✓ CALENDRIER SCOLAIRE
Fonction: Vue d'ensemble des événements et dates importantes
Usage: Consultation des examens, vacances, événements école
Avantage: Planification et anticipation des périodes clés

=== 4. DASHBOARD PARENT ===

MODULES DISPONIBLES:

✓ SUIVI ENFANTS
Fonction: Tableau de bord centralisé pour tous les enfants scolarisés
Usage: Vue d'ensemble des résultats, comportement, assiduité
Avantage: Monitoring complet de la scolarité familiale

✓ CONSULTATION NOTES
Fonction: Accès en temps réel aux évaluations des enfants
Usage: Visualisation détaillée des notes par matière et période
Avantage: Réactivité immédiate sur les résultats scolaires

✓ COMMUNICATION ÉCOLE
Fonction: Canal direct avec enseignants et administration
Usage: Échanges sur la progression, comportement, besoins spéciaux
Avantage: Partenariat éducatif renforcé

✓ PAIEMENTS EN LIGNE
Fonction: Gestion dématérialisée des frais de scolarité
Usage: Paiements sécurisés MTN/Orange Money, suivi des échéances
Avantage: Simplicité et traçabilité des transactions

✓ GÉOLOCALISATION ENFANTS
Fonction: Suivi de position en temps réel des enfants (optionnel)
Usage: Monitoring sécurisé des trajets domicile-école
Avantage: Sérénité et sécurité familiale

✓ NOTIFICATIONS IMPORTANTES
Fonction: Réception d'alertes personnalisées par SMS/WhatsApp
Usage: Alertes absence, retard, urgences, événements
Avantage: Réactivité immédiate aux situations importantes

✓ CALENDRIER FAMILIAL
Fonction: Planning intégré des événements scolaires familiaux
Usage: Réunions parents, conseils de classe, événements
Avantage: Organisation familiale optimisée

=== 5. DASHBOARD FREELANCER ===

MODULES DISPONIBLES:

✓ PROJETS ÉDUCATIFS
Fonction: Gestion de portefeuille de missions dans les écoles
Usage: Suivi des contrats, échéances, livrables pédagogiques
Avantage: Organisation professionnelle des interventions

✓ CRÉATION DE CONTENU
Fonction: Outils de développement de ressources éducatives
Usage: Conception de cours, exercices, supports multimédia
Avantage: Professionnalisation de l'offre pédagogique

✓ COLLABORATION ÉCOLES
Fonction: Interface de partenariat avec les établissements
Usage: Négociation de missions, planning d'interventions
Avantage: Extension du réseau professionnel éducatif

✓ FACTURATION SERVICES
Fonction: Gestion commerciale et comptable des prestations
Usage: Émission de factures, suivi des paiements
Avantage: Simplicité administrative et financière

✓ PORTFOLIO PROFESSIONNEL
Fonction: Vitrine des compétences et réalisations
Usage: Présentation d'expertise, témoignages, références
Avantage: Développement de la réputation professionnelle

✓ FORMATION CONTINUE
Fonction: Accès aux ressources de développement professionnel
Usage: Webinaires, formations, mise à jour pédagogique
Avantage: Maintien de l'excellence et de la compétitivité

✓ RÉSEAU ÉDUCATIF
Fonction: Communauté de freelancers et échanges professionnels
Usage: Partage d'expériences, collaborations, recommandations
Avantage: Enrichissement mutuel et opportunités business

=== AVANTAGES TRANSVERSAUX ===

TOUS LES DASHBOARDS BÉNÉFICIENT DE:
• Interface bilingue français/anglais
• Optimisation mobile complète
• Notifications temps réel
• Sécurisation des données
• Synchronisation automatique
• Support technique 24/7
• Formation utilisateur incluse
• Mises à jour gratuites

=== TECHNOLOGIE MODERNE ===

• Applications natives iOS/Android
• Interface web responsive
• Mode hors ligne disponible
• Chiffrement bout-en-bout
• Sauvegarde automatique cloud
• Performance optimisée Afrique

EDUCAFRIC 2025 - Révolutionnons l'éducation africaine ensemble`
    }
  ];

  const categories = [
    { key: 'all', label: t.all, count: (Array.isArray(documents) ? documents.length : 0) },
    { key: 'contracts', label: t.contracts, count: (Array.isArray(documents) ? documents : []).filter(d => d.category === 'contracts').length },
    { key: 'brochures', label: t.brochures, count: (Array.isArray(documents) ? documents : []).filter(d => d.category === 'brochures').length },
    { key: 'templates', label: t.templates, count: (Array.isArray(documents) ? documents : []).filter(d => d.category === 'templates').length },
    { key: 'legal', label: t.legal, count: (Array.isArray(documents) ? documents : []).filter(d => d.category === 'legal').length },
    { key: 'marketing', label: t.marketing, count: (Array.isArray(documents) ? documents : []).filter(d => d.category === 'marketing').length }
  ];

  const filteredDocuments = (Array.isArray(documents) ? documents : []).filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDocument = async (doc: any) => {
    try {
      // For mobile devices, generate and open PDF directly
      const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Generate PDF and open in new tab for mobile
        const { jsPDF } = await import('jspdf');
        const pdf = new jsPDF();
        
        // Header with EDUCAFRIC branding
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(59, 130, 246); // Blue color
        pdf.text('EDUCAFRIC', 20, 25);
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0); // Black
        pdf.text(doc.name || '', 20, 40);
        
        // Document metadata
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Type: ${doc.type} | École: ${doc.school}`, 20, 55);
        pdf.text(`Statut: ${doc.status} | Date: ${doc.date} | Taille: ${doc.size}`, 20, 62);
        
        // Description
        if (doc.description) {
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Description:', 20, 75);
          pdf.setFont('helvetica', 'normal');
          const descLines = pdf.splitTextToSize(doc.description, 170);
          pdf.text(descLines, 20, 82);
        }
        
        // Main content with proper formatting
        if (doc.content) {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(59, 130, 246); // Blue color for header
          pdf.text('Contenu du document:', 20, 100);
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(0, 0, 0); // Black for content
          
          // Split content into lines and handle page breaks
          const contentLines = pdf.splitTextToSize(doc.content, 170);
          let yPosition = 110;
          
          contentLines.forEach((line: string) => {
            if (yPosition > 270) { // Near bottom of page
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(line, 20, yPosition);
            yPosition += 5;
          });
        }
        
        // Footer on each page
        const pageCount = pdf.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setTextColor(128, 128, 128); // Gray
          pdf.text(`Page ${i}/${pageCount} - EDUCAFRIC Platform v4.2.3`, 105, 285, { align: 'center' });
          pdf.text('www.educafric.com - Plateforme éducative pour l\'Afrique', 105, 292, { align: 'center' });
        }
        
        // Create blob and open in new window/tab
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Open PDF in new window/tab
        const newWindow = window.open(pdfUrl, '_blank');
        if (newWindow) {
          newWindow.document.title = doc.name || 'Document EDUCAFRIC';
          
          // Clean up URL after some time
          setTimeout(() => {
            URL.revokeObjectURL(pdfUrl);
          }, 120000); // 2 minutes
        } else {
          // Fallback: download the PDF if popup is blocked
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = pdfUrl;
          a.download = `${doc.name || 'document'}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(pdfUrl);
        }
        
        toast({
          title: language === 'fr' ? 'Document ouvert' : 'Document opened',
          description: language === 'fr' ? `${doc.name || ''} ouvert dans un nouvel onglet` : `${doc.name || ''} opened in new tab`,
        });
        
      } else {
        // Desktop: Use dialog view
        setSelectedDocument(doc);
        setIsViewDialogOpen(true);
      }
      
    } catch (error) {
      console.error('Error opening document:', error);
      // Fallback to dialog view
      setSelectedDocument(doc);
      setIsViewDialogOpen(true);
      
      toast({
        title: language === 'fr' ? 'Ouverture alternative' : 'Alternative view',
        description: language === 'fr' ? 'Document affiché dans une fenêtre modale' : 'Document displayed in modal window',
      });
    }
  };

  const handleDownloadDocument = async (doc: any) => {
    try {
      if (doc.format === 'PDF') {
        // Create PDF content
        const { jsPDF } = await import('jspdf');
        const pdf = new jsPDF();
        
        pdf.setFontSize(18);
        pdf.text(doc.name || '', 20, 30);
        
        pdf.setFontSize(12);
        pdf.text(`${t.type}: ${doc.type} | ${t.school}: ${doc.school}`, 20, 50);
        pdf.text(`${t.status}: ${doc.status} | ${t.date}: ${doc.date}`, 20, 60);
        pdf.text(`${t.size}: ${doc.size}`, 20, 70);
        
        pdf.setFontSize(11);
        pdf.text(`Description: ${doc.description || ''}`, 20, 85);
        
        // Content with line wrapping
        if (doc.content) {
          const lines = pdf.splitTextToSize(doc.content, 170);
          pdf.text(lines, 20, 100);
        }
        
        // Footer on each page
        const pageCount = pdf.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.text(`Page ${i}/${pageCount} - Généré par EDUCAFRIC Platform v4.2.3`, 105, 285, { align: 'center' });
        }
        
        // Download
        pdf.save(`${doc.name || 'document'}.pdf`);
      } else {
        // Simple download for other formats
        const content = `EDUCAFRIC - Document Commercial\n\nTitre: ${doc.name || ''}\nType: ${doc.type}\nÉcole: ${doc.school}\nStatut: ${doc.status}\nDate: ${doc.date}\n\nDescription:\n${doc.description}\n\nContenu:\n${doc.content || 'Contenu non disponible'}\n\n---\nGénéré par EDUCAFRIC Platform`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${doc.name || 'document'}.${doc.format?.toLowerCase() || 'txt'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      toast({
        title: language === 'fr' ? 'Document téléchargé' : 'Document downloaded',
        description: language === 'fr' ? `${doc.name || ''} téléchargé avec succès en ${doc.format}` : `${doc.name || ''} downloaded successfully as ${doc.format}`,
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr' ? 'Erreur lors du téléchargement' : 'Error during download',
      });
    }
  };

  const handleShareDocument = async (doc: any) => {
    try {
      const shareUrl = `${window?.location?.origin}/commercial/documents/shared/${doc.id}`;
      const shareText = language === 'fr' 
        ? `Document commercial: ${doc.name || ''} - ${doc.description || ''}`
        : `Commercial document: ${doc.name || ''} - ${doc.description || ''}`;
      
      if (navigator.share) {
        await navigator.share({
          title: doc.name || '',
          text: shareText,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        toast({
          title: language === 'fr' ? 'Lien copié' : 'Link copied',
          description: language === 'fr' ? 'Lien de partage copié dans le presse-papiers' : 'Share link copied to clipboard',
        });
      }
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr' ? 'Erreur lors du partage' : 'Error during sharing',
      });
    }
  };

  const handleDeleteDocument = async (doc: any) => {
    try {
      const response = await fetch(`/api/commercial/documents/${doc.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: language === 'fr' ? 'Document supprimé' : 'Document deleted',
          description: language === 'fr' ? `${doc.name || ''} supprimé avec succès` : `${doc.name || ''} deleted successfully`,
        });
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr' ? 'Erreur lors de la suppression' : 'Error during deletion',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      signed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
      expired: 'bg-red-100 text-red-800 border-red-200',
      finalized: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    return statusColors[status as keyof typeof statusColors] || statusColors.draft;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText className="w-4 h-4" />;
      case 'brochure': return <FileText className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      case 'legal': return <Building2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-documents"
                />
              </div>
            </div>
            <Button className="flex items-center gap-2" data-testid="button-add-document">
              <Plus className="w-4 h-4" />
              {t.addDocument}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
                className="flex items-center gap-2"
                data-testid={`button-filter-${category.key}`}
              >
                <Filter className="w-3 h-3" />
                {category.label} ({category.count})
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(doc.type)}
                      <h3 className="font-medium text-lg">{doc.name}</h3>
                      <Badge className={`${getStatusBadge(doc.status)} text-xs`}>
                        {t[doc.status as keyof typeof t] || doc.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{t.type}:</span>
                        <span>{t[doc.type as keyof typeof t] || doc.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>{doc.school}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{doc.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{t.size}:</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="text-sm text-gray-600 mt-2">{doc.description}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-col lg:flex-row">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 flex-1 sm:flex-none min-w-[100px]"
                      onClick={() => handleViewDocument(doc)}
                      data-testid={`button-view-${doc.id}`}
                    >
                      <Eye className="w-3 h-3" />
                      {t.view}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 flex-1 sm:flex-none min-w-[100px]"
                      onClick={() => handleDownloadDocument(doc)}
                      data-testid={`button-download-${doc.id}`}
                    >
                      <Download className="w-3 h-3" />
                      {t.download}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 flex-1 sm:flex-none min-w-[100px]"
                      onClick={() => handleShareDocument(doc)}
                      data-testid={`button-share-${doc.id}`}
                    >
                      <Share className="w-3 h-3" />
                      {t.share}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 flex-1 sm:flex-none min-w-[100px] text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteDocument(doc)}
                      data-testid={`button-delete-${doc.id}`}
                    >
                      <Trash2 className="w-3 h-3" />
                      {language === 'fr' ? 'Supprimer' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'fr' ? 'Aucun document trouvé' : 'No documents found'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' 
                  ? 'Essayez de modifier vos critères de recherche ou ajoutez un nouveau document.'
                  : 'Try adjusting your search criteria or add a new document.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0 pb-4 border-b">
            <DialogTitle className="flex items-center gap-2 text-xl">
              {selectedDocument && getTypeIcon(selectedDocument.type)}
              {selectedDocument?.name}
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {selectedDocument?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="flex-1 overflow-hidden flex flex-col space-y-4 py-4">
              {/* Document metadata */}
              <div className="flex-shrink-0 grid grid-cols-3 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                <div><strong>{t.type}:</strong> {t[selectedDocument.type as keyof typeof t] || selectedDocument.type}</div>
                <div><strong>{t.school}:</strong> {selectedDocument.school}</div>
                <div><strong>{t.date}:</strong> {selectedDocument.date}</div>
                <div><strong>{t.size}:</strong> {selectedDocument.size}</div>
                <div><strong>Format:</strong> {selectedDocument.format}</div>
                <div><strong>{t.status}:</strong> 
                  <Badge className={`ml-2 ${getStatusBadge(selectedDocument.status)} text-xs`}>
                    {t[selectedDocument.status as keyof typeof t] || selectedDocument.status}
                  </Badge>
                </div>
              </div>
              
              {/* Document content - main scrollable area */}
              {selectedDocument.content && (
                <div className="flex-1 border-2 border-blue-200 rounded-lg bg-blue-50 overflow-hidden flex flex-col">
                  <div className="flex-shrink-0 bg-blue-100 px-6 py-3 border-b border-blue-200">
                    <h4 className="font-semibold text-lg text-blue-800">
                      {language === 'fr' ? 'Contenu du Document:' : 'Document Content:'}
                    </h4>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-800 min-h-0">
                      {selectedDocument.content}
                    </div>
                  </div>
                </div>
              )}
              
              {!selectedDocument.content && (
                <div className="flex-1 border-2 border-orange-200 rounded-lg p-6 bg-orange-50 flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="font-medium text-orange-800 mb-2">
                      {language === 'fr' ? 'Contenu non disponible' : 'Content not available'}
                    </h4>
                    <p className="text-orange-600">
                      {language === 'fr' ? 'Ce document ne contient pas de contenu prévisualisable.' : 'This document does not contain previewable content.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex-shrink-0 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              {language === 'fr' ? 'Fermer' : 'Close'}
            </Button>
            {selectedDocument && (
              <Button onClick={() => handleDownloadDocument(selectedDocument)}>
                <Download className="w-4 h-4 mr-2" />
                {t.download}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsContracts;