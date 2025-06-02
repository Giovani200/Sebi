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
      <div className="page-container">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Chargement de tes récompenses...</h1>
          <div className="flex justify-center">
            <div className="animate-pulse w-10 h-10 bg-green-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Ma Collection de Récompenses</h1>
        
        {rewards.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Tu n'as pas encore de récompenses.</p>
            <p className="text-gray-600">Joue aux jeux et atteins des scores élevés pour en gagner!</p>
            <button 
              className="btn-primary max-w-xs mt-6 mx-auto"
              onClick={() => router.push('/games')}
            >
              Jouer maintenant
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <div 
                key={reward._id} 
                className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedReward(reward)}
              >
                <div className="relative h-40">
                  <Image 
                    src={reward.imageUrl} 
                    alt={`Récompense ${reward.milestone}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold">{reward.title || `Niveau ${reward.milestone}`}</h3>
                  <p className="text-sm text-gray-600">{new Date(reward.generatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal pour afficher une récompense en grand */}
        {selectedReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="max-w-2xl w-full bg-white rounded-lg overflow-hidden">
              <div className="relative h-80">
                <Image 
                  src={selectedReward.imageUrl} 
                  alt={`Récompense ${selectedReward.milestone}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{selectedReward.title}</h2>
                <p className="text-gray-700 mt-2">{selectedReward.description}</p>
                <div className="mt-4 flex justify-end">
                  <button 
                    className="btn-secondary max-w-xs"
                    onClick={() => setSelectedReward(null)}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}