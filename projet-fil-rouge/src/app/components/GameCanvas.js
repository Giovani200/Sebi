"use client";
import { useRef, useEffect, useState } from "react";
import useGame from "../../hooks/useGame";
import GameTutorial from "./GameTutorial";
import RewardNotification from "./RewardNotification";
import Image from "next/image";

export default function GameCanvas() {
  // Référence au canvas
  const canvasRef = useRef(null);

  // Hook principal du jeu
  const {
    score, highScore, isGameOver, isGameReady,
    jump, reset, nightMode, showTutorial, closeTutorial, rewardUnlocked,
    resetHighScore
  } = useGame(canvasRef);

  // State pour l'interface du jeu
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    function updateSize() {
      const { innerWidth, innerHeight } = window;
      setDimensions({
        width: innerWidth,
        height: innerHeight
      });
    }

    updateSize();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateSize();
        if (!isGameOver) {
          setTimeout(() => reset(), 200);
        }
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isGameOver, reset]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" || e.key === " ") {
        if (document.activeElement.tagName !== "INPUT" &&
          document.activeElement.tagName !== "TEXTAREA") {
          e.preventDefault();
          jump();
          setAnimateButton(true);
          setTimeout(() => setAnimateButton(false), 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [jump, isGameReady, isGameOver]);

  const handleJump = () => {
    jump();
    setAnimateButton(true);
    setTimeout(() => setAnimateButton(false), 300);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen max-w-full pt-23">
      <div className="relative w-full h-full flex-1 flex items-center justify-center overflow-hidden">
        {/* Fond d'écran décoratif doux reprenant le style du site */}
        <div className="absolute inset-0 bg-[#fdf2dd] z-0 pointer-events-none">
          {/* Éléments décoratifs subtils */}
          <div className="absolute top-[10%] left-[20%] w-24 h-24 bg-orange-100/30 rounded-full"></div>
          <div className="absolute bottom-[20%] right-[10%] w-32 h-32 bg-yellow-100/30 rounded-full"></div>
          <div className="absolute top-[30%] right-[30%] text-4xl animate-float-slow opacity-50">✨</div>
          <div className="absolute bottom-[40%] left-[15%] text-4xl animate-float-slow animation-delay-500 opacity-50">⭐</div>
          
          {/* Étoiles supplémentaires comme dans le footer */}
          <div className="absolute top-[15%] right-[15%] text-xl animate-float-slow opacity-40">⭐</div>
          <div className="absolute bottom-[15%] left-[25%] text-xl animate-float-slow animation-delay-300 opacity-40">✨</div>
          <div className="absolute top-[60%] right-[45%] text-2xl animate-float-slow animation-delay-700 opacity-30">⭐</div>
        </div>

        {/* Canvas de jeu avec couleurs douces */}
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className={`w-full h-full border-0 ${nightMode
            ? 'bg-gradient-to-b from-indigo-800/70 to-purple-800/70'
            : 'bg-gradient-to-b from-orange-100/80 to-amber-200/80'} 
            shadow-md transition-colors duration-500 rounded-2xl z-10`}
          tabIndex={0}
          onKeyDown={e => {
            if (e.code === "Space") {
              handleJump();
            }
          }}
          onClick={(e) => {
            handleJump();
            e.currentTarget.focus();
          }}
          onTouchStart={(e) => {
            handleJump();
            e.currentTarget.focus();
          }}
          style={{ outline: 'none' }}
        />

        {/* Écran de démarrage */}
        {!isGameReady && !isGameOver && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fdf2dd]/95 text-gray-800 rounded-2xl z-20">
            <div className="relative w-32 h-32 mb-4 animate-bounce-slow">
              <Image
                src="/images/SEBI.png"
                alt="Sebi la gazelle"
                fill
                className="object-contain"
              />
            </div>

            <div className="text-5xl font-extrabold mb-6 drop-shadow-md text-orange-600">
              Sebi Runner
            </div>

            <div className="bg-white/90 rounded-xl p-6 max-w-md mb-8 transform -rotate-1 shadow-sm border border-orange-200">
              <div className="text-2xl mb-4 text-center font-bold text-orange-500">
                Aide Sebi à sauter par-dessus les obstacles !
              </div>
              <div className="flex items-center justify-center space-x-8 text-lg text-gray-700 mt-6">
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-2">⬆️</span>
                  <span>Sauter</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-2">⭐</span>
                  <span>Collecter</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-2">🌵</span>
                  <span>Éviter</span>
                </div>
              </div>
            </div>

            <button
              className="bg-gradient-to-r from-orange-200 to-amber-300 hover:from-orange-300 hover:to-amber-400 
                         px-10 py-5 rounded-full font-bold text-2xl shadow-sm transition-all duration-300 
                         hover:scale-105 border border-orange-200 text-orange-800"
              onClick={() => {
                setTimeout(() => {
                  reset();
                }, 100);
              }}
            >
              <span className="flex items-center">
                <span className="mr-2">🎮</span>
                Commencer l&apos;aventure !
              </span>
            </button>

            <div className="text-lg mt-8 text-gray-700 font-medium bg-white/60 px-6 py-3 rounded-full shadow-sm">
              Appuie sur <span className="font-bold">Espace</span> ou <span className="font-bold">Clique</span> pour sauter
            </div>
          </div>
        )}

        {/* Écran de Game Over */}
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fdf2dd]/95 text-gray-800 rounded-2xl z-20">
            <div className="text-4xl font-extrabold mb-6 drop-shadow-md text-orange-600">Partie terminée</div>

            <div className="bg-white/90 rounded-xl p-6 mb-8 transform rotate-1 w-80 shadow-sm border border-orange-200">
              <div className="text-2xl text-center font-bold text-orange-500 mb-2">Ton score</div>
              <div className="text-5xl text-center font-black text-amber-500 mb-2">{score}</div>

              {score >= highScore && score > 0 && (
                <div className="bg-yellow-50 rounded-lg p-3 my-4 border border-yellow-200">
                  <div className="text-xl text-yellow-600 text-center font-bold flex items-center justify-center">
                    <span className="text-2xl mr-2">🏆</span> Nouveau Record !
                  </div>
                </div>
              )}

              <div className="text-lg text-center text-gray-600 mt-2">
                Ton meilleur score: <span className="font-bold">{highScore}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                className="bg-gradient-to-r from-orange-200 to-amber-300 hover:from-orange-300 hover:to-amber-400 
                           px-8 py-4 rounded-full font-bold text-xl shadow-sm transition-all duration-300 
                           hover:scale-105 border border-orange-200 flex items-center text-orange-800"
                onClick={() => {
                  reset();
                }}
              >
                <span className="mr-2">🔄</span>
                Rejouer
              </button>

              <button
                className="bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300
                           px-8 py-4 rounded-full font-bold text-xl shadow-sm transition-all duration-300 
                           hover:scale-105 border border-red-200 flex items-center text-red-700"
                onClick={resetHighScore}
              >
                <span className="mr-2">🗑️</span>
                Effacer record
              </button>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-lg text-gray-700">
              N&apos;abandonne pas, Sebi a besoin de toi !
            </div>
          </div>
        )}

        {/* Tutoriel */}
        {showTutorial && <GameTutorial onClose={closeTutorial} />}

        {/* Compteur de score en haut */}
        <div className="flex justify-between w-full px-8 text-xl font-bold text-gray-800 drop-shadow-md absolute top-4 left-0 z-30">
          <div className="bg-orange-100/80 px-6 py-2 rounded-full border border-orange-200/50 shadow-sm">
            <span>Score: <span className="font-extrabold">{score}</span></span>
          </div>

          <div className="bg-amber-100/80 px-6 py-2 rounded-full border border-amber-200/50 shadow-sm">
            <span>Meilleur: <span className="font-extrabold">{highScore}</span></span>
          </div>

          {nightMode && (
            <div className="bg-indigo-100/80 px-6 py-2 rounded-full border border-indigo-200/50 shadow-sm animate-pulse">
              <span className="flex items-center text-indigo-700"><span className="mr-2">🌙</span> Mode nuit</span>
            </div>
          )}
        </div>
      </div>

      {/* Bouton de saut mobile */}
      <button
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 sm:hidden 
                   bg-gradient-to-r from-orange-200 to-amber-300 hover:from-orange-300 hover:to-amber-400 
                   px-10 py-5 rounded-full font-bold text-xl text-orange-800 shadow-sm border border-orange-200
                   transition-transform ${animateButton ? 'scale-90' : 'scale-100'}`}
        onClick={handleJump}
      >
        <span className="flex items-center">
          <span className="mr-2">⬆️</span>
          Sauter
        </span>
      </button>

      {/* Notification de récompense */}
      {rewardUnlocked && (
        <RewardNotification
          reward={rewardUnlocked}
          onClose={() => setRewardUnlocked(null)}
        />
      )}
    </div>
  );
}