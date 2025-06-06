'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import soundManager from '../../utils/SoundManager';

export default function Games() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(true);

  // Gestion de l'entrée sur la page avec animation
  useEffect(() => {
    // Animation d'entrée
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Chargement du son d'ambiance
    soundManager.loadSounds({
      'ambiance': '/music/kids-playground.mp3',
      'hover': '/music/hover.mp3',
      'click': '/music/click.mp3'
    });

    // Animation des nuages
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
      const speed = 0.2 + Math.random() * 0.3;
      const direction = Math.random() > 0.5 ? 1 : -1;
      const startPos = Math.random() * 100;

      cloud.style.left = `${startPos}%`;

      let position = startPos;
      function animateCloud() {
        position += speed * direction;
        if (position > 120) position = -20;
        if (position < -20) position = 120;
        cloud.style.left = `${position}%`;
        animationFrameRef.current = requestAnimationFrame(animateCloud);
      }

      animateCloud();
    });

    // Suivi de la souris pour les éléments interactifs
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation des étoiles flottantes
    const stars = document.querySelectorAll('.floating-star');
    stars.forEach(star => {
      const floatRange = 15 + Math.random() * 10;
      const floatSpeed = 2 + Math.random() * 2;
      const startY = parseFloat(getComputedStyle(star).top);
      let angle = Math.random() * Math.PI * 2;

      function animateStar() {
        angle += 0.02 * floatSpeed;
        const y = startY + Math.sin(angle) * floatRange;
        star.style.top = `${y}px`;
        animationFrameRef.current = requestAnimationFrame(animateStar);
      }

      animateStar();
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Arrêter la musique quand on quitte la page
      const ambianceSound = soundManager.sounds['ambiance'];
      if (ambianceSound) {
        ambianceSound.pause();
        ambianceSound.currentTime = 0;
      }
    };
  }, []);

  // Fonction pour jouer/mettre en pause l'ambiance sonore
  const toggleSound = () => {
    if (isSoundPlaying) {
      // Arrêter le son
      const ambianceSound = soundManager.sounds['ambiance'];
      if (ambianceSound) {
        ambianceSound.pause();
      }
      setIsSoundPlaying(false);
    } else {
      // Jouer le son avec un volume bas
      soundManager.play('ambiance', { volume: 0.2, loop: true });
      setIsSoundPlaying(true);
    }

    // Effet sonore de clic
    soundManager.play('click', { volume: 0.5, pitchVariation: 0.1 });
  };

  // Sons sur les cartes
  const playHoverSound = () => {
    soundManager.play('hover', { volume: 0.3, pitchVariation: 0.1 });
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 pt-46 pb-16 overflow-hidden">

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


      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nuages */}
        <div className="cloud absolute top-[10%] w-24 h-16 bg-white rounded-full"></div>
        <div className="cloud absolute top-[20%] w-32 h-20 bg-white rounded-full"></div>
        <div className="cloud absolute top-[15%] w-28 h-18 bg-white rounded-full"></div>

        {/* Étoiles flottantes */}
        <div className="floating-star absolute left-[15%] top-[30%] text-4xl">✨</div>
        <div className="floating-star absolute left-[75%] top-[25%] text-3xl">⭐</div>
        <div className="floating-star absolute left-[60%] top-[70%] text-2xl">✨</div>

        {/* Formes géométriques flottantes */}
        <div className="absolute left-[10%] top-[60%] w-16 h-16 bg-orange-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute right-[10%] top-[40%] w-12 h-12 bg-amber-200/30 rotate-45 animate-float-slow animation-delay-1000"></div>
      </div>

      {/* Contenu principal avec animation d'entrée */}
      <div className={`max-w-7xl mx-auto px-4 relative transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Titre avec bulles d'animation */}
        <div className="relative text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 animate-bounce-once">
            À quoi veux-tu jouer aujourd'hui ?
          </h1>
          <div className="text-xl md:text-2xl font-medium text-orange-600 animate-fade-in animation-delay-500">
            Choisis ton compagnon d'aventure !
          </div>

          {/* Bulles décoratives */}
          <div className="absolute -top-8 -left-8 w-12 h-12 rounded-full bg-orange-200 animate-bounce-slow opacity-70"></div>
          <div className="absolute top-2 right-12 w-8 h-8 rounded-full bg-amber-300 animate-pulse opacity-70"></div>

          {/* Mascotte Sebi qui saute (apparaît de temps en temps) */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-jump-in-out">
            <div className="relative w-16 h-16">
              <Image
                src="/images/SEBI.png"
                alt="Sebi mascotte"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Conteneur de cartes avec effet d'apparition séquentielle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Carte Sebi avec effets 3D et interaction à la souris */}
          <div
            className={`bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-orange-200
                      transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{
              transitionDelay: '300ms',
              transform: mousePosition.x ? `perspective(1000px) rotateY(${(mousePosition.x / window.innerWidth - 0.5) * 5}deg) rotateX(${(mousePosition.y / window.innerHeight - 0.5) * -5}deg)` : 'none'
            }}
            // onMouseEnter={playHoverSound}
          >
            <div className="p-6 relative">
              {/* Fond coloré et amusant avec animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-amber-100/50"></div>

              {/* Cercles décoratifs animés */}
              <div className="absolute w-32 h-32 rounded-full bg-orange-100 right-0 bottom-0 transform translate-x-16 translate-y-16 animate-pulse-slow"></div>
              <div className="absolute w-24 h-24 rounded-full bg-amber-50 left-0 top-0 transform -translate-x-12 -translate-y-12 animate-pulse-slow animation-delay-500"></div>

              <div className="flex flex-col items-center relative z-10">
                {/* Image avec effet de rebond et interaction */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 transform hover:scale-110 transition-all duration-300 hover:animate-bounce">
                  <div className="absolute -inset-6 bg-orange-300/20 rounded-full blur-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-100/50 animate-pulse-very-slow rounded-full"></div>
                  <Image
                    src="/images/SEBI.png"
                    alt="Sebi la gazelle"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Texte simplifié pour enfants avec animation */}
                <div className="animate-fade-in animation-delay-700">
                  <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-3">
                    Joue avec Sebi !
                  </h2>
                  <p className="text-lg text-gray-700 text-center mb-6">
                    Aide Sebi à sauter par-dessus les obstacles !
                  </p>
                </div>

                {/* Bouton plus grand et plus coloré avec effets avancés */}
                <Link
                  href="/games/sebi_la_gazelle"
                  className="relative group bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xl
                           px-8 py-4 rounded-full font-bold shadow-lg flex items-center space-x-3
                           hover:shadow-orange-200/50 hover:shadow-xl transition-all duration-300
                           animate-pulse-subtle"
                >
                  <span>Jouer maintenant !</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-400/0 via-white/30 to-orange-400/0
                               opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-full"></div>
                </Link>
              </div>
            </div>
          </div>

          {/* Carte James avec délai d'animation */}
          <div
            className={`bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-amber-200
                      transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{
              transitionDelay: '500ms',
              transform: mousePosition.x ? `perspective(1000px) rotateY(${(mousePosition.x / window.innerWidth - 0.5) * 5}deg) rotateX(${(mousePosition.y / window.innerHeight - 0.5) * -5}deg)` : 'none'
            }}
            // onMouseEnter={playHoverSound}
          >
            <div className="p-6 relative">
              {/* Fond coloré et amusant */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-100/50"></div>

              {/* Cercles décoratifs animés */}
              <div className="absolute w-32 h-32 rounded-full bg-amber-100 right-0 bottom-0 transform translate-x-16 translate-y-16 animate-pulse-slow animation-delay-700"></div>
              <div className="absolute w-24 h-24 rounded-full bg-orange-50 left-0 top-0 transform -translate-x-12 -translate-y-12 animate-pulse-slow animation-delay-1000"></div>

              <div className="flex flex-col items-center relative z-10">
                {/* Image avec effet de balancement */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 transform hover:scale-110 transition-all duration-300 hover:rotate-3">
                  <div className="absolute -inset-6 bg-amber-300/20 rounded-full blur-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-100/50 animate-pulse-very-slow rounded-full"></div>
                  <Image
                    src="/images/james.png"
                    alt="James le hibou"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Texte simplifié pour enfants avec animation */}
                <div className="animate-fade-in animation-delay-900">
                  <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-3">
                    Joue avec James !
                  </h2>
                  <p className="text-lg text-gray-700 text-center mb-6">
                    Résous des énigmes avec James le hibou !
                  </p>
                </div>

                {/* Bouton plus grand et plus coloré */}
                <Link
                  href="/games/james_le_hibou"
                  className="relative group bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xl
                           px-8 py-4 rounded-full font-bold shadow-lg flex items-center space-x-3
                           hover:shadow-amber-200/50 hover:shadow-xl transition-all duration-300
                           animate-pulse-subtle animation-delay-300"
                >
                  <span>Jouer maintenant !</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/0 via-white/30 to-amber-400/0
                               opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-full"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}