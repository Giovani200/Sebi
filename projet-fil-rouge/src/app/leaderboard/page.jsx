'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LeaderboardPage() {
    const [loading, setLoading] = useState(true);
    const [topGlobal, setTopGlobal] = useState([]);
    const [topSebi, setTopSebi] = useState([]);
    const [topJames, setTopJames] = useState([]);
    const [bestByGameSebi, setBestByGameSebi] = useState([]);
    const [sebiPlayers, setSebiPlayers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/leaderboard', {
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
            if (data) {
                setTopGlobal(data.topGlobal || []);
                setTopSebi(data.topSebi || []);
                setTopJames(data.topJames || []);
                setBestByGameSebi(data.bestByGameSebi || []);
                setSebiPlayers(data.sebiPlayers || []);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Erreur de chargement du classement:", err);
            setLoading(false);
        });
    }, [router]);

    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 pt-28 pb-16 flex justify-center items-center">
                <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 border-4 border-orange-200">
                    <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
                        Chargement du classement...
                    </h1>
                    <div className="flex justify-center">
                        <div className="animate-bounce w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center transform rotate-12">
                            <span className="text-3xl">🏆</span>
                        </div>
                        <div className="animate-bounce animation-delay-300 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center ml-4 transform -rotate-6">
                            <span className="text-2xl">⭐</span>
                        </div>
                        <div className="animate-bounce animation-delay-600 w-18 h-18 bg-amber-300 rounded-full flex items-center justify-center ml-4 transform rotate-6">
                            <span className="text-2xl">🎮</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Badges pour les positions
    const getBadge = (position) => {
        switch(position) {
            case 0: return "🥇";
            case 1: return "🥈";
            case 2: return "🥉";
            case 3: return "4️⃣";
            case 4: return "5️⃣";
            default: return `${position + 1}`;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 pt-28 pb-16 relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-40 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute top-60 right-10 w-32 h-32 bg-orange-300 rounded-full opacity-20 animate-pulse-very-slow"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-amber-300 rounded-full opacity-20 animate-pulse"></div>
            
            {/* Étoiles décoratives */}
            <div className="absolute top-32 right-[20%] text-yellow-400 text-3xl transform rotate-12 animate-float-slow">⭐</div>
            <div className="absolute bottom-40 left-[30%] text-orange-400 text-2xl transform -rotate-12 animate-float-slow animation-delay-500">✨</div>
            <div className="absolute top-72 left-[15%] text-amber-400 text-2xl transform rotate-6 animate-float-slow animation-delay-700">⭐</div>
            
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Titre principal */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 mb-3 transform -rotate-1">
                        🏆 Super Champions 🏆
                    </h1>
                    <p className="text-2xl text-orange-700 font-bold">
                        Les meilleurs joueurs toutes catégories
                    </p>
                </div>
                
                {/* PODIUM GLOBAL - TOP 3 TOUS JEUX CONFONDUS */}
                {Array.isArray(topGlobal) && topGlobal.length > 0 && (
                    <div className="mb-12 relative">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl shadow-xl overflow-hidden border-4 border-indigo-300 pb-12 pt-8 px-6">
                            <h2 className="text-3xl font-bold text-white text-center mb-8 transform rotate-1">
                                🌍 Grand Podium Général 🌍
                            </h2>
                            
                            <div className="flex justify-center items-end space-x-6 md:space-x-10">
                                {/* 2ème place */}
                                <div className="flex flex-col items-center order-1 transform hover:scale-105 transition-transform">
                                    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3">
                                        <div className="w-full h-full rounded-full border-4 border-silver shadow-lg overflow-hidden bg-white">
                                            <img 
                                                src={topGlobal[1]?.user?.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=player2"} 
                                                alt={topGlobal[1]?.user?.firstName || "Joueur 2"}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(topGlobal[1]?.user?.firstName || 'player2')}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-silver rounded-full flex items-center justify-center text-2xl shadow-md">
                                            🥈
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-slate-200 to-gray-200 rounded-xl px-5 py-3 text-center shadow-lg transform -rotate-1">
                                        <p className="font-bold text-lg text-gray-800">{topGlobal[1]?.user?.firstName || '---'}</p>
                                        <p className="text-md font-bold text-gray-600">{topGlobal[1]?.totalScore || 0} pts</p>
                                    </div>
                                    <div className="h-24 w-20 bg-gradient-to-b from-silver to-gray-300 rounded-t-xl mt-3 shadow-lg"></div>
                                </div>
                                
                                {/* 1ère place */}
                                <div className="flex flex-col items-center order-2 transform hover:scale-105 transition-transform z-10">
                                    <div className="relative w-28 h-28 md:w-32 md:h-32 mb-3">
                                        <div className="absolute inset-0 bg-yellow-300 rounded-full blur-md opacity-40 animate-pulse-slow"></div>
                                        <div className="relative w-full h-full rounded-full border-4 border-yellow-400 shadow-lg overflow-hidden bg-white">
                                            <img 
                                                src={topGlobal[0]?.user?.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=player1"} 
                                                alt={topGlobal[0]?.user?.firstName || "Joueur 1"}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(topGlobal[0]?.user?.firstName || 'player1')}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-md animate-pulse-very-slow">
                                            🥇
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-200 to-amber-200 rounded-xl px-6 py-4 text-center shadow-lg transform rotate-1">
                                        <p className="font-bold text-xl text-amber-800">{topGlobal[0]?.user?.firstName || '---'}</p>
                                        <p className="text-lg font-bold text-amber-700">{topGlobal[0]?.totalScore || 0} pts</p>
                                    </div>
                                    <div className="h-32 w-24 bg-gradient-to-b from-yellow-400 to-amber-400 rounded-t-xl mt-3 shadow-lg"></div>
                                </div>
                                
                                {/* 3ème place */}
                                <div className="flex flex-col items-center order-3 transform hover:scale-105 transition-transform">
                                    <div className="relative w-18 h-18 md:w-20 md:h-20 mb-3">
                                        <div className="w-full h-full rounded-full border-4 border-amber-600 shadow-lg overflow-hidden bg-white">
                                            <img 
                                                src={topGlobal[2]?.user?.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=player3"} 
                                                alt={topGlobal[2]?.user?.firstName || "Joueur 3"}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(topGlobal[2]?.user?.firstName || 'player3')}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;
                                                }}
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-amber-600 rounded-full flex items-center justify-center text-xl shadow-md">
                                            🥉
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl px-4 py-2 text-center shadow-lg transform -rotate-2">
                                        <p className="font-bold text-base text-amber-800">{topGlobal[2]?.user?.firstName || '---'}</p>
                                        <p className="text-sm font-bold text-amber-700">{topGlobal[2]?.totalScore || 0} pts</p>
                                    </div>
                                    <div className="h-20 w-18 bg-gradient-to-b from-amber-600 to-orange-400 rounded-t-xl mt-3 shadow-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Layout en 2 colonnes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* COLONNE GAUCHE - SEBI */}
                    <div className="space-y-6">
                        {/* PODIUM SEBI - TOP 3 */}
                        {Array.isArray(topSebi) && topSebi.length > 0 && (
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-orange-300 transform rotate-0.5">
                                <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-5 px-6">
                                    <h2 className="text-3xl font-bold text-white text-center transform -rotate-1">
                                        🏆 Top 3 Sebi Runner 🏆
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-col space-y-4">
                                        {topSebi.map((player, index) => (
                                            <div 
                                                key={index}
                                                className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold shadow-md ${
                                                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-400' : 
                                                        index === 1 ? 'bg-gradient-to-r from-slate-300 to-gray-300' : 
                                                        'bg-gradient-to-r from-amber-600 to-orange-400'
                                                    }`}>
                                                        {getBadge(index)}
                                                    </div>
                                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-orange-300 shadow-md">
                                                        <img
                                                            src={player.user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(player.user?.firstName || 'player')}`}
                                                            alt={player.user?.firstName || 'Joueur'}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(player.user?.firstName || 'player')}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-800">{player.user?.firstName || 'Joueur'}</h3>
                                                        <div className="flex space-x-1 text-xs text-gray-500">
                                                            <span>🎮 {player.gamesPlayed || 0} parties</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-full px-5 py-3 font-bold text-lg text-orange-700 shadow-md transform rotate-1">
                                                    {player.bestScore || 0} pts
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Classement Sebi */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-amber-300 transform rotate-0.5">
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-5 px-6">
                                <h2 className="text-3xl font-bold text-white text-center transform -rotate-1">
                                    🏆 Classement Sebi 🏆
                                </h2>
                            </div>
                            <div className="divide-y divide-amber-100">
                                {Array.isArray(sebiPlayers) && sebiPlayers.length > 0 ? (
                                    sebiPlayers.map((player, index) => (
                                        <div 
                                            key={index} 
                                            className="p-4 flex items-center justify-between hover:bg-amber-50 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold shadow-md ${
                                                    index < 3 
                                                        ? 'bg-gradient-to-r ' + (
                                                            index === 0 ? 'from-yellow-400 to-amber-400' : 
                                                            index === 1 ? 'from-slate-300 to-gray-300' : 
                                                            'from-amber-600 to-orange-400'
                                                        )
                                                        : 'bg-gradient-to-r from-amber-400 to-orange-400'
                                                }`}>
                                                    {getBadge(index)}
                                                </div>
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300 shadow-md">
                                                    <img
                                                        src={player.user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(player.user?.firstName || 'player')}`}
                                                        alt={player.user?.firstName || 'Joueur'}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(player.user?.firstName || 'player')}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">{player.user?.firstName || 'Joueur'}</h3>
                                                    <div className="flex space-x-1 text-xs text-gray-500">
                                                        <span>🎮 {player.gamesPlayed || 0} jeux</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-4 py-2 font-bold text-amber-700 shadow-md">
                                                {player.totalScore || 0} pts
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <p className="text-xl text-gray-500 mb-4">Pas encore de scores pour les jeux Sebi !</p>
                                        <p className="text-lg text-amber-600 font-medium">
                                            Commence à jouer aux jeux Sebi pour apparaître dans le classement.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE - JAME */}
                    <div className="space-y-6">
                        {/* PODIUM JAMES - TOP 3 (ou message bientôt disponible) */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-blue-300 transform -rotate-0.5">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 py-5 px-6">
                                <h2 className="text-3xl font-bold text-white text-center transform rotate-1">
                                    🏆 Top 3 James le Hibou 🏆
                                </h2>
                            </div>
                            <div className="p-6">
                                {Array.isArray(topJames) && topJames.length > 0 ? (
                                    <div className="flex flex-col space-y-4">
                                        {topJames.map((player, index) => (
                                            <div 
                                                key={index}
                                                className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold shadow-md ${
                                                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-400' : 
                                                        index === 1 ? 'bg-gradient-to-r from-slate-300 to-gray-300' : 
                                                        'bg-gradient-to-r from-amber-600 to-orange-400'
                                                    }`}>
                                                        {getBadge(index)}
                                                    </div>
                                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-blue-300 shadow-md">
                                                        <img
                                                            src={player.user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(player.user?.firstName || 'player')}`}
                                                            alt={player.user?.firstName || 'Joueur'}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(player.user?.firstName || 'player')}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-800">{player.user?.firstName || 'Joueur'}</h3>
                                                        <div className="flex space-x-1 text-xs text-gray-500">
                                                            <span>🎮 {player.gamesPlayed || 0} parties</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-5 py-3 font-bold text-lg text-blue-700 shadow-md transform rotate-1">
                                                    {player.bestScore || 0} pts
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-10 text-center">
                                        <div className="w-32 h-32 mx-auto mb-6">
                                            <img 
                                                src="/images/owl.png" 
                                                alt="Jame le hibou"
                                                className="w-full h-full object-contain opacity-70"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=owl";
                                                }}
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Le Top 3 James arrive bientôt !</h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Jame le hibou prépare des jeux passionnants et éducatifs pour toi.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Espace réservé pour le classement Jame */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-indigo-300 transform rotate-0.5 opacity-80">
                            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 py-5 px-6">
                                <h2 className="text-3xl font-bold text-white text-center transform -rotate-1">
                                    🏆 Classement Jame - À venir 🏆
                                </h2>
                            </div>
                            <div className="p-8 text-center">
                                <div className="animate-pulse">
                                    <div className="h-8 bg-indigo-100 rounded-full mb-4 mx-auto w-3/4"></div>
                                    <div className="h-8 bg-blue-100 rounded-full mb-4 mx-auto w-2/3"></div>
                                    <div className="h-8 bg-indigo-100 rounded-full mb-4 mx-auto w-3/4"></div>
                                </div>
                                <p className="text-lg text-indigo-600 font-medium mt-8">
                                    Les classements des jeux Jame seront bientôt disponibles !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Message d'encouragement */}
                <div className="mt-8 text-center">
                    <p className="text-xl text-orange-600 font-bold animate-bounce-slow">
                        👑 Continue à jouer pour devenir le roi des jeux ! 👑
                    </p>
                </div>
            </div>
        </div>
    );
}