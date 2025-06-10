'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../i18n/client';

export default function PrivacyPage() {
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
          🔒
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
          {t('privacy.title')}
        </h1>
        
        <p className="mb-10 text-center text-gray-700">
          {t('privacy.lastUpdate')} : 09/06/2025
        </p>
        
        <p className="mb-10 text-gray-800 leading-relaxed text-lg">
          {t('privacy.introduction')}
        </p>

        <div className="space-y-10">
          {/* Section 1 - Qui sommes-nous */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">1</span>
              {t('privacy.whoWeAre.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.whoWeAre.text')}</p>
            <div className="bg-white/60 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-600 mb-2">{t('privacy.whoWeAre.responsible')}</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><span className="font-semibold">{t('privacy.whoWeAre.name')} :</span> {t('privacy.whoWeAre.names')}</li>
                <li>
                  <span className="font-semibold">{t('privacy.whoWeAre.email')} :</span> 
                  <a href="mailto:lagazellesebi@gmail.com" className="text-orange-600 hover:text-orange-800 underline ml-1">
                    lagazellesebi@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 - Quelles données collectons-nous */}
          <section className="bg-amber-50/50 rounded-xl p-6 shadow-sm border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">2</span>
              {t('privacy.dataCollected.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.dataCollected.text')}</p>
            
            <div className="space-y-5">
              <div className="bg-white/60 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-600 mb-2">{t('privacy.dataCollected.personalData')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>{t('privacy.dataCollected.personal1')}</li>
                  <li>{t('privacy.dataCollected.personal2')}</li>
                  <li>{t('privacy.dataCollected.personal3')}</li>
                  <li>{t('privacy.dataCollected.personal4')}</li>
                </ul>
              </div>
              
              <div className="bg-white/60 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-600 mb-2">{t('privacy.dataCollected.technicalData')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>{t('privacy.dataCollected.technical1')}</li>
                  <li>{t('privacy.dataCollected.technical2')}</li>
                  <li>{t('privacy.dataCollected.technical3')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 - Pourquoi collectons-nous ces données */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">3</span>
              {t('privacy.whyCollect.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.whyCollect.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('privacy.whyCollect.reason1')}</li>
              <li>{t('privacy.whyCollect.reason2')}</li>
              <li>{t('privacy.whyCollect.reason3')}</li>
              <li>{t('privacy.whyCollect.reason4')}</li>
              <li>{t('privacy.whyCollect.reason5')}</li>
            </ul>
            <p className="mt-4 text-gray-800 font-medium">{t('privacy.whyCollect.noExcess')}</p>
          </section>

          {/* Section 4 - Base légale du traitement */}
          <section className="bg-amber-50/50 rounded-xl p-6 shadow-sm border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">4</span>
              {t('privacy.legalBasis.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.legalBasis.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('privacy.legalBasis.basis1')}</li>
              <li>{t('privacy.legalBasis.basis2')}</li>
              <li>{t('privacy.legalBasis.basis3')}</li>
            </ul>
          </section>

          {/* Section 5 - Utilisation des cookies */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">5</span>
              {t('privacy.cookies.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.cookies.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('privacy.cookies.purpose1')}</li>
              <li>{t('privacy.cookies.purpose2')}</li>
              <li>{t('privacy.cookies.purpose3')}</li>
            </ul>
            <p className="mt-4 text-gray-800">{t('privacy.cookies.settings')}</p>
          </section>

          {/* Section 6 - Durée de conservation */}
          <section className="bg-amber-50/50 rounded-xl p-6 shadow-sm border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">6</span>
              {t('privacy.retention.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.retention.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('privacy.retention.period1')}</li>
              <li>{t('privacy.retention.period2')}</li>
              <li>{t('privacy.retention.period3')}</li>
            </ul>
          </section>

          {/* Section 7 - Vos droits */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">7</span>
              {t('privacy.rights.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.rights.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('privacy.rights.right1')}</li>
              <li>{t('privacy.rights.right2')}</li>
              <li>{t('privacy.rights.right3')}</li>
              <li>{t('privacy.rights.right4')}</li>
              <li>{t('privacy.rights.right5')}</li>
              <li>{t('privacy.rights.right6')}</li>
            </ul>
            <div className="mt-4 p-4 bg-white/60 rounded-lg flex items-center space-x-3">
              <span className="text-2xl">📩</span>
              <p className="font-medium">
                {t('privacy.rights.contact')} : 
                <a href="mailto:lagazellesebi@gmail.com" className="text-orange-600 hover:text-orange-800 underline ml-1">
                  lagazellesebi@gmail.com
                </a>
              </p>
            </div>
            <p className="mt-4 text-gray-800">{t('privacy.rights.complaint')}</p>
          </section>

          {/* Section 8 - Partage des données */}
          <section className="bg-amber-50/50 rounded-xl p-6 shadow-sm border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">8</span>
              {t('privacy.sharing.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.sharing.text')}</p>
            <p className="text-gray-800">{t('privacy.sharing.hosting')}</p>
          </section>

          {/* Section 9 - Protection des enfants */}
          <section className="bg-orange-50/50 rounded-xl p-6 shadow-sm border-l-4 border-orange-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">9</span>
              {t('privacy.children.title')}
            </h2>
            <p className="mb-4 text-gray-800">{t('privacy.children.text')}</p>
            <p className="text-gray-800">{t('privacy.children.noCollection')}</p>
          </section>

          {/* Section 10 - Modifications */}
          <section className="bg-amber-50/50 rounded-xl p-6 shadow-sm border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">10</span>
              {t('privacy.changes.title')}
            </h2>
            <p className="text-gray-800">{t('privacy.changes.text')}</p>
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
            {t('privacy.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}