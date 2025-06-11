"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const GAME_SLUG = "james-hibou";

export default function JamesLeHibouGame() {
  const { t } = useTranslation();

  // Constantes pour les niveaux de difficulté adaptés aux enfants (traduction dynamique)
  const DIFFICULTY_LEVELS = {
    EASY: {
      label: t("james.difficulty.easy"),
      description: t("james.difficulty.easyDesc"),
      timeDecrease: 0.3,
      initialTime: 120,
      color: "green",
      maxNum: 5
    },
    MEDIUM: {
      label: t("james.difficulty.medium"),
      description: t("james.difficulty.mediumDesc"),
      timeDecrease: 0.5,
      initialTime: 90,
      color: "yellow",
      maxNum: 10
    },
    HARD: {
      label: t("james.difficulty.hard"),
      description: t("james.difficulty.hardDesc"),
      timeDecrease: 0.8,
      initialTime: 60,
      color: "red",
      maxNum: 15
    }
  };

  // Tutoriel traduit dynamiquement
  const TUTORIAL_STEPS = [
    {
      title: t("james.tuto.hello"),
      content: t("james.tuto.intro"),
      image: "/images/owl.webp"
    },
    {
      title: t("james.tuto.how"),
      content: t("james.tuto.howDesc"),
      image: "/images/owl.webp"
    },
    {
      title: t("james.tuto.time"),
      content: t("james.tuto.timeDesc"),
      image: "/images/owl.webp"
    }
  ];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateQuestion(level) {
    const maxNum = DIFFICULTY_LEVELS[level].maxNum;
    const a = getRandomInt(0, maxNum);
    const b = getRandomInt(0, maxNum);
    const correct = a + b;
    let choices = [correct];
    while (choices.length < 3) {
      let wrong = getRandomInt(Math.max(0, correct - 5), correct + 5);
      if (wrong !== correct && !choices.includes(wrong)) {
        choices.push(wrong);
      }
    }
    choices = choices.sort(() => Math.random() - 0.5);
    return { a, b, correct, choices };
  }

  const [gameState, setGameState] = useState("START");
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

  useEffect(() => {
    fetch(`/api/scores?gameSlug=${GAME_SLUG}`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.highscore === "number") setHighscore(data.highscore);
      });
  }, []);

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
    setJamesSpeech(t("james.startMessage"));
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3000);
  };

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

  useEffect(() => {
    if (selected !== null && gameState === "GAME") {
      if (selected === question.correct) {
        setFeedback(t("james.feedback.success"));
        setEmoji("🎉");
        setScore((s) => s + 1);
        setShowConfetti(true);
        setShowNext(true);

        const bonnesReponses = [
          t("james.speech.success1"),
          t("james.speech.success2"),
          t("james.speech.success3"),
          t("james.speech.success4"),
          t("james.speech.success5")
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
        }, 2000);
      } else {
        setFeedback(t("james.feedback.tryAgain"));
        setEmoji("😊");
        setWrongCount((w) => w + 1);

        const encouragements = [
          t("james.speech.fail1"),
          t("james.speech.fail2"),
          t("james.speech.fail3"),
          t("james.speech.fail4")
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
  }, [selected, question?.correct, gameState, difficulty, t]);

  useEffect(() => {
    if (selected !== null && question && selected === question.correct && gameState === "GAME") {
      setTimer((t) => t + 10);
    }
  }, [selected, question, gameState]);

  useEffect(() => {
    if (wrongCount >= 3 && gameState === "GAME") {
      setGameState("GAME_OVER");
      setIsRunning(false);
      setJamesSpeech(t("james.speech.gameOver"));
      setShowBubble(true);
    }
  }, [wrongCount, gameState, t]);

  useEffect(() => {
    if (isRunning && gameState === "GAME") {
      const timeDecreaseRate = DIFFICULTY_LEVELS[difficulty]?.timeDecrease || 1;
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const deltaTime = (now - lastTickRef.current) / 1000;
        lastTickRef.current = now;
        setTimer((t) => {
          const newTime = t - (deltaTime * timeDecreaseRate);
          if (newTime <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setGameState("GAME_OVER");
            setJamesSpeech(t("james.speech.timeUp"));
            setShowBubble(true);
            return 0;
          }
          return newTime;
        });
      }, 100);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [isRunning, gameState, difficulty, t]);

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
          setJamesSpeech(t("james.speech.resetScore"));
          setShowBubble(true);
          setTimeout(() => setShowBubble(false), 3000);
        }
      })
      .finally(() => setResettingScore(false));
  };

  // Rendu des différentes parties du jeu
  const renderStartScreen = () => (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-4 border-blue-400 mt-24">
      <div className="mb-4 animate-bounce-slow">
        <Image src="/images/owl.webp" alt="James le hibou" width={180} height={180} className="drop-shadow-xl" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-4 text-center">{t("james.title")}</h1>
      <p className="text-xl text-gray-700 mb-8 text-center">{t("james.subtitle")}</p>
      <div className="flex flex-col gap-6 w-full">
        <button 
          onClick={() => setGameState("TUTORIAL")} 
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold rounded-xl shadow-lg transition-all border-4 border-blue-600"
        >
          {t("james.howToPlay")}
        </button>
        <button 
          onClick={() => setGameState("LEVEL_SELECT")} 
          className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-xl shadow-lg transition-all border-4 border-green-600"
        >
          {t("james.play")}
        </button>
        {highscore > 0 && (
          <div className="mt-4 text-center">
            <p className="text-xl text-blue-600 mb-3">{t("james.highscore")} : <span className="font-bold text-2xl">{highscore}</span></p>
            <button 
              onClick={resetHighscore} 
              className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-full text-lg"
              disabled={resettingScore}
            >
              {resettingScore ? t("james.resetting") : t("james.reset")}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderTutorialScreen = () => (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-4 border-yellow-400 mt-24">
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
          {tutorialStep > 0 ? t("james.prev") : t("james.back")}
        </button>
        <button 
          onClick={() => tutorialStep < TUTORIAL_STEPS.length - 1 ? setTutorialStep(tutorialStep + 1) : setGameState("LEVEL_SELECT")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-xl border-4 border-blue-600"
        >
          {tutorialStep < TUTORIAL_STEPS.length - 1 ? t("james.next") : t("james.chooseLevel")}
        </button>
      </div>
    </div>
  );

  const renderLevelSelectScreen = () => (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-4 border-purple-400 mt-24">
      <div className="mb-6">
        <Image src="/images/owl.webp" alt="James le hibou" width={150} height={150} className="drop-shadow-xl" />
      </div>
      <h2 className="text-3xl font-bold text-amber-600 mb-6">{t("james.chooseLevel")}</h2>
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
        {t("james.back")}
      </button>
    </div>
  );

  const renderGameScreen = () => (
    <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6 items-center mt-24">
      <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center animate-fadeInUp border-4 border-blue-400">
        <div className="flex justify-between w-full mb-4">
          <div className="text-2xl text-gray-600">{t("james.score")} : <span className="font-bold text-amber-600">{score}</span></div>
          <div className="text-2xl text-blue-600">{t("james.record")} : <span className="font-bold">{highscore}</span></div>
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
        <div className="text-3xl text-purple-600 mb-6 font-bold">⏱️ {t("james.time")} : {formatTime(timer)}</div>
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
        <div className="text-xl text-gray-600 mt-2">{t("james.question")} {questionCount} | {t("james.errors")} : {wrongCount}/3</div>
      </div>
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
          {t("james.stop")}
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
      <h2 className="text-3xl font-bold text-amber-600 mb-4">{t("james.gameOver")}</h2>
      <div className="text-2xl text-purple-600 mb-6">
        {wrongCount >= 3 ? t("james.tooManyErrors") : t("james.timeIsUp")}
      </div>
      <div className="bg-blue-100 p-6 rounded-xl w-full mb-8 border-4 border-blue-300">
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-blue-700">{t("james.finalScore")} : {score}</p>
          {score > highscore && (
            <p className="text-2xl text-green-600 mt-2">{t("james.newRecord")} 🎉</p>
          )}
        </div>
        <div className="flex justify-between text-xl">
          <div>{t("james.level")} : <span className="font-bold">{DIFFICULTY_LEVELS[difficulty].label}</span></div>
          <div>{t("james.best")} : <span className="font-bold">{highscore}</span></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={() => startGame(difficulty)}
          className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg transition-all border-4 border-green-600"
        >
          {t("james.playAgain")}
        </button>
        <button
          onClick={() => setGameState("LEVEL_SELECT")}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-xl shadow-lg transition-all border-4 border-blue-600"
        >
          {t("james.changeLevel")}
        </button>
        <button
          onClick={() => setGameState("START")}
          className="w-full py-4 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold rounded-xl shadow-lg transition-all border-4 border-gray-400"
        >
          {t("james.mainMenu")}
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
      <style jsx global>{``}</style>
    </div>
  );
}