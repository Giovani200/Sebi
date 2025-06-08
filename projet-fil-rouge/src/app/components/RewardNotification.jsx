import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export default function RewardNotification({ reward, onClose }) {
  const { t } = useTranslation('common');
  const [animationState, setAnimationState] = useState('entering');
  
  useEffect(() => {
    // Séquence d'animation
    const enterTimer = setTimeout(() => setAnimationState('active'), 600);
    const exitTimer = setTimeout(() => setAnimationState('exiting'), 5000);
    const closeTimer = setTimeout(() => onClose && onClose(), 5500);
    
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);
  
  const getAnimationClass = () => {
    switch(animationState) {
      case 'entering': return 'scale-0 opacity-0';
      case 'active': return 'scale-100 opacity-100';
      case 'exiting': return 'scale-110 opacity-0';
      default: return '';
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Overlay avec confettis */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      
      {/* Carte de récompense */}
      <div className={`max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 transform ${getAnimationClass()}`}>
        {/* En-tête coloré */}
        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-4 text-center">
          <h2 className="text-2xl font-bold text-white">{t('reward.title')}</h2>
        </div>
        
        {/* Image de récompense */}
        <div className="relative w-full h-56 bg-gradient-to-b from-amber-50 to-amber-100">
          {reward.imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`relative w-48 h-48 ${animationState === 'active' ? 'animate-pulse' : ''}`}>
                <Image 
                  src={reward.imageUrl}
                  alt={t('reward.title')}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Description */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800">
            {t('reward.levelReached', { level: reward.milestone })}
          </h3>
          <p className="mt-2 text-gray-600">
            {t('reward.continueProgress')}
          </p>
          
          <button 
            className="mt-4 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-full font-bold shadow-md hover:from-green-700 hover:to-emerald-800 transition-colors pointer-events-auto"
            onClick={() => {
              setAnimationState('exiting');
              setTimeout(() => onClose && onClose(), 500);
            }}
          >
            {t('reward.awesome')}
          </button>
        </div>
      </div>
      
      {/* Confettis */}
      {animationState === 'active' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#FFD700', '#FF6347', '#7CFC00', '#FF69B4', '#00BFFF'][i % 5],
                left: `${Math.random() * 100}%`,
                top: '-20px',
                animation: `fall ${1 + Math.random() * 5}s linear forwards`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}