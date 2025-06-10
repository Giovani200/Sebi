'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../i18n/client';

export default function LegalPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // N'afficher le contenu qu'une fois le composant monté côté client
  // pour éviter les problèmes d'hydratation
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="animate-spin h-10 w-10 border-4 border-orange-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 pt-36 md:px-8 bg-gradient-to-br from-[#fdf2dd] to-amber-50 relative">
      {/* Éléments décoratifs */}
      <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-orange-100/30 rounded-full transform"></div>
      <div className="absolute bottom-[15%] right-[8%] w-40 h-24 bg-amber-100/40 rounded-xl transform rotate-12"></div>
      <div className="absolute top-[30%] right-[10%] w-20 h-20 bg-yellow-100/30 rounded-full"></div>
      
      <div className="max-w-4xl mx-auto bg-white/95 rounded-2xl shadow-lg p-8 md:p-12 border-2 border-amber-200 relative backdrop-blur-sm">
        {/* Décoration d'en-tête */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
          §
        </div>
        
        <Link 
          href="/" 
          className="absolute -top-5 -right-5 bg-white p-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 border-2 border-orange-200"
        >
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-10 text-center border-b-4 border-orange-200 pb-4 inline-block mx-auto">
          {t('legal.title')}
        </h1>

        <div className="space-y-10">
          {/* Section 1 - Éditeur */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">1</span>
              {t('legal.editor.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('legal.editor.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><span className="font-semibold">{t('legal.editor.responsible')} :</span> {t('legal.editor.names')}</li>
              <li>
                <span className="font-semibold">{t('legal.editor.contact')} :</span> 
                <a href="mailto:lagazellesebi@gmail.com" className="text-orange-600 hover:text-orange-800 underline ml-1">
                  lagazellesebi@gmail.com
                </a>
              </li>
              <li><span className="font-semibold">{t('legal.editor.status')} :</span> {t('legal.editor.statusText')}</li>
            </ul>
          </section>

          {/* Section 2 - Hébergement */}
          <section className="bg-amber-50/50 rounded-xl p-6 shadow-sm border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">2</span>
              {t('legal.hosting.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('legal.hosting.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><span className="font-semibold">{t('legal.hosting.name')} :</span> o2switch</li>
              <li><span className="font-semibold">{t('legal.hosting.address')} :</span> {t('legal.hosting.addressText')}</li>
              <li>
                <span className="font-semibold">{t('legal.hosting.website')} :</span> 
                <a 
                  href="https://www.o2switch.fr/" 
                  className="text-orange-600 hover:text-orange-800 underline ml-1 font-medium" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://www.o2switch.fr/
                </a>
              </li>
            </ul>
          </section>

          {/* Section 3 - Propriété intellectuelle */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">3</span>
              {t('legal.intellectual.title')}
            </h2>
            <p className="mb-3 text-gray-800">{t('legal.intellectual.text')}</p>
            <p className="text-gray-800 font-medium">{t('legal.intellectual.reproduction')}</p>
          </section>

          {/* Section 4 - Protection des données */}
          <section className="bg-amber-50/50 rounded-xl p-6 shadow-sm border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">4</span>
              {t('legal.data.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('legal.data.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('legal.data.point1')}</li>
              <li>{t('legal.data.point2')}</li>
              <li>
                {t('legal.data.point3').replace('lagazellesebi@gmail.com', '')} 
                <a href="mailto:lagazellesebi@gmail.com" className="text-orange-600 hover:text-orange-800 underline font-medium">
                  lagazellesebi@gmail.com
                </a>.
              </li>
              <li>{t('legal.data.point4')}</li>
            </ul>
          </section>

          {/* Section 5 - Cookies */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">5</span>
              {t('legal.cookies.title')}
            </h2>
            <p className="mb-3 text-gray-800">{t('legal.cookies.text')}</p>
            <p className="text-gray-800">{t('legal.cookies.config')}</p>
          </section>

          {/* Section 6 - Responsabilité */}
          <section className="bg-amber-50/50 rounded-xl p-6 shadow-sm border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">6</span>
              {t('legal.responsibility.title')}
            </h2>
            <p className="text-gray-800">{t('legal.responsibility.text')}</p>
          </section>

          {/* Section 7 - Droit applicable */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">7</span>
              {t('legal.law.title')}
            </h2>
            <p className="text-gray-800">{t('legal.law.text')}</p>
          </section>
        </div>

        {/* Pied de page */}
        <div className="mt-12 pt-6 border-t-2 border-orange-200 text-center">
          <p className="text-orange-600">© 2025 Sebi la Gazelle</p>
          <Link 
            href="/" 
            className="inline-flex items-center text-orange-600 hover:text-orange-800 mt-3 font-medium"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('legal.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}