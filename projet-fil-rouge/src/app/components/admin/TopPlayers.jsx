export default function TopPlayers({ data = [] }) {
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
            <div className="text-gray-500 text-center py-8">
                Aucune donnée disponible
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                    <span className="mr-2">🏆</span>
                    Top Joueurs
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classement</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jeu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((player, index) => (
                            <tr key={index} className={`${index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50" : ""} hover:bg-gray-50 transition-colors duration-200`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                                            index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                                            'bg-gradient-to-r from-blue-400 to-blue-600'
                                        }`}>
                                            {index + 1}
                                        </div>
                                        {index < 3 && (
                                            <span className="ml-2 text-lg">
                                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold">
                                            {player.userName?.charAt(0) || 'U'}
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">{player.userName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {formatGameName(player.gameSlug)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-900 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                        {player.score} pts
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
