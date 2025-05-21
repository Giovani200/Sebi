'use client';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-orange-200 h-16 z-50 ">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Accueil - Icône maison */}
          <Link href="/" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>

          {/* Jeux - Icône manette */}
          <Link href="/games" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </Link>

          {/* Aide - Point d'interrogation */}
          <Link href="/help" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>

          {/* Inscription */}
          <Link href="/register" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900 bg-green-200 rounded-md">
            <span className="text-sm">inscription</span>
          </Link>

          {/* Connexion */}
          <Link href="/login" className="flex flex-col items-center p-2 text-gray-700 hover:text-gray-900 bg-blue-200 rounded-md">
            <span className="text-sm">connection</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 