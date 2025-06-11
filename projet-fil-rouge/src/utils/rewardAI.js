/**
 * Système qui simule une IA pour générer des récompenses personnalisées
 * Ce n'est pas une véritable IA mais un ensemble de règles et d'algorithmes
 */

// Banques de données pour la personnalisation des récompenses
const REWARD_TITLES = [
    "Explorateur Intrépide",
    "Maître du Saut",
    "Gazelle Volante",
    "Champion de la Savane",
    "Roi de la Vitesse",
    "Aventurier Légendaire",
    "Sauteur Professionnel",
    "Héros de la Course",
    "Voyageur Interstellaire",
    "Esprit de la Savane"
];

const REWARD_DESCRIPTIONS = [
    "Tu as dépassé toutes les attentes !",
    "Ton agilité est impressionnante !",
    "Tu voles comme une gazelle à travers la savane !",
    "Même les plus grands coureurs s'inclinent devant toi !",
    "Ta vitesse est légendaire !",
    "Tu inspires les générations futures !",
    "Personne n'a jamais sauté comme toi !",
    "Tu es l'exemple à suivre pour tous les coureurs !",
    "Tu défies les lois de la physique !",
    "La savane entière connaît ton nom !"
];

const REWARD_ICONS = ["🏆", "🌟", "🦌", "👑", "⭐", "🎖️", "🥇", "✨", "🔥", "💎"];

const REWARD_COLORS = [
    { bg: "from-yellow-300 to-orange-400", border: "border-yellow-500" },
    { bg: "from-green-300 to-emerald-400", border: "border-green-500" },
    { bg: "from-blue-300 to-cyan-400", border: "border-blue-500" },
    { bg: "from-purple-300 to-pink-400", border: "border-purple-500" },
    { bg: "from-red-300 to-rose-400", border: "border-red-500" },
    { bg: "from-indigo-300 to-violet-400", border: "border-indigo-500" },
    { bg: "from-amber-300 to-yellow-400", border: "border-amber-500" },
    { bg: "from-teal-300 to-emerald-400", border: "border-teal-500" },
    { bg: "from-sky-300 to-blue-400", border: "border-sky-500" },
    { bg: "from-fuchsia-300 to-pink-400", border: "border-fuchsia-500" }
];

/**
 * Génère le prochain palier de récompense en fonction du score actuel
 * Utilise un algorithme progressif plutôt qu'une vraie IA
 */
export function generateNextMilestone(lastScore) {
    if (lastScore < 100) return 100;
    if (lastScore < 500) return lastScore + 100;
    if (lastScore < 1000) return lastScore + 200;
    if (lastScore < 2000) return lastScore + 300;
    if (lastScore < 5000) return lastScore + 500;
    return lastScore + Math.floor(lastScore * 0.2); // +20% du score actuel
}

/**
 * Génère une récompense personnalisée en analysant les statistiques du joueur
 * Utilise des règles conditionnelles et de la randomisation pour simuler l'IA
 */
export function generateCustomReward(score, playerStats) {
    // Sélection pseudo-aléatoire des éléments de design
    const titleIndex = Math.floor(Math.random() * REWARD_TITLES.length);
    const descIndex = Math.floor(Math.random() * REWARD_DESCRIPTIONS.length);
    const iconIndex = Math.floor(Math.random() * REWARD_ICONS.length);
    const colorIndex = Math.floor(Math.random() * REWARD_COLORS.length);

    // Règles conditionnelles basées sur les performances
    let specialAchievement = "";
    if (playerStats) {
        if (playerStats.jumps > 50) {
            specialAchievement = "Tu es un maître du saut avec plus de 50 sauts !";
        } else if (playerStats.distance > 2000) {
            specialAchievement = "Tu as parcouru plus de 2km, impressionnant !";
        } else if (playerStats.speed > 8) {
            specialAchievement = "Ta vitesse dépasse les 8x, quel champion !";
        }
    }

    // Créer la récompense
    const reward = {
        score: score,
        title: REWARD_TITLES[titleIndex],
        description: REWARD_DESCRIPTIONS[descIndex],
        specialNote: specialAchievement,
        icon: REWARD_ICONS[iconIndex],
        bgGradient: REWARD_COLORS[colorIndex].bg,
        borderColor: REWARD_COLORS[colorIndex].border,
        pattern: "✨",
        timestamp: new Date().toLocaleDateString('fr-FR')
    };

    return reward;
}

/**
 * Détermine si le joueur mérite une récompense basée sur ses performances
 * Utilise un système de règles et un peu de randomisation
 */
export function shouldAwardReward(currentScore, milestones, playerStats) {
    // Vérifier si le joueur a atteint un palier
    if (milestones.some(milestone => currentScore >= milestone && currentScore < milestone + 20)) {
        return true;
    }

    // Vérifier si le joueur a réalisé une performance exceptionnelle
    if (playerStats) {
        // Performance exceptionnelle: vitesse élevée + grande distance
        if (playerStats.speed > 10 && currentScore > 1500 && Math.random() < 0.2) {
            return true;
        }

        // Performance exceptionnelle: peu d'obstacles heurtés sur grande distance
        if (playerStats.obstaclesAvoided > 30 && currentScore > 1000 && Math.random() < 0.3) {
            return true;
        }
    }

    // Ajout d'un facteur aléatoire pour simuler l'intelligence
    if (playerStats && Math.random() < 0.2) {
        // 20% de chance de donner une récompense surprise
        return true;
    }

    return false;
}
