'use client';

import { useEffect, useState } from "react";

// Composant principal pour afficher le classement
export default function LeaderboardPage() {
    // États pour le chargement, le top 3 global et le classement par jeu
    const [loading, setLoading] = useState(true);
    const [top3, setTop3] = useState([]);
    const [bestByGame, setBestByGame] = useState([]);

    // Effet pour charger les données du classement au montage du composant
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // Appel à l'API pour récupérer les données du classement
                const res = await fetch('/api/leaderboard');
                if (!res.ok) throw new Error("Erreur API");

                // Récupération des données JSON
                const data = await res.json();
                setTop3(data.top3);             // Met à jour le top 3 global
                setBestByGame(data.bestByGame); // Met à jour le classement par jeu
            } catch (err) {
                // Affiche une erreur en cas d'échec de la requête
                console.error("Erreur de chargement du classement :", err);
            } finally {
                // Désactive l'état de chargement
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    // Affiche un message de chargement tant que les données ne sont pas prêtes
    if (loading) return <p>Chargement du classement...</p>;

    // Rendu principal du composant
    return (
        <main className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">🏆 Classement</h1>

            {/* Section Top 3 global */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">🌍 Top 3 global</h2>
                <ul className="bg-red shadow-md rounded-lg divide-y">
                    {Array.isArray(top3) && top3.map((entry, index) => (
                        <li key={index} className="p-4 flex justify-between">
                            <span>{entry.user.firstName} {entry.user.lastName}</span>
                            <span className="font-bold">{entry.totalScore} pts</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Section classement par jeu */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">🎮 Classement par jeu</h2>
                <ul className="bg-blue shadow-md rounded-lg divide-y">
                    {Array.isArray(bestByGame) && bestByGame.map((entry, index) => (
                        <li key={index} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img
                                    src={
                                        entry.user.avatar ||
                                        `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(entry.user.firstName + entry.user.lastName)}`
                                    }
                                    alt={`${entry.user.firstName} ${entry.user.lastName}`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span>
                                    {entry.user.firstName} {entry.user.lastName}
                                    <span className="italic text-gray-500 ml-2">({entry.game})</span>
                                </span>
                            </div>
                            <span className="font-bold">{entry.totalScore || entry.bestScore} pts</span>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}