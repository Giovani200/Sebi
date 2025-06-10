'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../i18n/client';

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation();

  // Vérification de l'authentification
  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (res.ok && data.isAuthenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Initialisation côté client
  useEffect(() => {
    // Restaurer la langue depuis localStorage
    const savedLang = localStorage.getItem('language') || 'fr';
    if (i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
    
    // Marquer comme monté pour éviter les problèmes d'hydratation
    setMounted(true);
    
    // Vérifier l'authentification
    checkAuthStatus();
  }, [i18n]); 
  
  // Vérifier l'authentification à chaque changement de page
  useEffect(() => {
    if (mounted) {
      checkAuthStatus();
    }
  }, [pathname, mounted]);

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setUser(null);

        // Afficher notification
        window.dispatchEvent(new CustomEvent('showNotification', {
          detail: { message: t('notifications.logoutSuccess'), type: 'success' }
        }));

        // Redirection optionnelle
        router.push('/');
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);

      // Notification d'erreur
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: { message: t('notifications.logoutError'), type: 'error' }
      }));
    }
  };

  // Afficher un placeholder pendant le chargement côté client
  if (!mounted) {
    return (
      <nav className="fixed md:inset-x-0 md:top-0 md:bottom-auto inset-x-0 bottom-0 z-50">
        <div className="hidden md:block bg-gradient-to-r from-orange-100 to-amber-100 shadow-lg rounded-b-2xl border-b-4 border-orange-200">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex justify-between items-center h-24">
              {/* Placeholder pour éviter les sauts de mise en page */}
              <div className="w-28 h-14"></div>
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
        
        <div className="md:hidden bg-gradient-to-r from-orange-100 to-amber-100 shadow-lg rounded-t-2xl border-t-4 border-orange-200">
          <div className="h-20"></div>
        </div>
      </nav>
    );
  }

  // Afficher le composant complet une fois monté
  return (
    <nav className="fixed md:inset-x-0 md:top-0 md:bottom-auto inset-x-0 bottom-0 z-50">
      {/* Version desktop */}
      <div className="hidden md:block bg-gradient-to-r from-orange-100 to-amber-100 backdrop-blur-sm shadow-lg rounded-b-2xl border-b-4 border-orange-200">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-center h-24">
            {/* Logo et nom */}
            <Link href="/" className="flex items-center space-x-3 transform hover:scale-110 transition-all duration-300">
              <div className="relative w-14 h-14 bg-white p-1 rounded-full shadow-md overflow-hidden border-2 border-orange-300">
                <Image
                  src="/images/logo.webp"
                  alt="Logo Sebi"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-2xl text-orange-600">Sebi</span>
            </Link>

            {/* Navigation principale - sans le lien d'aide */}
            <div className="flex items-center space-x-8">
              <Link 
                href="/games" 
                className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  pathname === '/games' 
                    ? 'bg-orange-200 text-orange-600 shadow-md' 
                    : 'text-gray-700 hover:bg-orange-100'
                }`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <span className="font-medium mt-1">{t('nav.games')}</span>
              </Link>

              <Link 
                href="/leaderboard" 
                className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  pathname === '/leaderboard' 
                    ? 'bg-amber-200 text-amber-600 shadow-md' 
                    : 'text-gray-700 hover:bg-amber-100'
                }`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium mt-1">{t('nav.scores')}</span>
              </Link>

              <Link 
                href="/rewards" 
                className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  pathname === '/rewards' 
                    ? 'bg-yellow-200 text-yellow-600 shadow-md' 
                    : 'text-gray-700 hover:bg-yellow-100'
                }`}
              >
                <div className="relative">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {pathname === '/rewards' && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
                  )}
                </div>
                <span className="font-medium mt-1">{t('nav.stars')}</span>
              </Link>

              <div className="flex items-center space-x-4 ml-4">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-12 w-32 rounded-full"></div>
                ) : user ? (
                  <div className="flex items-center space-x-4 bg-white py-2 px-6 rounded-full shadow-md border-2 border-orange-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold">
                        {user.firstName.charAt(0)}
                      </div>
                      <span className="font-bold text-orange-600">
                        {user.firstName}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-2 rounded-full bg-white border-2 border-red-400 text-red-500 hover:bg-red-50 transform hover:scale-110 transition-all duration-300"
                      aria-label={t('nav.logout')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link 
                      href="/register" 
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        {t('nav.register')}
                      </span>
                    </Link>
                    <Link 
                      href="/login" 
                      className="px-6 py-3 rounded-full bg-white border-2 border-orange-400 text-orange-500 font-bold hover:bg-orange-50 transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        {t('nav.login')}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version mobile */}
      <div className="md:hidden bg-gradient-to-r from-orange-100 to-amber-100 backdrop-blur-sm shadow-lg rounded-t-2xl border-t-4 border-orange-200">
        <div className="grid grid-cols-5 gap-1 px-3 py-4">
          <Link 
            href="/" 
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform ${
              pathname === '/' 
                ? 'bg-orange-200 text-orange-600 shadow-md scale-110' 
                : 'text-gray-700 hover:bg-orange-100'
            }`}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-bold mt-1">{t('nav.home')}</span>
          </Link>

          <Link 
            href="/games" 
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform ${
              pathname === '/games' 
                ? 'bg-orange-200 text-orange-600 shadow-md scale-110' 
                : 'text-gray-700 hover:bg-orange-100'
            }`}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span className="text-xs font-bold mt-1">{t('nav.games')}</span>
          </Link>

          <Link 
            href="/leaderboard" 
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform ${
              pathname === '/leaderboard' 
                ? 'bg-amber-200 text-amber-600 shadow-md scale-110' 
                : 'text-gray-700 hover:bg-amber-100'
            }`}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-bold mt-1">{t('nav.scores')}</span>
          </Link>

          <Link 
            href="/rewards" 
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform ${
              pathname === '/rewards' 
                ? 'bg-yellow-200 text-yellow-600 shadow-md scale-110' 
                : 'text-gray-700 hover:bg-yellow-100'
            }`}
          >
            <div className="relative">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {pathname === '/rewards' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
              )}
            </div>
            <span className="text-xs font-bold mt-1">{t('nav.stars')}</span>
          </Link>

          {user ? (
            <div 
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                user ? 'text-red-500 hover:bg-red-100' : 'text-gray-700'
              }`}
            >
              <button onClick={handleLogout} className="w-full flex flex-col items-center focus:outline-none">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-xs font-bold mt-1">{t('nav.exit')}</span>
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform ${
                pathname === '/login' 
                  ? 'bg-orange-200 text-orange-600 shadow-md scale-110' 
                  : 'text-gray-700 hover:bg-orange-100'
              }`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="text-xs font-bold mt-1">{t('nav.enter')}</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;