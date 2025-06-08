import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import soundManager from "../../utils/SoundManager";

export default function GameTutorial({ onClose }) {
  const [step, setStep] = useState(1);
  const [animationClass, setAnimationClass] = useState('');
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Textes des bulles de dialogue par étape
  const dialogues = [
    "Bonjour ! Je m'appelle Sebi, et je suis super content que tu sois là pour jouer avec moi !",
    "Dans ce jeu, tu vas m'aider à sauter par-dessus des obstacles. C'est facile et amusant !",
    "Appuie sur ESPACE ou clique sur l'écran pour me faire sauter. Tu peux même faire un double saut !",
    "Plus tu m'aides à avancer loin, plus ton score sera grand. Tu pourras même gagner des badges !",
    "Est-ce que tu es prêt à jouer avec moi ? Clique sur le bouton vert pour commencer l'aventure !"
  ];

  const dialogueEmojis = ["😄", "🏃", "⬆️", "🏆", "🎮"];

  useEffect(() => {
    // Charger le son du tutoriel
    soundManager.loadSounds({
      'tutorial': '/music/tutorial.mp3',
      'next': '/music/next.wav'
    });

    // Jouer la musique de fond du tutoriel
    soundManager.play('tutorial', { volume: 0.7 });

    return () => {
      // Arrêter la musique quand on quitte le tutoriel
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Passer à l'étape suivante
  const nextStep = () => {
    // Jouer un son de transition
    soundManager.play('next', { volume: 0.5 });

    if (step < dialogues.length) {
      // Animation de transition
      setAnimationClass('animate-bounce');
      setTimeout(() => setAnimationClass(''), 500);

      // Passer à l'étape suivante
      setStep(step + 1);
    } else {
      // Si c'est la dernière étape, on est prêt
      setIsReady(true);
    }
  };

  // Commencer le jeu
  const startGame = () => {
    // Arrêter la musique du tutoriel
    soundManager.pauseBackgroundMusic();

    // Si vous utilisez aussi un son spécifique 'tutorial'
    const tutorialSound = soundManager.sounds['tutorial'];
    if (tutorialSound) {
      tutorialSound.pause();
      tutorialSound.currentTime = 0;
    }

    // Jouer un son de démarrage (optionnel)
    soundManager.play('next', { volume: 0.8 });

    // Fermer le tutoriel
    onClose();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fdf2dd]/95 z-50 p-4 overflow-auto">
      <div className="bg-white/90 rounded-xl shadow-md p-6 max-w-lg w-full relative border border-orange-200 transform -rotate-1">
        {/* En-tête */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mb-4">
          Bienvenue dans Sebi Runner !
        </h2>
        
        {/* Bouton de fermeture */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-orange-400 hover:text-orange-600 bg-orange-100/50 hover:bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        {/* Sebi qui parle */}
        <div className={`relative flex flex-col md:flex-row items-center gap-6 my-4 ${animationClass}`}>
          <div className="animate-bounce-slow w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/images/SEBI.png"
              alt="Sebi"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          {/* Bulle de dialogue */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 relative flex-1">
            <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-4 h-4 bg-amber-50 border-l border-b border-amber-200 transform rotate-45 hidden md:block"></div>
            <p className="text-lg text-orange-800">
              <span className="text-2xl mr-2">{dialogueEmojis[step - 1]}</span>
              {dialogues[step - 1]}
            </p>
          </div>
        </div>

        {/* Indicateurs d'étape */}
        <div className="flex justify-center mt-6 mb-4">
          {dialogues.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full transition-colors duration-300 ${
                index < step ? 'bg-orange-500' : 'bg-amber-200'
              }`}
            />
          ))}
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-center space-x-4 mt-6">
          {!isReady ? (
            <button
              className="bg-gradient-to-r from-orange-300 to-amber-400 hover:from-orange-400 hover:to-amber-500 text-orange-800 font-bold py-2 px-6 rounded-full transition-all duration-300 hover:scale-105 flex items-center shadow-sm"
              onClick={nextStep}
            >
              <span>Suivant</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-orange-300 to-amber-400 hover:from-orange-400 hover:to-amber-500 text-orange-800 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-110 shadow-sm"
              onClick={startGame}
            >
              Allons-y !
            </button>
          )}
        </div>

        {/* Étoiles décoratives */}
        <div className="absolute -top-1 -right-2 text-amber-300 text-xl animate-float-slow">✨</div>
        <div className="absolute -bottom-1 -left-2 text-amber-300 text-xl animate-float-slow animation-delay-500">⭐</div>
      </div>
    </div>
  );
}