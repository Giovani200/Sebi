'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();


 return (
    <footer id='footer' className="bg-gradient-to-t from-orange-100 to-amber-50 relative pt-8 pb-6 overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-orange-200 opacity-30" style={{ borderTopLeftRadius: '50%', borderTopRightRadius: '50%' }}></div>
      <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-pulse-very-slow"></div>
      <div className="absolute -right-12 -bottom-8 w-32 h-32 bg-orange-300 rounded-full opacity-20 animate-pulse-slow"></div>
      
      {/* Étoiles décoratives */}
      <div className="absolute top-12 left-[10%] text-yellow-400 text-2xl transform rotate-12 animate-float-slow">⭐</div>
      <div className="absolute top-24 right-[15%] text-orange-400 text-xl transform -rotate-12 animate-float-slow animation-delay-500">✨</div>
      <div className="absolute bottom-12 left-[30%] text-amber-400 text-xl transform rotate-6 animate-float-slow animation-delay-700">⭐</div>
      <div className="absolute bottom-20 right-[40%] text-yellow-500 text-2xl transform -rotate-6 animate-float-slow animation-delay-300">✨</div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section principale */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo et description */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo.webp"
                  alt="Logo Sebi"
                  fill
                  className="object-contain rounded-full shadow-md hover:shadow-xl transition-all duration-300 animate-bounce-slow"
                />
                <div className="absolute -inset-1 bg-orange-200 rounded-full blur opacity-30 hover:opacity-50 transition-all duration-300"></div>
              </div>
              <h2 className="text-3xl font-bold text-orange-500">
                Sebi
              </h2>
            </div>
            <p className="text-lg text-gray-700 text-center sm:text-left mb-6 font-medium">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-bold text-orange-600 mb-4 border-b-4 border-orange-200 pb-2">
              {t('footer.ourPages')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="group inline-flex items-center text-lg text-gray-700 hover:text-orange-500 font-medium transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/games" 
                  className="group inline-flex items-center text-lg text-gray-700 hover:text-orange-500 font-medium transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">{t('nav.games')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/leaderboard" 
                  className="group inline-flex items-center text-lg text-gray-700 hover:text-amber-500 font-medium transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">{t('nav.scores')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/rewards" 
                  className="group inline-flex items-center text-lg text-gray-700 hover:text-yellow-500 font-medium transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">{t('nav.stars')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Pour les parents */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-bold text-green-600 mb-4 border-b-4 border-green-200 pb-2">
              {t('footer.forParents')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy" 
                  className="group inline-flex items-center text-lg text-gray-700 hover:text-green-500 font-medium transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">{t('footer.privacy')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal" 
                  className="group inline-flex items-center text-lg text-gray-700 hover:text-green-500 font-medium transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">{t('footer.legal')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/help" 
                  className="group inline-flex items-center text-lg text-gray-700 hover:text-green-500 font-medium transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">{t('footer.help')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-bold text-blue-600 mb-4 border-b-4 border-blue-200 pb-2">
              {t('footer.contactUs')}
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:lagazellesebi@gmail.com" 
                className="group inline-flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-500 font-medium transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-blue-100 text-blue-500 transform group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">lagazellesebi@gmail.com</span>
              </a>
              
              <div className="flex items-center justify-center sm:justify-start mt-4">
                <Image
                  src="/images/sebi.webp"
                  alt="Sebi mascotte"
                  width={80}
                  height={80}
                  className="animate-bounce-slow"
                />
                <div className="ml-3 bg-white rounded-2xl p-3 relative shadow-md">
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
                  <p className="text-gray-700 font-medium">
                    {t('footer.seeYouSoon')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright avec design amusant */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 rounded-full"></div>
          <div className="pt-6 text-center">
            <p className="text-gray-600 font-medium">
              © {new Date().getFullYear()} Sebi - {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;