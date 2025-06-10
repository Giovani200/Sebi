'use client';

import { useTranslation } from 'react-i18next';

export default function TranslatedComponent() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-orange-600 mb-2">
        {t('heroGreeting')}
      </h3>
      <p className="text-gray-700">
        {t('heroIntro')}
      </p>
    </div>
  );
}