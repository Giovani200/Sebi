'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../i18n/client';

const SebiGuide = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Messages contextuels selon la page
  const pageMessages = {
    '/': "Bienvenue sur Sebi ! Clique sur 'Commencer l'aventure' pour jouer à des jeux amusants !",
    '/games': "Choisis un jeu et amuse-toi ! Tu peux gagner des étoiles en jouant !",
    '/games/sebi_la_gazelle': "Bienvenue dans mon jeu de course ! Utilise les flèches pour m'aider à éviter les obstacles et attraper les étoiles !",
    '/games/james_le_hibou': "Bonjour ! Dans mon jeu de maths, tu dois résoudre des additions et des soustractions. Plus tu es rapide, plus tu gagnes de points !",
    '/leaderboard': "Voici les meilleurs joueurs ! Joue beaucoup pour apparaître ici !",
    '/rewards': "Regarde toutes les récompenses que tu as gagnées en jouant !",
    '/login': "Entre ton nom et ton mot de passe pour jouer !",
    '/register': "Crée ton compte pour commencer l'aventure !"
  };
  
  // Mettre à jour le message quand la page change
  useEffect(() => {
    // Fermer le message si on navigue
    setIsOpen(false);
    
    // Si l'utilisateur a minimisé Sebi, on respecte son choix
    const storedMinimizeState = localStorage.getItem('sebiMinimized');
    if (storedMinimizeState) {
      setIsMinimized(storedMinimizeState === 'true');
    }
    
    // Définir un message par défaut si la page n'est pas dans notre liste
    const defaultMessage = "Explore cette page ! Je suis là si tu as besoin d'aide !";
    
    // D'abord vérifier s'il y a une correspondance exacte pour cette page
    if (pageMessages[pathname]) {
      setMessage(pageMessages[pathname]);
      return;
    }
    
    // Sinon, chercher un message correspondant à un préfixe
    const matchingPath = Object.keys(pageMessages).find(path => 
      path !== '/' && pathname.startsWith(`${path}/`)
    );
    
    setMessage(matchingPath ? pageMessages[matchingPath] : defaultMessage);
  }, [pathname]);
  
  // Gérer la minimisation de Sebi
  const toggleMinimize = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem('sebiMinimized', String(newState));
    setIsOpen(false); // Ferme la bulle si elle est ouverte
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-in-out ${isMinimized 
      ? 'bottom-20 md:bottom-4 right-4 scale-75' 
      : 'bottom-16 md:bottom-6 right-6'}`}
    >
      {/* Bulle de dialogue conditionnelle */}
      {isOpen && !isMinimized && (
        <div className="absolute bottom-full right-0 mb-3 w-64 md:w-80">
          <div className="bg-white rounded-2xl p-4 border-4 border-orange-200 shadow-lg relative">
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-5 h-5 bg-white border-r-4 border-b-4 border-orange-200"></div>
            <p className="text-gray-700 text-sm md:text-base">{message}</p>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-1 text-orange-400 hover:text-orange-600"
              aria-label={t('sebiGuide.closeMessage')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Boutons de contrôle (minimiser/agrandir) */}
      <div className="absolute top-0 right-full mr-2 flex flex-col space-y-1">
        <button 
          onClick={toggleMinimize}
          className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:shadow-lg border-2 border-orange-200"
          aria-label={isMinimized ? t('sebiGuide.expand') : t('sebiGuide.minimize')}
        >
          {isMinimized ? (
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12V4m0 0h-8m8 0l-8 8m0-8v8m0 0H4m8 0l-8 8" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Sebi interactif */}
      <div 
        onClick={() => !isOpen && setIsOpen(true)}
        className={`relative rounded-full bg-white shadow-lg border-4 border-orange-200 overflow-hidden
                   cursor-pointer transition-transform duration-300 transform hover:scale-105
                   ${isOpen ? 'animate-none' : 'animate-pulse-slow'}`}
        style={{
          width: isMinimized ? '60px' : '80px',
          height: isMinimized ? '60px' : '80px'
        }}
      >
        <Image
          src="/images/sebi.webp"
          alt={t('sebiGuide.altText')}
          fill
          className="object-contain p-1"
        />
        {!isOpen && !isMinimized && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
        )}
      </div>
    </div>
  );
};

export default SebiGuide;