

'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]">
      {/* Section Forêt */}
      <div className="relative h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
        <div className="container mx-auto h-full relative flex flex-col items-center justify-center">
          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center md:top-100 drop-shadow-lg mb-8">
            Bienvenue aux <br className="md:hidden" />
            <span className="text-[#FFD4B8]">Petits Aventuriers</span>
            <a href="/leaderboard" className="text-blue-600 underline hover:text-blue-800">Voir le classement</a>
            <a href="/rewards" className="text-blue-600 underline hover:text-blue-800">Voir les récompenses</a>
          </h1>

          {/* Logo Sebi - visible sur mobile et desktop */}
          <div className="mb-20">
            <Image
              src="/images/logo.png"
              alt="Logo Sebi"
              width={200}
              height={200}
              className="rounded-full w-[200px] h-[200px] transition-all duration-300"
            />
          </div>

          {/* Personnage Sebi avec bulle de dialogue - visible uniquement sur desktop */}
          <div className="hidden md:block">
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
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
            Sebi la gazelle
          </h2>

          {/* Carte de présentation */}
          <div className="bg-white/90 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 relative">
                <Image
                  src="/images/SEBI.png"
                  alt="Sebi la gazelle"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-4">À propos de Sebi</h3>
                <p className="text-lg text-[#2D3748]">
                  Salut ! Je suis Sebi, une gazelle aventurière qui adore explorer la savane. 
                  Je suis rapide comme le vent et toujours prête à aider mes amis !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section James */}
      <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
        <div className="container mx-auto py-20 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
            James le Hibou
          </h2>

          {/* Carte de présentation de James */}
          <div className="bg-white/90 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 relative">
                <Image
                  src="/images/james.png"
                  alt="James le hibou"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-4">À propos de James</h3>
                <p className="text-lg text-[#2D3748]">
                  Bonjour ! Je suis James, un hibou passionné par les mathématiques. 
                  Je serai ton professeur et guide dans cette aventure. Avec moi, tu 
                  découvriras que les maths peuvent être amusantes !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






























// // import RegisterForm from '@/app/components/RegisterForm';

// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
//       <h2> Tu es sur la page accueil</h2>
//       <p>inscrit toi par ici <Link href="/register">Register</Link></p>
//       <p>si tu veux jouer c&apos;est ici <Link href="/games">Game</Link></p>
//       <p><a href="/leaderboard" className="text-blue-600 underline hover:text-blue-800">Voir le classement</a></p>


//     </div>
//   );
// }
