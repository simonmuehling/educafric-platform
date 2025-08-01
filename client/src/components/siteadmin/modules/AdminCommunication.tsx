import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, Send, Users, Building2, GraduationCap, UserCog, Briefcase, FileText } from 'lucide-react';
import { ModernCard } from '@/components/ui/ModernCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function AdminCommunication() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('compose');
  const [messageType, setMessageType] = useState('commercial');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');

  const { data: conversations, isLoading: loadingConversations } = useQuery({
    queryKey: ['/api/admin/communications/conversations'],
    queryFn: () => fetch('/api/admin/communications/conversations', { credentials: 'include' }).then(res => res.json())
  });

  const { data: messageStats } = useQuery({
    queryKey: ['/api/admin/communications/stats'],
    queryFn: () => fetch('/api/admin/communications/stats', { credentials: 'include' }).then(res => res.json())
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: any) => {
      return apiRequest('POST', '/api/admin/communications/send', messageData);
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès",
      });
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['/api/admin/communications'] });
    },
    onError: () => {
      toast({
        title: "Erreur d'envoi",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    }
  });

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Message vide",
        description: "Veuillez saisir un message avant d'envoyer",
        variant: "destructive",
      });
      return;
    }

    sendMessageMutation.mutate({
      type: messageType,
      message: message.trim(),
      priority,
      timestamp: new Date().toISOString()
    });
  };

  const messageTypes = [
    { value: 'commercial', label: 'Équipe Commerciale', icon: <Briefcase className="w-4 h-4" />, color: 'blue' },
    { value: 'directors', label: 'Directeurs d\'École', icon: <Building2 className="w-4 h-4" />, color: 'green' },
    { value: 'teachers', label: 'Enseignants', icon: <GraduationCap className="w-4 h-4" />, color: 'purple' },
    { value: 'parents', label: 'Parents', icon: <Users className="w-4 h-4" />, color: 'orange' },
    { value: 'students', label: 'Étudiants', icon: <UserCog className="w-4 h-4" />, color: 'pink' },
    { value: 'freelancers', label: 'Répétiteurs', icon: <FileText className="w-4 h-4" />, color: 'indigo' }
  ];

  const tabs = [
    { id: 'compose', label: 'Composer', icon: <Send className="w-4 h-4" /> },
    { id: 'conversations', label: 'Conversations', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'stats', label: 'Statistiques', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Administration Système Communication</h2>
        <p className="text-gray-600">Envoyez des messages aux équipes et utilisateurs de la plateforme EDUCAFRIC</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {(Array.isArray(tabs) ? tabs : []).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ModernCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Nouveau Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destinataires
                  </label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez les destinataires" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Array.isArray(messageTypes) ? messageTypes : []).map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            {type.icon}
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité
                  </label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">🟢 Faible</SelectItem>
                      <SelectItem value="normal">🟡 Normal</SelectItem>
                      <SelectItem value="high">🟠 Élevée</SelectItem>
                      <SelectItem value="urgent">🔴 Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e?.target?.value)}
                    placeholder="Rédigez votre message ici..."
                    rows={8}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {(Array.isArray(message) ? message.length : 0)}/500 caractères
                  </p>
                </div>

                <Button
                  onClick={handleSendMessage}
                  disabled={sendMessageMutation.isPending || !message.trim()}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sendMessageMutation.isPending ? 'Envoi en cours...' : 'Envoyer le Message'}
                </Button>
              </div>
            </ModernCard>
          </div>

          <div>
            <ModernCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Aperçu</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <Badge className={`bg-${messageTypes.find(t => t.value === messageType)?.color}-100 text-${messageTypes.find(t => t.value === messageType)?.color}-800`}>
                    {messageTypes.find(t => t.value === messageType)?.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Priorité:</span>
                  <span className="font-medium">
                    {priority === 'low' && '🟢 Faible'}
                    {priority === 'normal' && '🟡 Normal'}
                    {priority === 'high' && '🟠 Élevée'}
                    {priority === 'urgent' && '🔴 Urgente'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Longueur:</span>
                  <span className="font-medium">{(Array.isArray(message) ? message.length : 0)} caractères</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard className="p-6 mt-4">
              <h3 className="text-lg font-semibold mb-4">Messages Rapides</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setMessage("Chers utilisateurs,\n\nNous vous informons d'une maintenance programmée ce soir de 22h à 23h. La plateforme sera temporairement indisponible.\n\nMerci de votre compréhension.\n\nÉquipe EDUCAFRIC")}
                >
                  Maintenance programmée
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setMessage("Excellentes nouvelles !\n\nNous venons de déployer de nouvelles fonctionnalités sur EDUCAFRIC. Connectez-vous pour découvrir les améliorations.\n\nÉquipe EDUCAFRIC")}
                >
                  Nouvelles fonctionnalités
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setMessage("Rapport mensuel disponible.\n\nConsultez vos statistiques et analyses dans votre tableau de bord.\n\nÉquipe EDUCAFRIC")}
                >
                  Rapport mensuel
                </Button>
              </div>
            </ModernCard>
          </div>
        </div>
      )}

      {/* Conversations Tab */}
      {activeTab === 'conversations' && (
        <ModernCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversations Récentes</h3>
          
          {loadingConversations ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 h-16 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  recipient: 'Équipe Commerciale',
                  lastMessage: 'Nouvelles fonctionnalités déployées avec succès',
                  timestamp: '2025-01-26 14:30',
                  status: 'delivered',
                  priority: 'normal'
                },
                {
                  id: 2,
                  recipient: 'Directeurs d\'École',
                  lastMessage: 'Maintenance programmée ce soir',
                  timestamp: '2025-01-26 13:15',
                  status: 'read',
                  priority: 'high'
                },
                {
                  id: 3,
                  recipient: 'Enseignants',
                  lastMessage: 'Rapport mensuel disponible',
                  timestamp: '2025-01-26 12:00',
                  status: 'sent',
                  priority: 'low'
                }
              ].map((conversation) => (
                <div key={conversation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">{conversation.recipient}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{conversation.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                    <Badge 
                      variant={conversation.status === 'read' ? 'default' : conversation.status === 'delivered' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {conversation.status === 'read' ? 'Lu' : conversation.status === 'delivered' ? 'Livré' : 'Envoyé'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ModernCard>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModernCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Messages Envoyés</h3>
                <p className="text-2xl font-bold text-blue-600">147</p>
              </div>
              <Send className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Ce mois</p>
          </ModernCard>

          <ModernCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Taux de Lecture</h3>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Derniers 30 jours</p>
          </ModernCard>

          <ModernCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Messages Urgents</h3>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <MessageSquare className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Cette semaine</p>
          </ModernCard>

          <ModernCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Réponses Reçues</h3>
                <p className="text-2xl font-bold text-purple-600">28</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Ce mois</p>
          </ModernCard>
        </div>
      )}
    </div>
  );
}