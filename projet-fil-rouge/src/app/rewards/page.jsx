'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RewardsGallery() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReward, setSelectedReward] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Charger les récompenses de l'utilisateur
    fetch('/api/rewards', {
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) {
          router.push('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.rewards) {
          setRewards(data.rewards);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur de chargement des récompenses:", err);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-100 pt-28 pb-16 flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 border-4 border-yellow-300">
          <h1 className="text-3xl font-bold mb-8 text-center text-yellow-600">
            Chargement de tes trésors...
          </h1>
          <div className="flex justify-center space-x-4">
            <div className="animate-bounce w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center transform rotate-12">
              <span className="text-2xl">🏆</span>
            </div>
            <div className="animate-bounce animation-delay-300 w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center transform -rotate-6">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="animate-bounce animation-delay-600 w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center transform rotate-6">
              <span className="text-xl">🎖️</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-100 pt-28 pb-16 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-40 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute top-60 right-10 w-32 h-32 bg-amber-300 rounded-full opacity-20 animate-pulse-very-slow"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
      
      {/* Étoiles décoratives */}
      <div className="absolute top-32 right-[20%] text-yellow-400 text-3xl transform rotate-12 animate-float-slow">⭐</div>
      <div className="absolute bottom-40 left-[30%] text-amber-400 text-2xl transform -rotate-12 animate-float-slow animation-delay-500">✨</div>
      <div className="absolute top-72 left-[15%] text-orange-400 text-2xl transform rotate-6 animate-float-slow animation-delay-700">🌟</div>
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Titre principal */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-600 mb-3 transform -rotate-1">
            ✨ Mon Trésor de Récompenses ✨
          </h1>
          <p className="text-2xl text-amber-700 font-bold">
            Regarde tous les trésors que tu as gagnés !
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-yellow-300 p-8">
          {rewards.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <Image 
                  src="/images/treasure-chest-empty.png" 
                  alt="Coffre au trésor vide"
                  width={128}
                  height={128}
                  className="object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://api.dicebear.com/7.x/icons/svg?seed=treasure";
                  }}
                />
              </div>
              <h2 className="text-3xl font-bold text-amber-600 mb-4">Ton coffre est vide !</h2>
              <p className="text-xl text-gray-600 mb-4">Tu n'as pas encore de récompenses dans ta collection.</p>
              <p className="text-lg text-gray-600 mb-8">Joue aux jeux et gagne des points pour remplir ton coffre au trésor !</p>
              <button 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse-slow"
                onClick={() => router.push('/games')}
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">🎮</span>
                  Partir à l'aventure !
                </span>
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-center text-amber-600 mb-8 transform -rotate-1">
                🏆 Tes Super Récompenses 🏆
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <div 
                    key={reward._id} 
                    className="bg-gradient-to-b from-amber-50 to-yellow-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-yellow-200"
                    onClick={() => setSelectedReward(reward)}
                  >
                    <div className="relative h-48">
                      <div className="absolute inset-0 bg-yellow-300 opacity-20 animate-pulse-very-slow"></div>
                      <Image 
                        src={reward.imageUrl} 
                        alt={`Récompense ${reward.milestone}`}
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute top-2 right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl shadow-md transform rotate-12">
                        ⭐
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-xl text-amber-700">{reward.title || `Niveau ${reward.milestone}`}</h3>
                      <p className="text-amber-600 mt-1 font-medium">Obtenu le {new Date(reward.generatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Message d'encouragement */}
        <div className="mt-8 text-center">
          <p className="text-xl text-amber-600 font-bold animate-float-slow">
            ✨ Continue à jouer pour gagner encore plus de trésors ! ✨
          </p>
        </div>
      </div>

      {/* Modal pour afficher une récompense en grand */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"></div>
          <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden border-4 border-yellow-300 shadow-2xl transform scale-100 transition-all duration-300 animate-float-slow">
            {/* Éléments décoratifs du modal */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-300 rounded-full opacity-30 animate-pulse-slow"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-amber-300 rounded-full opacity-30 animate-pulse-very-slow"></div>
            
            <div className="relative h-80 bg-gradient-to-b from-yellow-200 to-amber-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative p-6">
                  <Image 
                    src={selectedReward.imageUrl} 
                    alt={`Récompense ${selectedReward.milestone}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Stars decoration */}
              <div className="absolute top-6 left-6 text-yellow-400 text-2xl animate-pulse-slow">✨</div>
              <div className="absolute bottom-6 right-6 text-amber-400 text-2xl animate-pulse-very-slow">⭐</div>
            </div>
            
            <div className="p-6 bg-gradient-to-b from-white to-amber-50">
              <h2 className="text-2xl font-bold text-amber-700 mb-2">{selectedReward.title}</h2>
              <p className="text-lg text-gray-700 mt-2">{selectedReward.description}</p>
              <div className="mt-6 flex justify-center">
                <button 
                  className="bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedReward(null)}
                >
                  <span className="flex items-center">
                    <span className="mr-2">👍</span>
                    Super !
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}