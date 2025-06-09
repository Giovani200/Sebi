'use client';
import { useEffect, useState } from 'react';
import i18next from 'i18next';

export default function LanguageProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialise la langue lors du chargement côté client uniquement
    const savedLang = localStorage.getItem('language') || 'fr';
    if (i18next.language !== savedLang) {
      i18next.changeLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  // Astuce importante : n'affichez le contenu qu'une fois le composant monté côté client
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-orange-500 rounded-full border-t-transparent"></div>
    </div>;
  }

  return children;
}