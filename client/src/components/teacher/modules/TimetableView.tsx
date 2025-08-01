import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TimetableView: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {language === 'fr' ? 'Emploi du Temps' : 'Timetable'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">
          {language === 'fr' ? 'Consultez votre emploi du temps.' : 'View your timetable.'}
        </p>
      </div>
    </div>
  );
};

export default TimetableView;