'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import soundManager from '../utils/SoundManager';

// Composant utilitaire pour animer à l'entrée du viewport
function Reveal({ children, className = '', animation = 'animate-fadeInUp', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.remove('opacity-0');
          node.classList.add(animation);
          if (delay) node.style.animationDelay = `${delay}ms`;
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersect, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [animation, delay]);
  return (
    <div ref={ref} className={`opacity-0 will-change-transform ${className}`}>{children}</div>
  );
}

export default function Home() {
  const [isSoundPlaying, setIsSoundPlaying] = useState(true);
  
  // Gérer le son d'ambiance
  useEffect(() => {
    // Charger les sons
    soundManager.loadSounds({
      'homepage': '/music/kids-playground.mp3',
      'click': '/music/click.mp3'
    });
    
    // Nettoyage
    return () => {
      const ambianceSound = soundManager.sounds['homepage'];
      if (ambianceSound) {
        ambianceSound.pause();
        ambianceSound.currentTime = 0;
      }
    };
  }, []);
  
  // Fonction pour activer/désactiver le son
  const toggleSound = () => {
    if (isSoundPlaying) {
      const ambianceSound = soundManager.sounds['homepage'];
      if (ambianceSound) {
        ambianceSound.pause();
      }
      setIsSoundPlaying(false);
    } else {
      soundManager.play('homepage', { volume: 0.2, loop: true });
      setIsSoundPlaying(true);
    }
    
    soundManager.play('click', { volume: 0.5 });
  };


  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-orange-50 to-amber-100">
      {/* Bouton de contrôle du son */}
      <button 
        onClick={toggleSound}
        className="fixed top-24 right-6 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg transition-all"
        aria-label={isSoundPlaying ? "Désactiver le son" : "Activer le son"}
      >
        {isSoundPlaying ? (
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5l4-4v15l-4-4H4a1 1 0 01-1-1v-5a1 1 0 011-1h2.5z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>

      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nuages */}
        <div className="cloud absolute top-[10%] left-[20%] w-24 h-16 bg-white rounded-full"></div>
        <div className="cloud absolute top-[15%] left-[60%] w-32 h-20 bg-white rounded-full"></div>
        <div className="cloud absolute top-[30%] left-[40%] w-28 h-18 bg-white rounded-full"></div>
        
        {/* Étoiles et formes */}
        <div className="floating-star absolute left-[15%] top-[30%] text-4xl">✨</div>
        <div className="floating-star absolute left-[75%] top-[25%] text-3xl">⭐</div>
        <div className="floating-star absolute left-[60%] top-[70%] text-2xl">✨</div>
      </div>

      {/* Section Héros */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4">
        <Reveal animation="animate-fadeInUp" delay={0}>
          <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-6">
            Bienvenue aux<br/>
            <span className="text-orange-600">Petits Aventuriers</span>
          </h1>
        </Reveal>
        
        {/* Sebi avec bulle de dialogue toujours visible */}
        <Reveal animation="animate-fadeInUp" delay={200}>
          <div className="relative max-w-sm mx-auto mb-12">
            {/* Bulle de dialogue toujours visible */}
            <div className="bg-white rounded-2xl p-6 border-4 border-orange-200 shadow-lg mb-6 relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-6 h-6 bg-white border-r-4 border-b-4 border-orange-200"></div>
              <h2 className="text-center text-2xl font-bold text-orange-600 mb-2">
                Salut petit aventurier ! 👋
              </h2>
              <p className="text-center text-gray-700">
                Je m'appelle Sebi ! Viens jouer avec moi et mes amis !
              </p>
            </div>
            
            {/* Image de Sebi qui rebondit légèrement */}
            <div className="w-60 h-60 mx-auto relative animate-bounce-slow">
              <Image
                src="/images/SEBI.png"
                alt="Sebi la gazelle"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </Reveal>
        
        {/* Call to action */}
        <Reveal animation="animate-fadeInUp" delay={400}>
          <Link
            href="/games"
            className="relative group bg-gradient-to-r from-orange-400 to-orange-600 text-white text-2xl
                     px-10 py-5 rounded-full font-bold shadow-lg flex items-center space-x-3
                     hover:shadow-orange-200/50 hover:shadow-xl transition-all duration-300
                     animate-pulse-subtle"
          >
            <span>Commencer l'aventure !</span>
            <svg className="w-7 h-7 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-400/0 via-white/30 to-orange-400/0
                         opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-full"></div>
          </Link>
        </Reveal>
      </div>

      {/* Section Personnages */}
      <div className="relative w-full bg-orange-50 py-20 px-4">
        <Reveal animation="animate-fadeInUp" delay={150}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
            Tes compagnons d'aventure
          </h2>
        </Reveal>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carte Sebi */}
          <Reveal animation="animate-fadeInUp" delay={300}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-orange-200
                           transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl">
              <div className="p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-amber-100/50"></div>
                
                <div className="flex flex-col items-center relative z-10">
                  <div className="relative w-40 h-40 mb-6 transform hover:scale-110 transition-all duration-300 hover:animate-bounce">
                    <div className="absolute -inset-4 bg-orange-300/20 rounded-full blur-xl"></div>
                    <Image
                      src="/images/SEBI.png"
                      alt="Sebi la gazelle"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-orange-600 mb-3 text-center">
                      Sebi la gazelle
                    </h2>
                    <p className="text-lg text-gray-700 text-center mb-6">
                      Salut ! Je suis Sebi, une gazelle aventurière qui adore explorer la savane. 
                      Je suis rapide comme le vent !
                    </p>
                  </div>

                  <Link
                    href="/games/sebi_la_gazelle"
                    className="relative group bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xl
                             px-8 py-4 rounded-full font-bold shadow-lg flex items-center space-x-3
                             hover:shadow-orange-200/50 hover:shadow-xl transition-all duration-300"
                  >
                    <span>Jouer avec Sebi</span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
          
          {/* Carte James */}
          <Reveal animation="animate-fadeInUp" delay={450}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-amber-200
                           transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl">
              <div className="p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-100/50"></div>
                
                <div className="flex flex-col items-center relative z-10">
                  <div className="relative w-40 h-40 mb-6 transform hover:scale-110 transition-all duration-300 hover:rotate-3">
                    <div className="absolute -inset-4 bg-amber-300/20 rounded-full blur-xl"></div>
                    <Image
                      src="/images/james.png"
                      alt="James le hibou"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-amber-600 mb-3 text-center">
                      James le hibou
                    </h2>
                    <p className="text-lg text-gray-700 text-center mb-6">
                      Bonjour ! Je suis James, un hibou qui adore les mathématiques. 
                      Avec moi, tu découvriras que les maths peuvent être amusantes !
                    </p>
                  </div>

                  <Link
                    href="/games/james_le_hibou"
                    className="relative group bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xl
                             px-8 py-4 rounded-full font-bold shadow-lg flex items-center space-x-3
                             hover:shadow-amber-200/50 hover:shadow-xl transition-all duration-300"
                  >
                    <span>Jouer avec James</span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}