'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../i18n/client';

export default function ConfirmationReussie() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full bg-[#fdf2dd] py-16 px-4 flex items-center justify-center relative overflow-auto">
      {/* Éléments décoratifs comme dans le jeu */}
      <div className="absolute top-[10%] left-[20%] w-24 h-24 bg-orange-100/30 rounded-full"></div>
      <div className="absolute bottom-[20%] right-[10%] w-32 h-32 bg-yellow-100/30 rounded-full"></div>
      <div className="absolute top-[30%] right-[30%] text-4xl animate-float-slow opacity-50">✨</div>
      <div className="absolute bottom-[40%] left-[15%] text-4xl animate-float-slow animation-delay-500 opacity-50">⭐</div>
      <div className="absolute top-[15%] right-[15%] text-xl animate-float-slow opacity-40">⭐</div>
      <div className="absolute bottom-[15%] left-[25%] text-xl animate-float-slow animation-delay-300 opacity-40">✨</div>
      
      <div className="bg-white/90 p-8 rounded-2xl shadow-md max-w-md relative border border-orange-200 transform -rotate-1 animate-scaleIn">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20">
          <Image
            src="/images/sebi.webp"
            alt={t('confirmation.sebiAlt')}
            width={80}
            height={80}
            className="object-contain animate-bounce-slow"
          />
        </div>

        <div className="text-orange-500 text-5xl mb-4 animate-scaleIn mt-10 text-center">✓</div>
        
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-4 drop-shadow-sm animate-slideIn">
          {t('confirmation.title')} 🎉
        </h2>
        
        <p className="text-gray-700 mb-6 animate-fadeInUp animate-delay-100 text-center">
          {t('confirmation.message')}
        </p>
        
        <div className="flex justify-center">
          <Link 
            href="/login"
            className="bg-gradient-to-r from-orange-200 to-amber-300 hover:from-orange-300 hover:to-amber-400 
                     text-orange-800 font-bold py-3 px-8 rounded-full transition-all duration-300 
                     hover:scale-105 shadow-sm border border-orange-200 animate-fadeInUp animate-delay-200 flex items-center"
          >
            <span className="mr-2">🎮</span>
            {t('confirmation.loginButton')}
          </Link>
        </div>
        
        {/* Éléments décoratifs supplémentaires */}
        <div className="absolute -top-1 -right-1 text-amber-300 text-xl animate-float-slow">✨</div>
        <div className="absolute -bottom-1 -left-1 text-amber-300 text-xl animate-float-slow animation-delay-500">⭐</div>
      </div>
    </div>
  );
}