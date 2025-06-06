'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
  
  useEffect(() => {
    checkAuthStatus();
  }, [pathname]); // Vérifier à chaque changement de page
  
  const handleLogout = async () => {
  try {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      setUser(null);
      
      // Afficher notification
      window.dispatchEvent(new CustomEvent('showNotification', { 
        detail: { message: 'Déconnexion réussie!', type: 'success' } 
      }));
      
      // Redirection optionnelle
      router.push('/');
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    
    // Notification d'erreur
    window.dispatchEvent(new CustomEvent('showNotification', { 
      detail: { message: 'Erreur lors de la déconnexion', type: 'error' } 
    }));
  }
};

  return (
    <nav className="fixed md:inset-x-0 md:top-0 md:bottom-auto inset-x-0 bottom-0 z-50">
      {/* Version desktop */}
      <div className="hidden md:block bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo et nom */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="Logo Sebi"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-xl text-gray-800">Sebi</span>
            </Link>

            {/* Navigation principale */}
            <div className="flex items-center space-x-8">
              <Link 
                href="/games" 
                className={`flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-all duration-300 group relative py-2 ${
                  pathname === '/games' ? 'text-orange-500' : ''
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <span className="font-medium">Jeux</span>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  pathname === '/games' ? 'scale-x-100' : ''
                }`} />
              </Link>

              <Link 
                href="/help" 
                className={`flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-all duration-300 group relative py-2 ${
                  pathname === '/help' ? 'text-orange-500' : ''
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Aide</span>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  pathname === '/help' ? 'scale-x-100' : ''
                }`} />
              </Link>

              <div className="flex items-center space-x-4">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-10 w-32 rounded-full"></div>
                ) : user ? (
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">
                      Bonjour, {user.firstName}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="px-6 py-2.5 rounded-full bg-white border-2 border-red-400 text-red-500 font-medium hover:bg-red-50 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <>
                    <Link 
                      href="/register" 
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Inscription
                    </Link>
                    <Link 
                      href="/login" 
                      className="px-6 py-2.5 rounded-full bg-white border-2 border-orange-400 text-orange-500 font-medium hover:bg-orange-50 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Connexion
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version mobile */}
      <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="grid grid-cols-4 gap-1 px-2 py-3">
          <Link 
            href="/" 
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              pathname === '/' ? 'text-orange-500 bg-orange-50' : 'text-gray-700'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium mt-1">Accueil</span>
          </Link>

          <Link 
            href="/games" 
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              pathname === '/games' ? 'text-orange-500 bg-orange-50' : 'text-gray-700'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span className="text-xs font-medium mt-1">Jeux</span>
          </Link>

          <Link 
            href="/help" 
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              pathname === '/help' ? 'text-orange-500 bg-orange-50' : 'text-gray-700'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium mt-1">Aide</span>
          </Link>

          {user ? (
            <button 
              onClick={handleLogout}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 text-red-500`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-xs font-medium mt-1">Déconnexion</span>
            </button>
          ) : (
            <Link 
              href="/login" 
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                pathname === '/login' ? 'text-orange-500 bg-orange-50' : 'text-gray-700'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="text-xs font-medium mt-1">Connexion</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;





// 'use client';
// import Link from 'next/link';

// const Nav = () => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-orange-200 h-16 z-50 ">
//       <div className="max-w-screen-xl mx-auto">
//         <div className="flex justify-between items-center">
//           {/* Accueil - Icône maison */}
//           <Link href="/" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//             </svg>
//           </Link>

//           {/* Jeux - Icône manette */}
//           <Link href="/games" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
//             </svg>
//           </Link>

//           {/* Aide - Point d'interrogation */}
//           <Link href="/help" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </Link>

//           {/* Inscription */}
//           <Link href="/register" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900 bg-green-200 rounded-md">
//             <span className="text-sm">inscription</span>
//           </Link>

//           {/* Connexion */}
//           <Link href="/login" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900 bg-blue-200 rounded-md">
//             <span className="text-sm">connection</span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav; 