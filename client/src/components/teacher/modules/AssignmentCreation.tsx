import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const AssignmentCreation: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {language === 'fr' ? 'Création de Devoirs' : 'Assignment Creation'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">
          {language === 'fr' ? 'Créez et assignez des devoirs à vos élèves.' : 'Create and assign homework to your students.'}
        </p>
      </div>
    </div>
  );
};

export default AssignmentCreation;