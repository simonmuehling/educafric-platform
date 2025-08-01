import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const GradeManagement: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {language === 'fr' ? 'Gestion des Notes' : 'Grade Management'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">
          {language === 'fr' ? 'Saisissez et gérez les notes de vos élèves.' : 'Enter and manage your students grades.'}
        </p>
      </div>
    </div>
  );
};

export default GradeManagement;