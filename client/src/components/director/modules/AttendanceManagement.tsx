import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calendar, UserCheck, Users, Download, FileText, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import MobileActionsOverlay from '@/components/mobile/MobileActionsOverlay';

const AttendanceManagement: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for demonstration
  const attendanceStats = {
    present: 245,
    absent: 18,
    late: 7,
    total: 270
  };

  const classAttendance = [
    { class: 'CE1 A', present: 28, absent: 2, late: 1, total: 31 },
    { class: 'CE2 B', present: 25, absent: 3, late: 2, total: 30 },
    { class: '3ème A', present: 32, absent: 1, late: 0, total: 33 },
    { class: 'Terminale C', present: 29, absent: 2, late: 1, total: 32 }
  ];

  const handleExportReport = () => {
    toast({
      title: language === 'fr' ? 'Rapport exporté' : 'Report exported',
      description: language === 'fr' ? 'Le rapport de présence a été téléchargé avec succès.' : 'Attendance report has been downloaded successfully.'
    });
  };

  const handleSendReminder = () => {
    toast({
      title: language === 'fr' ? 'Rappel envoyé' : 'Reminder sent',
      description: language === 'fr' ? 'Rappels SMS envoyés aux parents des élèves absents.' : 'SMS reminders sent to parents of absent students.'
    });
  };

  const handleMarkAttendance = () => {
    toast({
      title: language === 'fr' ? 'Présence enregistrée' : 'Attendance recorded',
      description: language === 'fr' ? 'Les présences ont été mises à jour avec succès.' : 'Attendance has been updated successfully.'
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: language === 'fr' ? 'Rapport généré' : 'Report generated',
      description: language === 'fr' ? 'Rapport de présence mensuel généré avec succès.' : 'Monthly attendance report generated successfully.'
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'fr' ? 'Gestion des Présences' : 'Attendance Management'}
        </h1>
        <Badge variant="outline" className="text-sm">
          {new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
        </Badge>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'fr' ? 'Présents' : 'Present'}</p>
                <p className="text-2xl font-bold text-green-600">{attendanceStats.present}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'fr' ? 'Absents' : 'Absent'}</p>
                <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'fr' ? 'En retard' : 'Late'}</p>
                <p className="text-2xl font-bold text-orange-600">{attendanceStats.late}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'fr' ? 'Total' : 'Total'}</p>
                <p className="text-2xl font-bold text-blue-600">{attendanceStats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            {language === 'fr' ? 'Actions Rapides' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileActionsOverlay
            title={language === 'fr' ? 'Actions de Présence' : 'Attendance Actions'}
            maxVisibleButtons={3}
            actions={[
              {
                id: 'mark-attendance',
                label: language === 'fr' ? 'Marquer Présence' : 'Mark Attendance',
                icon: <UserCheck className="w-5 h-5" />,
                onClick: handleMarkAttendance,
                color: 'bg-blue-600 hover:bg-blue-700'
              },
              {
                id: 'export-report',
                label: language === 'fr' ? 'Exporter Rapport' : 'Export Report',
                icon: <Download className="w-5 h-5" />,
                onClick: handleExportReport,
                color: 'bg-green-600 hover:bg-green-700'
              },
              {
                id: 'send-reminder',
                label: language === 'fr' ? 'Rappel Parents' : 'Parent Reminder',
                icon: <AlertTriangle className="w-5 h-5" />,
                onClick: handleSendReminder,
                color: 'bg-orange-600 hover:bg-orange-700'
              },
              {
                id: 'generate-report',
                label: language === 'fr' ? 'Rapport Mensuel' : 'Monthly Report',
                icon: <FileText className="w-5 h-5" />,
                onClick: handleGenerateReport,
                color: 'bg-purple-600 hover:bg-purple-700'
              }
            ]}
          />
        </CardContent>
      </Card>

      {/* Class Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'fr' ? 'Présence par Classe' : 'Attendance by Class'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e?.target?.value)}
                className="md:w-auto"
              />
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="md:w-auto">
                  <SelectValue placeholder={language === 'fr' ? 'Sélectionner une classe' : 'Select a class'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'fr' ? 'Toutes les classes' : 'All classes'}</SelectItem>
                  <SelectItem value="ce1a">CE1 A</SelectItem>
                  <SelectItem value="ce2b">CE2 B</SelectItem>
                  <SelectItem value="3eme">3ème A</SelectItem>
                  <SelectItem value="terminale">Terminale C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">{language === 'fr' ? 'Classe' : 'Class'}</th>
                    <th className="text-left p-3">{language === 'fr' ? 'Présents' : 'Present'}</th>
                    <th className="text-left p-3">{language === 'fr' ? 'Absents' : 'Absent'}</th>
                    <th className="text-left p-3">{language === 'fr' ? 'En retard' : 'Late'}</th>
                    <th className="text-left p-3">{language === 'fr' ? 'Total' : 'Total'}</th>
                    <th className="text-left p-3">{language === 'fr' ? 'Taux' : 'Rate'}</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(classAttendance) ? classAttendance : []).map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{item.class}</td>
                      <td className="p-3 text-green-600">{item.present}</td>
                      <td className="p-3 text-red-600">{item.absent}</td>
                      <td className="p-3 text-orange-600">{item.late}</td>
                      <td className="p-3">{item.total}</td>
                      <td className="p-3">
                        <Badge variant={item.present / item.total > 0.9 ? 'default' : 'secondary'}>
                          {Math.round((item.present / item.total) * 100)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;