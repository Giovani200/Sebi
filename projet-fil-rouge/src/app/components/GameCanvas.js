"use client";
import { useRef, useEffect, useState } from "react";
import useGame from "../../hooks/useGame";
import GameTutorial from "./GameTutorial";
import RewardNotification from "./RewardNotification";

export default function GameCanvas() {
  // Référence au canvas
  const canvasRef = useRef(null);

  // Hook principal du jeu : une seule déclaration !
  const {
  score, highScore, isGameOver, isGameReady,
  jump, reset, nightMode, showTutorial, closeTutorial, rewardUnlocked,
  resetHighScore  // Ajout de cette nouvelle fonction
} = useGame(canvasRef);

  // State pour l'interface du jeu
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  // const [showLeaderboard, setShowLeaderboard] = useState(false);

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
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [jump, isGameReady, isGameOver]);

  return (
    <div className="flex flex-col items-center w-full h-screen max-w-full">
      <div className="relative w-full h-full flex-1 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className={`w-full h-full border-0 bg-gradient-to-b from-green-800 to-emerald-900 shadow-2xl transition-colors duration-500 rounded-none`}
          tabIndex={0}
          onKeyDown={e => {
            if (e.code === "Space") {
              jump();
            }
          }}
          onClick={(e) => {
            jump();
            e.currentTarget.focus();
          }}
          onTouchStart={(e) => {
            jump();
            e.currentTarget.focus();
          }}
          style={{ outline: 'none' }}
        />
        {!isGameReady && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white">
            <div className="text-4xl font-extrabold mb-6 drop-shadow-lg">Sebi Runner</div>
            <div className="text-xl mb-8 max-w-md text-center">
              Aidez Sebi à éviter les obstacles en sautant au bon moment !
            </div>
            <button
              className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-900 px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-transform hover:scale-105"
              onClick={() => {
                setTimeout(() => {
                  reset();
                }, 100);
              }}
            >
              Commencer
            </button>
            <div className="text-sm mt-8 text-gray-300">
              Appuyez sur <span className="font-bold">Espace</span> ou <span className="font-bold">Cliquez</span> pour sauter
            </div>
          </div>
        )}
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
            <div className="text-3xl font-extrabold mb-2 drop-shadow-lg">Game Over</div>
            <div className="text-xl mb-4">Score: <span className="font-bold">{score}</span></div>
            {score >= highScore && score > 0 && (
              <div className="text-xl text-yellow-300 mb-4 animate-pulse">🏆 Nouveau Record !</div>
            )}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg"
                onClick={() => {
                  reset();
                }}
              >
                Rejouer
              </button>

              {/* Nouveau bouton pour réinitialiser le highscore */}
              <button
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center justify-center"
                onClick={resetHighScore}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Effacer record
              </button>
            </div>
          </div>
        )}
        {showTutorial && <GameTutorial onClose={closeTutorial} />}
      </div>
      <div className="flex justify-between w-full px-8 mt-6 text-xl font-mono text-white drop-shadow-lg absolute top-4 left-0">
        <span>Score: <span className="font-extrabold">{score}</span></span>
        <span>Meilleur: <span className="font-extrabold">{highScore}</span></span>
        {nightMode && <span className="ml-2 text-blue-200 animate-pulse">🌙 Nuit</span>}
      </div>
      <button
        className="fixed bottom-8 left-1/2 -translate-x-1/2 sm:hidden bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-900 px-6 py-3 rounded-full font-bold text-lg text-white shadow-lg"
        onClick={jump}
      >
        Sauter
      </button>
      {rewardUnlocked && (
        <RewardNotification
          reward={rewardUnlocked}
          onClose={() => setRewardUnlocked(null)}
        />
      )}
    </div>
  );
}