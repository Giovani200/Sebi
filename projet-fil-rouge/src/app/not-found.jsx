'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../i18n/client';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/404.webp"
          alt={t('notFound.imageAlt')}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-md mx-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {t('notFound.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('notFound.message')}
        </p>
        {/* Bouton de retour */}
        <Link 
          href="/"
          className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 
                     text-white px-8 py-3 rounded-full font-semibold 
                     shadow-md hover:shadow-xl transform hover:-translate-y-0.5 
                     transition-all duration-300 hover:scale-105"
        >
          {t('notFound.homeButton')}
        </Link>
      </div>
    </div>
  );
}