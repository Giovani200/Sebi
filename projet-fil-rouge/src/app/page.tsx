'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

// Composant utilitaire pour animer à l'entrée du viewport
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: number;
};
function Reveal({ children, className = '', animation = 'animate-fadeInUp', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.remove('opacity-0');
          node.classList.add(animation);
          if (delay) (node as HTMLDivElement).style.animationDelay = `${delay}ms`;
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]">
      {/* Section Forêt */}
      <div className="relative h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
        <div className="container mx-auto h-full relative flex flex-col items-center justify-center">
          {/* Titre principal */}
          <Reveal animation="animate-fadeInUp" delay={0}>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center md:top-100 drop-shadow-lg mb-8">
              Bienvenue aux <br className="md:hidden" />
              <span className="text-[#FFD4B8]">Petits Aventuriers</span>
            </h1>
          </Reveal>
          {/* Logo Sebi - visible uniquement sur mobile */}
          <Reveal animation="animate-fadeInUp" delay={100}>
            <div className="md:hidden mb-20">
              <Image
                src="/images/logo.png"
                alt="Logo Sebi"
                width={200}
                height={200}
                className="rounded-full w-[200px] h-[200px] transition-all duration-300"
              />
            </div>
          </Reveal>
          {/* Personnage Sebi avec bulle de dialogue - visible uniquement sur desktop */}
          <div className="hidden md:block ">
            <div
              className="cursor-pointer relative"
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
        </div>
      </div>

      {/* Section Savane */}
      <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/savane.jpg)' }}>
        <div className="container mx-auto py-20 px-4">
          <Reveal animation="animate-fadeInUp" delay={150}>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
              Sebi la gazelle
            </h2>
          </Reveal>
          {/* Carte de présentation */}
          <Reveal animation="animate-fadeInUp" delay={180}>
            <div className="bg-white/90 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <Reveal animation="animate-fadeInUp" delay={200}>
                  <div className="w-64 h-64 relative">
                    <Image
                      src="/images/SEBI.png"
                      alt="Sebi la gazelle"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                </Reveal>
                <div className="flex-1 text-center md:text-left">
                  <Reveal animation="animate-fadeInUp" delay={220}>
                    <h3 className="text-2xl font-bold text-[#4A5568] mb-4">À propos de Sebi</h3>
                  </Reveal>
                  <Reveal animation="animate-fadeInUp" delay={240}>
                    <p className="text-lg text-[#2D3748]">
                      Salut ! Je suis Sebi, une gazelle aventurière qui adore explorer la savane. 
                      Je suis rapide comme le vent et toujours prête à aider mes amis !
                    </p>
                  </Reveal>
                  <Reveal animation="animate-fadeInUp" delay={260}>
                    <button
                      type="button"
                      className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
                    >
                      Jouer
                    </button>
                  </Reveal>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Section James */}
      <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
        <div className="container mx-auto py-20 px-4">
          <Reveal animation="animate-fadeInUp" delay={350}>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
              James le Hibou
            </h2>
          </Reveal>
          {/* Carte de présentation de James */}
          <Reveal animation="animate-fadeInUp" delay={380}>
            <div className="bg-white/90 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <Reveal animation="animate-fadeInUp" delay={400}>
                  <div className="w-64 h-64 relative">
                    <Image
                      src="/images/james.png"
                      alt="James le hibou"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                </Reveal>
                <div className="flex-1 text-center md:text-left">
                  <Reveal animation="animate-fadeInUp" delay={420}>
                    <h3 className="text-2xl font-bold text-[#4A5568] mb-4">À propos de James</h3>
                  </Reveal>
                  <Reveal animation="animate-fadeInUp" delay={440}>
                    <p className="text-lg text-[#2D3748]">
                      Bonjour ! Je suis James, un hibou passionné par les mathématiques. 
                      Je serai ton professeur et guide dans cette aventure. Avec moi, tu 
                      découvriras que les maths peuvent être amusantes !
                    </p>
                  </Reveal>
                  <Reveal animation="animate-fadeInUp" delay={460}>
                    <button
                      type="button"
                      className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
                    >
                      Jouer
                    </button>
                  </Reveal>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
