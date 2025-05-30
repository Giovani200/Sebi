'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/404.png"
          alt="404 Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-md mx-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Oups !
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          On dirait que tu t&apos;es perdu dans la forêt...
        </p>
          {/* Bouton de retour */}
        <Link 
          href="/"
          className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 
                     text-white px-8 py-3 rounded-full font-semibold 
                     shadow-md hover:shadow-xl transform hover:-translate-y-0.5 
                     transition-all duration-300 hover:scale-105"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
