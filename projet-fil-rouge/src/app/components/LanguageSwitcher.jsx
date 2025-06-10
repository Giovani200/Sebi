'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  
  const handleChangeLanguage = () => {
    // Basculer entre français et anglais
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };
  
  return (
    <button
      onClick={handleChangeLanguage}

      className="fixed top-45 right-6 z-10 bg-white/80 hover:bg-black/90 backdrop-blur-sm p-2 rounded-full pt-30 shadow-md hover:shadow-lg transition-all"

      className="fixed top-45 right-6 z-10 bg-white/80 hover:bg-black/90 backdrop-blur-sm p-2 rounded-full pt-20 shadow-md hover:shadow-lg transition-all"

      aria-label={t('switchLanguage')}
      title={t('switchLanguage')}
    >
      <div className="flex items-center justify-center w-8 h-8 relative">
        {i18n.language === 'fr' ? (
          <>
            <span className="text-xl">🇬🇧</span>
            <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs font-bold px-1 rounded-full">EN</span>
          </>
        ) : (
          <>
            <span className="text-xl">🇫🇷</span>
            <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs font-bold px-1 rounded-full">FR</span>
          </>
        )}
      </div>
    </button>
  );
}
