import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const StudentGeolocation: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {language === 'fr' ? 'Ma Géolocalisation' : 'My Geolocation'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">
          {language === 'fr' ? 'Statut de votre géolocalisation (contrôlé par les parents).' : 'Your geolocation status (controlled by parents).'}
        </p>
      </div>
    </div>
  );
};

export default StudentGeolocation;