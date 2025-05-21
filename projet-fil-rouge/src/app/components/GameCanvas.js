"use client";
import { useRef, useEffect, useState } from "react";
// Import relatif sans extension
import useGame from "../../hooks/useGame";
import GameTutorial from "./GameTutorial";

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const {
    state, score, highScore, isGameOver, isGameReady, 
    jump, reset, nightMode, showTutorial, closeTutorial
  } = useGame(canvasRef);
  
  // State pour l'interface du jeu
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  useEffect(() => {
    function updateSize() {
      const { innerWidth, innerHeight } = window;
      setDimensions({
        width: innerWidth,
        height: innerHeight
      });
    }
    
    updateSize();
    
    // Utiliser un debounce pour éviter des appels trop fréquents lors du redimensionnement
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateSize();
        // Assurer que la position de Sebi est mise à jour après redimensionnement
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
  
  // Ajout d'un écouteur global pour les événements clavier (espace)
  useEffect(() => {
    // Gestionnaire d'événements pour les touches du clavier
    const handleKeyPress = (e) => {
      // Vérifier si la touche espace est pressée et que le jeu est prêt
      if (e.code === "Space" || e.key === " ") {
        console.log("Space key pressed globally");
        // Éviter de déclencher le saut si un champ de texte a le focus
        if (document.activeElement.tagName !== "INPUT" && 
            document.activeElement.tagName !== "TEXTAREA") {
          e.preventDefault(); // Empêcher le défilement de la page
          jump();
        }
      }
    };
    
    // Ajouter l'écouteur d'événements au niveau de la fenêtre
    window.addEventListener("keydown", handleKeyPress);
    
    // Nettoyage à la désinstallation du composant
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [jump, isGameReady, isGameOver]); // Dépendances mises à jour

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
            console.log("Canvas keydown:", e.code);
            e.code === "Space" && jump();
          }}
          onClick={(e) => {
            console.log("Canvas clicked");
            jump();
            // Donner le focus au canvas après un clic
            e.currentTarget.focus();
          }}
          onTouchStart={(e) => {
            console.log("Canvas touched");
            jump();
            // Donner le focus au canvas après un toucher
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
                console.log("Commencer clicked, activating game...");
                // Attendre un court instant pour s'assurer que le canvas est correctement dimensionné
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
            
            <div className="flex space-x-4">
              <button
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg"
                onClick={() => {
                  reset();
                }}
              >
                Rejouer
              </button>
            </div>
          </div>
        )}
        {/* Afficher le tutoriel si showTutorial est vrai */}
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
    </div>
  );
}
