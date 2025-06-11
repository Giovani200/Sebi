/**
 * Système simulant une IA pour les récompenses de jeu
 * Utilise des règles avancées et une randomisation intelligente
 */

// Données pour les récompenses
const REWARD_TYPES = [
    {
        id: 'beginner',
        title: 'Débutant Prometteur',
        description: 'Tu commences à maîtriser le jeu!',
        icon: '🌱',
        bgGradient: 'from-green-200 to-green-400',
        borderColor: 'border-green-500'
    },
    {
        id: 'intermediate',
        title: 'Joueur Intermédiaire',
        description: 'Tes compétences se développent rapidement!',
        icon: '🌟',
        bgGradient: 'from-yellow-300 to-orange-400',
        borderColor: 'border-yellow-500'
    },
    {
        id: 'advanced',
        title: 'Maître du Jeu',
        description: 'Ta maîtrise est impressionnante!',
        icon: '🏆',
        bgGradient: 'from-purple-300 to-pink-400',
        borderColor: 'border-purple-500'
    },
    {
        id: 'expert',
        title: 'Expert Légendaire',
        description: 'Tu as atteint un niveau d\'excellence rare!',
        icon: '👑',
        bgGradient: 'from-red-300 to-rose-400',
        borderColor: 'border-red-500'
    },
    {
        id: 'unique',
        title: 'Performance Unique',
        description: 'Cette performance est remarquable et unique!',
        icon: '💎',
        bgGradient: 'from-blue-300 to-cyan-400',
        borderColor: 'border-blue-500'
    }
];

// Modèle de données d'entraînement simulé
const TRAINING_DATA = [
    { score: 100, jumps: 10, speed: 4, playTime: 30, category: 0 },   // Débutant
    { score: 200, jumps: 20, speed: 5, playTime: 60, category: 0 },   // Débutant
    { score: 300, jumps: 30, speed: 6, playTime: 90, category: 1 },   // Intermédiaire
    { score: 500, jumps: 40, speed: 7, playTime: 120, category: 1 },  // Intermédiaire
    { score: 800, jumps: 50, speed: 8, playTime: 180, category: 2 },  // Avancé
    { score: 1200, jumps: 70, speed: 9, playTime: 240, category: 2 }, // Avancé
    { score: 1500, jumps: 80, speed: 10, playTime: 300, category: 3 }, // Expert
    { score: 2000, jumps: 100, speed: 12, playTime: 360, category: 3 }, // Expert
    { score: 3000, jumps: 150, speed: 15, playTime: 500, category: 4 }, // Unique
];

/**
 * Initialise le système d'IA simulé
 */
export async function initializeAI() {
    console.log("Initialisation du système d'IA pour les récompenses...");
    // Simulation d'une initialisation réussie
    return true;
}

/**
 * Normalise une valeur entre 0 et 1 en fonction des bornes
 */
function normalize(value, min, max) {
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Calcule la distance euclidienne entre deux vecteurs
 */
function euclideanDistance(vecA, vecB) {
    return Math.sqrt(
        (vecA[0] - vecB[0]) ** 2 +
        (vecA[1] - vecB[1]) ** 2 +
        (vecA[2] - vecB[2]) ** 2 +
        (vecA[3] - vecB[3]) ** 2
    );
}

/**
 * Prédit la récompense appropriée en fonction des statistiques du joueur
 * Utilise un algorithme de K-plus proches voisins simplifié
 */
export function predictReward(playerStats) {
    try {
        // Normaliser les statistiques du joueur
        const normalizedInput = [
            normalize(playerStats.score, 0, 3000),
            normalize(playerStats.jumps || 0, 0, 150),
            normalize(playerStats.speed, 4, 15),
            normalize(playerStats.playTime || 0, 0, 500)
        ];

        // Trouver les 3 plus proches voisins
        const neighbors = TRAINING_DATA.map(data => {
            const normalizedData = [
                normalize(data.score, 0, 3000),
                normalize(data.jumps, 0, 150),
                normalize(data.speed, 4, 15),
                normalize(data.playTime, 0, 500)
            ];

            return {
                category: data.category,
                distance: euclideanDistance(normalizedInput, normalizedData)
            };
        }).sort((a, b) => a.distance - b.distance).slice(0, 3);

        // Comptabiliser les votes des voisins (système de vote pondéré)
        const votes = [0, 0, 0, 0, 0];
        neighbors.forEach(neighbor => {
            // Plus le voisin est proche, plus son vote a de poids
            const weight = 1 / (neighbor.distance + 0.01);
            votes[neighbor.category] += weight;
        });

        // Ajouter une part d'aléatoire (20% de chance)
        if (Math.random() < 0.2) {
            const randomBoost = Math.floor(Math.random() * 5);
            votes[randomBoost] += 2;
        }

        // Déterminer la catégorie gagnante
        const maxIndex = votes.indexOf(Math.max(...votes));

        // Récupérer le type de récompense
        const rewardType = REWARD_TYPES[maxIndex];

        // Personnaliser le message en fonction du score
        let message = rewardType.description;

        if (playerStats.score > (playerStats.highScore || 0)) {
            message += " Et tu as battu ton record personnel!";
        }

        if (playerStats.jumps > 50) {
            message += " Ton style de saut est impressionnant!";
        }

        // Créer la récompense personnalisée
        const reward = {
            score: playerStats.score,
            title: rewardType.title,
            description: message,
            icon: rewardType.icon,
            bgGradient: rewardType.bgGradient,
            borderColor: rewardType.borderColor,
            pattern: "✨",
            specialNote: `Notre IA a analysé ta performance et te décerne cette récompense spéciale!`
        };

        console.log(`L'IA a prédit la récompense de type "${rewardType.id}" pour un score de ${playerStats.score}`);
        return reward;
    } catch (error) {
        console.error("Erreur lors de la prédiction de récompense:", error);
        return getDefaultReward(playerStats.score);
    }
}

/**
 * Récompense par défaut en cas d'échec de l'IA
 */
function getDefaultReward(score) {
    const rewardType = REWARD_TYPES[Math.min(Math.floor(score / 500), REWARD_TYPES.length - 1)];

    return {
        score: score,
        title: rewardType.title,
        description: rewardType.description,
        icon: rewardType.icon,
        bgGradient: rewardType.bgGradient,
        borderColor: rewardType.borderColor,
        pattern: "✨",
        specialNote: "Félicitations pour ta performance!"
    };
}

/**
 * Analyse les performances pour attribuer une récompense spéciale
 */
export function analyzePerformance(gameHistory, currentScore) {
    // Cette fonction analyse plusieurs parties pour détecter des modèles de jeu
    // et attribuer des récompenses pour des accomplissements spéciaux

    if (!gameHistory || gameHistory.length < 3) {
        return null;
    }

    // Progression rapide
    const lastThreeScores = gameHistory.slice(-3).map(game => game.score);
    const averagePreviousScore = (lastThreeScores[0] + lastThreeScores[1]) / 2;

    if (currentScore > averagePreviousScore * 1.5) {
        return {
            title: "Progression Fulgurante",
            description: "Tu t'es amélioré de façon spectaculaire!",
            icon: "🚀",
            bgGradient: "from-indigo-300 to-purple-400",
            borderColor: "border-indigo-500",
            specialNote: "L'IA a détecté une amélioration de plus de 50% par rapport à tes parties précédentes!"
        };
    }

    // Constance
    const isConsistent = lastThreeScores.every(score =>
        Math.abs(score - currentScore) < currentScore * 0.2
    );

    if (isConsistent && currentScore > 500) {
        return {
            title: "Joueur Consistant",
            description: "Ta performance est remarquablement stable!",
            icon: "🧠",
            bgGradient: "from-blue-300 to-teal-400",
            borderColor: "border-blue-500",
            specialNote: "L'IA a remarqué que tes scores sont très constants. Impressionnante régularité!"
        };
    }

    return null;
}
