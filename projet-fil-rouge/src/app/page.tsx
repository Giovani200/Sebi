'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSection, setCurrentSection] = useState('forest');

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Section Forêt */}
      <div 
        className={`absolute w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out ${
          currentSection === 'forest' ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundImage: 'url(/images/foret.jpg)' }}
      >
        <div className="container mx-auto h-full relative flex flex-col items-center justify-center">
          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center md:top-100 drop-shadow-lg">
            Bienvenue aux <br className="md:hidden" />
            <span className="text-[#FFD4B8]">Petits Aventuriers</span>
          </h1>

          {/* Logo Sebi - Centré sur mobile, en bas à gauche sur desktop */}
          <div className="mb-20 md:mb-0 md:absolute md:top-60 md:left-1">
            <Image
              src="/images/logo.png"
              alt="Logo Sebi"
              width={200}
              height={200}
              className="rounded-full w-[200px] h-[200px] md:w-[100px] md:h-[100px] transition-all duration-300"
            />
          </div>

          {/* Personnages visibles uniquement sur desktop */}
          <div className="hidden md:block">
            {/* Personnage Sebi avec bulle de dialogue */}
            <div
              className="absolute left-1/2 top-50 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src="/images/sebi.png"
                alt="Sebi la gazelle"
                width={200}
                height={200}
              />

              {isHovered && (
                <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-[#FFE5B4] p-6 rounded-3xl w-80 shadow-lg transition-all duration-300 ease-in-out">
                  <h2 className="text-center text-2xl font-bold text-black">
                    Bienvenue Petit Aventurier
                  </h2>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#FFE5B4] rotate-45" />
                </div>
              )}
            </div>
          </div>

          {/* Bouton Jouez - Repositionné pour mobile */}
          <div className="mt-8 md:absolute md:left-1/2 md:top-80 md:transform md:-translate-x-1/2">
            <button 
              onClick={() => handleSectionChange('savanna')}
              className="bg-[#FFD4B8] px-16 py-4 md:px-12 md:py-3 rounded-full text-black text-2xl md:text-xl font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg"
            >
              Jouez
            </button>
          </div>

          {/* Indicateur de défilement */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg 
              className="w-6 h-6 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Section Savane */}
      <div 
        className={`absolute w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out ${
          currentSection === 'savanna' ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ backgroundImage: 'url(/images/savane.jpg)' }}
      >
        <div className="container mx-auto h-full relative flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Découvre la Savane
          </h2>
          
          {/* Bouton retour */}
          <button 
            onClick={() => handleSectionChange('forest')}
            className="absolute top-8 left-8 bg-[#FFD4B8] p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
