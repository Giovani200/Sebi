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
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-900/80 z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative">
        {/* En-tête */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-700 mb-4">
          Bienvenue dans Sebi Runner !
        </h2>

        {/* Sebi qui parle */}
        <div className={`relative w-32 h-32 md:w-40 md:h-40 ${animationClass}`}>
          <div className="animate-pulse-subtle">
            <Image
              src="/sebi.png"
              alt="Sebi"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          {/* Bulle de dialogue */}
          <div className="bg-yellow-100 p-4 rounded-2xl border-2 border-yellow-300 relative flex-1">
            <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-4 h-4 bg-yellow-100 border-l-2 border-b-2 border-yellow-300 transform rotate-45 hidden md:block"></div>
            <p className="text-lg">
              <span className="text-2xl mr-2">{dialogueEmojis[step - 1]}</span>
              {dialogues[step - 1]}
            </p>
          </div>
        </div>

        {/* Indicateurs d'étape */}
        <div className="flex justify-center mt-4 mb-2">
          {dialogues.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${index < step ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-center space-x-4">
          {!isReady ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-transform hover:scale-105 flex items-center"
              onClick={nextStep}
            >
              <span>Suivant</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-110"
              onClick={startGame}
            >
              Allons-y !
            </button>
          )}
        </div>
      </div>
    </div>
  );
}