import React from "react";

const GameTutorial = ({ onClose }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white z-50">
      <div className="bg-gradient-to-r from-green-900/90 to-emerald-800/90 p-6 rounded-xl max-w-md mx-auto shadow-2xl border border-emerald-600">
        <h2 className="text-2xl font-extrabold mb-4 text-center text-green-300">Tutoriel - Sebi Runner</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-3xl">
              🏃
            </div>
            <div>
              <h3 className="font-bold text-lg">Sebi le coureur</h3>
              <p className="text-sm text-gray-300">Courez aussi loin que possible pour obtenir le meilleur score!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-3xl">
              🌵
            </div>
            <div>
              <h3 className="font-bold text-lg">Évitez les obstacles</h3>
              <p className="text-sm text-gray-300">Sautez par-dessus les buissons qui se trouvent sur votre chemin</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center text-3xl">
              ⬆️
            </div>
            <div>
              <h3 className="font-bold text-lg">Comment sauter</h3>
              <p className="text-sm text-gray-300">Appuyez sur <span className="bg-white/20 px-2 py-1 rounded">Espace</span>, cliquez sur l'écran ou appuyez sur le bouton "Sauter"</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center text-3xl">
              🔄
            </div>
            <div>
              <h3 className="font-bold text-lg">Double saut</h3>
              <p className="text-sm text-gray-300">Vous pouvez sauter une seconde fois en l'air pour éviter les obstacles difficiles!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-3xl">
              🌙
            </div>
            <div>
              <h3 className="font-bold text-lg">Mode nuit</h3>
              <p className="text-sm text-gray-300">Le jeu passe en mode nuit lorsque vous atteignez des scores élevés!</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg transform transition hover:scale-105"
          >
            Commencer à jouer
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameTutorial;