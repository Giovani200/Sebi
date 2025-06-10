'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        newUsersToday: 0,
        totalGamesPlayed: 0,
        activeUsers: 0,
        mostPlayedGames: [],
        topPlayers: [],
        registrationTrend: []
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats');

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Stats reçues:', data); // Debug
                setStats(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques:', error);
                setError(error.message);
                // Utiliser des données de démonstration en cas d'erreur
                setStats({
                    totalUsers: 12,
                    newUsersToday: 3,
                    totalGamesPlayed: 156,
                    activeUsers: 8,
                    mostPlayedGames: [
                        { name: 'sebi-run', count: 89 },
                        { name: 'james-hibou', count: 67 }
                    ],
                    topPlayers: [
                        { userName: 'Alice', gameSlug: 'sebi-run', score: 450 },
                        { userName: 'Bob', gameSlug: 'james-hibou', score: 320 }
                    ],
                    registrationTrend: []
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Utilisateurs totaux',
            value: stats.totalUsers,
            icon: '👥',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'from-blue-50 to-blue-100'
        },
        {
            title: 'Nouveaux aujourd\'hui',
            value: stats.newUsersToday,
            icon: '✨',
            color: 'from-green-500 to-green-600',
            bgColor: 'from-green-50 to-green-100'
        },
        {
            title: 'Parties jouées',
            value: stats.totalGamesPlayed,
            icon: '🎮',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'from-purple-50 to-purple-100'
        },
        {
            title: 'Utilisateurs actifs',
            value: stats.activeUsers,
            icon: '⚡',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'from-orange-50 to-orange-100'
        }
    ];

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <div className="inline-block animate-spin h-12 w-12 border-4 border-blue-300 border-t-blue-600 rounded-full mb-4"></div>
                    <p className="text-lg text-gray-700 font-medium">Chargement des statistiques...</p>
                </div>
            </div>
        );
    }

    // Afficher l'erreur si elle existe
    if (error) {
        return (
            <div className="space-y-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-center">
                        <span className="text-red-500 text-2xl mr-3">⚠️</span>
                        <div>
                            <h3 className="text-lg font-semibold text-red-800">Erreur de chargement</h3>
                            <p className="text-red-600">{error}</p>
                            <p className="text-sm text-red-500 mt-1">Affichage des données de démonstration</p>
                        </div>
                    </div>
                </div>
                {/* Afficher le reste du dashboard avec les données de démo */}
                {renderDashboardContent()}
            </div>
        );
    }

    function renderDashboardContent() {
        return (
            <>
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                        Tableau de bord administrateur
                    </h1>
                    <p className="text-xl text-gray-600">Bienvenue dans votre espace de gestion Sebi</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card, index) => (
                        <div key={index} className={`bg-gradient-to-br ${card.bgColor} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-lg`}>
                                        <span className="text-2xl">{card.icon}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Jeux les plus joués */}
                {stats.mostPlayedGames && stats.mostPlayedGames.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="mr-3">🎮</span>
                            Jeux les plus joués
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stats.mostPlayedGames.map((game, index) => (
                                <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-800">
                                            {game.name === 'sebi-run' ? 'Sebi Runner' : 
                                             game.name === 'james-hibou' ? 'James le Hibou' : 
                                             game.name}
                                        </span>
                                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {game.count} parties
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Top joueurs */}
                {stats.topPlayers && stats.topPlayers.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="mr-3">🏆</span>
                            Meilleurs joueurs
                        </h2>
                        <div className="space-y-3">
                            {stats.topPlayers.map((player, index) => (
                                <div key={index} className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-orange-200">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold mr-3">
                                            {player.userName?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{player.userName}</p>
                                            <p className="text-sm text-gray-600">
                                                {player.gameSlug === 'sebi-run' ? 'Sebi Runner' : 
                                                 player.gameSlug === 'james-hibou' ? 'James le Hibou' : 
                                                 player.gameSlug}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl text-green-600">{player.score}</p>
                                        <p className="text-sm text-gray-500">points</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl shadow-lg p-8 border border-orange-200">
                    <div className="flex items-center space-x-6">
                        <div className="text-6xl">🎯</div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">Bienvenue dans l'espace administrateur</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Ici vous pouvez gérer tous les aspects de votre plateforme éducative Sebi.
                                Surveillez les performances, gérez les utilisateurs et suivez l'engagement.
                            </p>
                            <div className="flex space-x-4">
                                <a href="/admin/users" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                                    Gérer les utilisateurs
                                </a>
                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyser les données</h3>
                            <p className="text-gray-600 mb-4">Consultez les métriques détaillées de votre plateforme</p>
                            <a href="/admin/stats" className="text-blue-600 hover:text-blue-800 font-medium">En savoir plus →</a>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-center">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Gérer les utilisateurs</h3>
                            <p className="text-gray-600 mb-4">Ajouter, modifier ou supprimer des comptes utilisateurs</p>
                            <a href="/admin/users" className="text-green-600 hover:text-green-800 font-medium">Gérer →</a>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-center">
                            <div className="text-4xl mb-4">🎮</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Supervision des jeux</h3>
                            <p className="text-gray-600 mb-4">Surveillez l'activité et les performances des jeux</p>
                            <a href="/admin/games" className="text-purple-600 hover:text-purple-800 font-medium">Voir →</a>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="space-y-8">
            {renderDashboardContent()}
        </div>
    );
}
