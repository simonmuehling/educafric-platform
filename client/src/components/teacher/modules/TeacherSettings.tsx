import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TeacherSettings: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {language === 'fr' ? 'Paramètres Enseignant' : 'Teacher Settings'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">
          {language === 'fr' ? 'Configuration des paramètres de votre compte enseignant.' : 'Configure your teacher account settings.'}
        </p>
      </div>
    </div>
  );
};

export default TeacherSettings;