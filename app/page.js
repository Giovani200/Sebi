'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen w-full relative bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'url(/images/foret.jpg)',
      height: '100vh',
    }}>
      <div className="container mx-auto h-full relative">
        {/* Logo Sebi */}
        <div className="absolute bottom-20 left-10 md:left-20">
          <Image
            src="/images/logo.png"
            alt="Logo Sebi"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        {/* Personnage Sebi avec bulle de dialogue */}
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src="/images/sebi.png"
            alt="Sebi la gazelle"
            width={200}
            height={200}
          />
          
          {/* Bulle de dialogue au hover */}
          {isHovered && (
            <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-[#FFE5B4] p-6 rounded-3xl w-80 shadow-lg transition-all duration-300 ease-in-out">
              <h1 className="text-center text-2xl font-bold text-black">Bienvenue Petit Aventurier</h1>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#FFE5B4] rotate-45"></div>
            </div>
          )}
        </div>

        {/* Personnage James */}
        <div className="absolute right-10 top-20 md:right-20">
          <Image
            src="/images/james.png"
            alt="James le hibou"
            width={150}
            height={150}
          />
        </div>

        {/* Bouton Jouez */}
        <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2">
          <button className="bg-[#FFD4B8] px-12 py-3 rounded-full text-black text-xl font-semibold hover:bg-opacity-90 transition-all duration-300">
            jouez
          </button>
        </div>
      </div>
    </div>
  );
}
