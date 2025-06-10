export default function MostPlayedGames({ data = [] }) {
    // Formater les noms des jeux pour l'affichage
    const formatGameName = (slug) => {
        if (!slug) return 'Jeu inconnu';

        const names = {
            'sebi-run': 'Sebi Runner',
            'james-hibou': 'James le Hibou',
            'memory-match': 'Memory Match'
        };

        return names[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Jeux les plus joués</h2>
                <div className="text-gray-500 text-center py-8">
                    Aucune donnée disponible
                </div>
            </div>
        );
    }

    // Calculer le pourcentage pour chaque jeu par rapport au total
    const totalGames = data.reduce((sum, game) => sum + game.count, 0);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Jeux les plus joués</h2>
            <div className="space-y-4">
                {data.map((game, index) => {
                    const percentage = Math.round((game.count / totalGames) * 100);

                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">{formatGameName(game.name)}</span>
                                <span className="text-gray-500">{game.count} parties ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
