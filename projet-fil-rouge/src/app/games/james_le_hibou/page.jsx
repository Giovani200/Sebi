"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// Constantes pour les niveaux de difficulté adaptés aux enfants
const DIFFICULTY_LEVELS = {
  EASY: {
    label: "Facile",
    description: "Pour débuter",
    timeDecrease: 0.3, // diminution très lente pour les plus jeunes
    initialTime: 120, // plus de temps
    color: "green",
    maxNum: 5 // additions simples jusqu'à 5 maximum
  },
  MEDIUM: {
    label: "Moyen",
    description: "Je m'améliore",
    timeDecrease: 0.5, // diminution lente
    initialTime: 90,
    color: "yellow",
    maxNum: 10 // additions jusqu'à 10
  },
  HARD: {
    label: "Grand",
    description: "Je suis fort",
    timeDecrease: 0.8, // diminution modérée, mais pas trop difficile
    initialTime: 60,
    color: "red",
    maxNum: 15 // additions jusqu'à 15 pour les plus grands
  }
};

// Constantes pour les étapes du tutoriel simplifiées
const TUTORIAL_STEPS = [
  {
    title: "Coucou !",
    content: "Je suis James le hibou ! Jouons ensemble aux additions !",
    image: "/images/owl.webp"
  },
  {
    title: "Comment jouer",
    content: "Je vais te montrer un calcul. Trouve le bon résultat !",
    image: "/images/owl.webp"
  },
  {
    title: "Le temps",
    content: "Tu as du temps pour jouer. Chaque bonne réponse te donne plus de temps !",
    image: "/images/owl.webp"
  }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(level) {
  // Utiliser le maxNum défini dans les niveaux de difficulté
  const maxNum = DIFFICULTY_LEVELS[level].maxNum;
  
  const a = getRandomInt(0, maxNum);
  const b = getRandomInt(0, maxNum);
  const correct = a + b;
  let choices = [correct];
  
  // Générer des choix plus simples et plus distincts pour les enfants
  while (choices.length < 3) {
    // Créer des mauvaises réponses qui ne sont pas trop proches du résultat correct
    let wrong = getRandomInt(Math.max(0, correct - 5), correct + 5);
    if (wrong !== correct && !choices.includes(wrong)) {
      choices.push(wrong);
    }
  }
  // Shuffle
  choices = choices.sort(() => Math.random() - 0.5);
  return { a, b, correct, choices };
}

const GAME_SLUG = "james-hibou";

export default function JamesLeHibouGame() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState("START"); // START, TUTORIAL, LEVEL_SELECT, GAME, GAME_OVER
  const [tutorialStep, setTutorialStep] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [highscore, setHighscore] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [jamesSpeech, setJamesSpeech] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [resettingScore, setResettingScore] = useState(false);
  
  const timerRef = useRef(null);
  const lastTickRef = useRef(Date.now());

  // Récupérer le meilleur score utilisateur
  useEffect(() => {
    fetch(`/api/scores?gameSlug=${GAME_SLUG}`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.highscore === "number") setHighscore(data.highscore);
      });
  }, []);

  // Réinitialiser le jeu pour un nouveau niveau
  const startGame = (level) => {
    setDifficulty(level);
    setQuestion(generateQuestion(level));
    setScore(0);
    setSelected(null);
    setFeedback("");
    setShowNext(false);
    setEmoji("");
    setQuestionCount(1);
    setShowConfetti(false);
    setTimer(DIFFICULTY_LEVELS[level].initialTime);
    setWrongCount(0);
    setGameState("GAME");
    setIsRunning(true);
    
    // Message initial de James
    setJamesSpeech("Bonne chance ! Je suis sûr que tu vas réussir !");
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3000);
  };

  // Enregistrer le score périodiquement
  useEffect(() => {
    if (score > 0 && showNext && questionCount % 10 === 1 && !saving && gameState === "GAME") {
      setSaving(true);
      fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, gameSlug: GAME_SLUG })
      })
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.highscore === "number") setHighscore(data.highscore);
        })
        .finally(() => setSaving(false));
    }
  }, [score, showNext, questionCount, saving, gameState]);

  // Gérer la sélection d'une réponse
  useEffect(() => {
    if (selected !== null && gameState === "GAME") {
      if (selected === question.correct) {
        setFeedback("Bravo !");
        setEmoji("🎉");
        setScore((s) => s + 1);
        setShowConfetti(true);
        setShowNext(true);
        
        // James parle - messages plus simples et enthousiastes
        const bonnesReponses = [
          "Super ! Tu as trouvé !",
          "Bravo, c'est la bonne réponse !",
          "Tu es très fort(e) !",
          "Hourra ! Continue comme ça !",
          "Excellent travail !"
        ];
        setJamesSpeech(bonnesReponses[Math.floor(Math.random() * bonnesReponses.length)]);
        setShowBubble(true);
        
        setTimeout(() => {
          setQuestion(generateQuestion(difficulty));
          setSelected(null);
          setFeedback("");
          setShowNext(false);
          setEmoji("");
          setShowConfetti(false);
          setQuestionCount((c) => c + 1);
          setShowBubble(false);
        }, 2000); // Temps légèrement plus long pour que les enfants profitent du feedback positif
      } else {
        setFeedback("Essaie encore");
        setEmoji("😊");
        setWrongCount((w) => w + 1);
        
        // James parle - messages encourageants
        const encouragements = [
          "Ce n'est pas ça, mais tu vas y arriver !",
          "Essaie encore, je sais que tu peux le faire !",
          "Pas tout à fait... Regarde bien les nombres !",
          "Continue d'essayer !"
        ];
        setJamesSpeech(encouragements[Math.floor(Math.random() * encouragements.length)]);
        setShowBubble(true);
        
        setTimeout(() => {
          setSelected(null);
          setFeedback("");
          setEmoji("");
          setShowBubble(false);
        }, 2000);
      }
    }
  }, [selected, question?.correct, gameState, difficulty]);

  // Ajout de 10s à chaque bonne réponse
  useEffect(() => {
    if (selected !== null && question && selected === question.correct && gameState === "GAME") {
      setTimer((t) => t + 10);
    }
  }, [selected, question, gameState]);

  // Game over si 3 erreurs
  useEffect(() => {
    if (wrongCount >= 3 && gameState === "GAME") {
      setGameState("GAME_OVER");
      setIsRunning(false);
      
      // James est triste mais encourageant
      setJamesSpeech("Oh ! On va réessayer ensemble ! Tu vas y arriver !");
      setShowBubble(true);
    }
  }, [wrongCount, gameState]);

  // Gestion du timer avec précision
  useEffect(() => {
    if (isRunning && gameState === "GAME") {
      const timeDecreaseRate = DIFFICULTY_LEVELS[difficulty]?.timeDecrease || 1;
      
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const deltaTime = (now - lastTickRef.current) / 1000; // en secondes
        lastTickRef.current = now;
        
        setTimer((t) => {
          const newTime = t - (deltaTime * timeDecreaseRate);
          if (newTime <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setGameState("GAME_OVER");
            setJamesSpeech("Le temps est fini ! Tu as bien joué !");
            setShowBubble(true);
            return 0;
          }
          return newTime;
        });
      }, 100); // mise à jour plus fréquente pour plus de précision
      
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [isRunning, gameState, difficulty]);

  // Enregistrer le score à la fin de la partie
  useEffect(() => {
    if (gameState === "GAME_OVER" && score > 0 && !saving) {
      setSaving(true);
      fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, gameSlug: GAME_SLUG })
      })
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.highscore === "number") setHighscore(data.highscore);
        })
        .finally(() => setSaving(false));
    }
  }, [gameState, score, saving]);

  // Formatage du temps mm:ss.ms
  const formatTime = (t) => {
    const min = Math.floor(t / 60).toString().padStart(2, '0');
    const sec = Math.floor(t % 60).toString().padStart(2, '0');
    const ms = Math.floor((t % 1) * 10);
    return `${min}:${sec}.${ms}`;
  };

  const handleChoice = (choice) => {
    if (selected === null && gameState === "GAME") setSelected(choice);
  };

  const resetHighscore = () => {
    if (resettingScore) return;
    
    setResettingScore(true);
    fetch(`/api/scores/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameSlug: GAME_SLUG })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHighscore(0);
          setJamesSpeech("Ton meilleur score a été remis à zéro !");
          setShowBubble(true);
          setTimeout(() => setShowBubble(false), 3000);
        }
      })
      .finally(() => setResettingScore(false));
  };

  // Rendu des différentes parties du jeu
  const renderStartScreen = () => (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-4 border-blue-400">
      <div className="mb-4 animate-bounce-slow">
        <Image src="/images/owl.webp" alt="James le hibou" width={180} height={180} className="drop-shadow-xl" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-4 text-center">Joue avec James !</h1>
      <p className="text-xl text-gray-700 mb-8 text-center">Apprends les additions en t'amusant !</p>
      
      <div className="flex flex-col gap-6 w-full">
        <button 
          onClick={() => setGameState("TUTORIAL")} 
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold rounded-xl shadow-lg transition-all border-4 border-blue-600"
        >
          Comment jouer
        </button>
        <button 
          onClick={() => setGameState("LEVEL_SELECT")} 
          className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-xl shadow-lg transition-all border-4 border-green-600"
        >
          Jouer
        </button>
        {highscore > 0 && (
          <div className="mt-4 text-center">
            <p className="text-xl text-blue-600 mb-3">Ton meilleur score : <span className="font-bold text-2xl">{highscore}</span></p>
            <button 
              onClick={resetHighscore} 
              className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-full text-lg"
              disabled={resettingScore}
            >
              {resettingScore ? "Réinitialisation..." : "Recommencer à zéro"}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderTutorialScreen = () => (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-4 border-yellow-400">
      <div className="mb-6">
        <Image 
          src={TUTORIAL_STEPS[tutorialStep].image} 
          alt="Tutoriel" 
          width={150} 
          height={150} 
          className="drop-shadow-xl" 
        />
      </div>
      <h2 className="text-3xl font-bold text-amber-600 mb-4">{TUTORIAL_STEPS[tutorialStep].title}</h2>
      <p className="text-xl text-gray-700 mb-8 text-center">{TUTORIAL_STEPS[tutorialStep].content}</p>
      
      <div className="flex justify-between w-full">
        <button 
          onClick={() => tutorialStep > 0 ? setTutorialStep(tutorialStep - 1) : setGameState("START")}
          className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold rounded-xl border-4 border-gray-400"
        >
          {tutorialStep > 0 ? "Précédent" : "Retour"}
        </button>
        
        <button 
          onClick={() => tutorialStep < TUTORIAL_STEPS.length - 1 ? setTutorialStep(tutorialStep + 1) : setGameState("LEVEL_SELECT")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-xl border-4 border-blue-600"
        >
          {tutorialStep < TUTORIAL_STEPS.length - 1 ? "Suivant" : "Choisir un niveau"}
        </button>
      </div>
    </div>
  );

  const renderLevelSelectScreen = () => (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-4 border-purple-400">
      <div className="mb-6">
        <Image src="/images/owl.webp" alt="James le hibou" width={150} height={150} className="drop-shadow-xl" />
      </div>
      <h2 className="text-3xl font-bold text-amber-600 mb-6">Choisis ton niveau</h2>
      
      <div className="grid grid-cols-1 gap-6 w-full mb-8">
        {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
          <button
            key={key}
            onClick={() => startGame(key)}
            className={`w-full py-5 px-6 rounded-xl text-xl font-bold transition-all border-4 shadow-lg
              ${level.color === "green" ? "bg-green-100 border-green-500 text-green-800 hover:bg-green-200" : 
                level.color === "yellow" ? "bg-yellow-100 border-yellow-500 text-yellow-800 hover:bg-yellow-200" :
                "bg-red-100 border-red-500 text-red-800 hover:bg-red-200"}`}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl">{level.label}</span>
              <span className="text-lg font-normal mt-1">{level.description}</span>
            </div>
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => setGameState("START")}
        className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold rounded-xl border-4 border-gray-400"
      >
        Retour
      </button>
    </div>
  );

  const renderGameScreen = () => (
    <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6 items-center">
      {/* Zone de jeu */}
      <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center animate-fadeInUp border-4 border-blue-400">
        <div className="flex justify-between w-full mb-4">
          <div className="text-2xl text-gray-600">Score : <span className="font-bold text-amber-600">{score}</span></div>
          <div className="text-2xl text-blue-600">Record : <span className="font-bold">{highscore}</span></div>
        </div>
        
        <div className="w-full bg-gray-200 h-8 rounded-full mb-6 overflow-hidden border-2 border-blue-300">
          <div 
            className={`h-full rounded-full ${
              timer > DIFFICULTY_LEVELS[difficulty].initialTime * 0.6 ? 'bg-green-500' : 
              timer > DIFFICULTY_LEVELS[difficulty].initialTime * 0.3 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${(timer / DIFFICULTY_LEVELS[difficulty].initialTime) * 100}%` }}
          ></div>
        </div>
        
        <div className="text-3xl text-purple-600 mb-6 font-bold">⏱️ Temps : {formatTime(timer)}</div>
        
        <div className="text-5xl font-bold text-blue-700 mb-8 p-8 bg-blue-100 rounded-xl shadow-inner w-full text-center border-4 border-dashed border-blue-300">
          {question.a} + {question.b} = ?
        </div>
        
        <div className="grid grid-cols-1 gap-6 w-full mb-6">
          {question.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(choice)}
              disabled={selected !== null}
              className={`w-full py-6 rounded-xl text-4xl font-bold transition-all border-4 shadow-lg
                ${selected === choice
                  ? choice === question.correct
                    ? "bg-green-300 border-green-500 text-green-900 animate-correct"
                    : "bg-red-200 border-red-400 text-red-700 animate-wrong"
                  : "bg-blue-100 border-blue-300 text-blue-900 hover:bg-blue-200 hover:border-blue-500 hover:scale-105 active:scale-95"}`}
            >
              {choice}
            </button>
          ))}
        </div>
        
        {feedback && (
          <div className="text-3xl font-bold mb-4 flex items-center justify-center gap-3 animate-fadeInUp">
            <span>{feedback}</span> <span className="text-4xl">{emoji}</span>
          </div>
        )}
        
        <div className="text-xl text-gray-600 mt-2">Question {questionCount} | Erreurs : {wrongCount}/3</div>
      </div>
      
      {/* Zone de James */}
      <div className="w-full md:w-1/3 flex flex-col items-center relative">
        {showBubble && (
          <div className="speech-bubble bg-yellow-100 p-6 rounded-3xl shadow-lg mb-6 relative border-4 border-yellow-300">
            <p className="text-2xl font-bold text-amber-800">{jamesSpeech}</p>
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-100 rotate-45 border-b-4 border-r-4 border-yellow-300"></div>
          </div>
        )}
        
        <div className="animate-bounce-slow">
          <Image 
            src="/images/owl.webp" 
            alt="James le hibou" 
            width={220} 
            height={220} 
            className="drop-shadow-xl"
          />
        </div>
        
        <button
          onClick={() => setGameState("START")}
          className="mt-6 px-8 py-3 bg-red-400 hover:bg-red-500 text-white text-xl font-bold rounded-full shadow-lg transition-all border-4 border-red-500"
        >
          Arrêter
        </button>
      </div>
    </div>
  );

  const renderGameOverScreen = () => (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-4 border-purple-400">
      <div className="mb-6">
        <Image src="/images/owl.webp" alt="James le hibou" width={150} height={150} className="drop-shadow-xl" />
      </div>
      
      {showBubble && (
        <div className="speech-bubble bg-yellow-100 p-6 rounded-3xl shadow-lg mb-6 relative border-4 border-yellow-300">
          <p className="text-2xl font-bold text-amber-800">{jamesSpeech}</p>
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-100 rotate-45 border-b-4 border-r-4 border-yellow-300"></div>
        </div>
      )}
      
      <h2 className="text-3xl font-bold text-amber-600 mb-4">Partie terminée !</h2>
      <div className="text-2xl text-purple-600 mb-6">
        {wrongCount >= 3 ? "3 erreurs, c'est fini !" : "Le temps est écoulé !"}
      </div>
      
      <div className="bg-blue-100 p-6 rounded-xl w-full mb-8 border-4 border-blue-300">
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-blue-700">Score final : {score}</p>
          {score > highscore && (
            <p className="text-2xl text-green-600 mt-2">Nouveau record ! 🎉</p>
          )}
        </div>
        
        <div className="flex justify-between text-xl">
          <div>Niveau : <span className="font-bold">{DIFFICULTY_LEVELS[difficulty].label}</span></div>
          <div>Meilleur : <span className="font-bold">{highscore}</span></div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={() => startGame(difficulty)}
          className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg transition-all border-4 border-green-600"
        >
          Rejouer (même niveau)
        </button>
        <button
          onClick={() => setGameState("LEVEL_SELECT")}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-xl shadow-lg transition-all border-4 border-blue-600"
        >
          Changer de niveau
        </button>
        <button
          onClick={() => setGameState("START")}
          className="w-full py-4 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold rounded-xl shadow-lg transition-all border-4 border-gray-400"
        >
          Menu principal
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-green-100 p-4 pt-25 overflow-hidden relative">
      {/* Décorations adaptées aux enfants */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="cloud absolute top-[8%] left-[18%] w-32 h-20 bg-white rounded-full opacity-60 animate-float-slow" />
        <div className="cloud absolute top-[12%] left-[65%] w-40 h-24 bg-white rounded-full opacity-50 animate-float-slow2" />
        <div className="cloud absolute bottom-[18%] right-[25%] w-36 h-22 bg-white rounded-full opacity-55 animate-float-slow" />
        <div className="floating-star absolute left-[20%] top-[40%] text-5xl animate-bounce">✨</div>
        <div className="floating-star absolute left-[80%] top-[30%] text-4xl animate-bounce-slow">⭐</div>
        <div className="floating-star absolute left-[60%] top-[80%] text-4xl animate-bounce">✨</div>
        <div className="floating-star absolute right-[25%] top-[55%] text-5xl animate-bounce-slow">🌟</div>
        <div className="floating-star absolute left-[35%] bottom-[15%] text-4xl animate-bounce">⭐</div>
      </div>
      
      {/* Confettis animés */}
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <span className="text-7xl animate-bounce">🎊</span>
          <span className="text-7xl animate-bounce-slow">🎉</span>
          <span className="text-7xl animate-bounce">✨</span>
          <span className="text-7xl animate-bounce-slow">🌟</span>
        </div>
      )}
      
      {/* Contenu principal */}
      {gameState === "START" && renderStartScreen()}
      {gameState === "TUTORIAL" && renderTutorialScreen()}
      {gameState === "LEVEL_SELECT" && renderLevelSelectScreen()}
      {gameState === "GAME" && question && renderGameScreen()}
      {gameState === "GAME_OVER" && renderGameOverScreen()}
      
      {/* Styles globaux adaptés aux enfants */}
      <style jsx global>{`
       
      `}</style>
    </div>
  );
}