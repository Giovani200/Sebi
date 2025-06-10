// Fonction pour générer un nouvel obstacle (uniquement des buissons)
function generateObstacle(canvas,) {
  const FLOOR_Y = canvas.height - canvas.height * 0.12;
  const OBSTACLE_HEIGHT = canvas.height * 0.14;
  const OBSTACLE_WIDTH = OBSTACLE_HEIGHT * 0.9; // Légèrement plus large pour une hitbox cohérente
  
  // Obstacle standard (buisson)
  const obstacle = {
    type: "obstacle",
    x: canvas.width + 20,
    y: FLOOR_Y - OBSTACLE_HEIGHT,
    w: OBSTACLE_WIDTH,
    h: OBSTACLE_HEIGHT,
    passed: false,
    lastObstacleX: canvas.width + 20
  };
  
  return obstacle;
}

// Export nécessaire pour la compatibilité avec le code existant
export { generateObstacle };
