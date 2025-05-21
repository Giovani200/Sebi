/**
 * Tests unitaires pour les collisions dans Sebi Runner
 * Ce module permet de tester et de vérifier le bon fonctionnement des collisions
 */

// Fonction utilitaire pour simuler une hitbox
function createHitbox(x, y, width, height) {
  return { x, y, w: width, h: height };
}

// Test de collision standard - même algorithme que dans le jeu
function testCollision(rect1, rect2, margin = 0.05) {
  // Appliquer une marge (5% par défaut)
  const xMargin1 = rect1.w * margin;
  const yMargin1 = rect1.h * margin;
  
  // Collision standard avec marges
  return (
    rect1.x + xMargin1 < rect2.x + rect2.w - xMargin1 &&
    rect1.x + rect1.w - xMargin1 > rect2.x + xMargin1 &&
    rect1.y + yMargin1 < rect2.y + rect2.h - yMargin1 &&
    rect1.y + rect1.h - yMargin1 > rect2.y + yMargin1
  );
}

// Suite de tests
const collisionTests = [
  // Test 1: Collision évidente
  {
    name: "Collision complète",
    player: createHitbox(100, 100, 80, 80),
    obstacle: createHitbox(120, 120, 50, 50),
    expectCollision: true
  },
  
  // Test 2: Pas de collision - objets éloignés
  {
    name: "Pas de collision - éloignés",
    player: createHitbox(100, 100, 80, 80),
    obstacle: createHitbox(300, 300, 50, 50),
    expectCollision: false
  },
  
  // Test 3: Collision partielle par le côté
  {
    name: "Collision partielle - côté",
    player: createHitbox(100, 100, 80, 80),
    obstacle: createHitbox(160, 120, 50, 50),
    expectCollision: true
  },
  
  // Test 4: Collision de justesse - bord à bord
  {
    name: "Collision de justesse",
    player: createHitbox(100, 100, 80, 80),
    obstacle: createHitbox(179, 179, 50, 50),
    expectCollision: true
  },
  
  // Test 5: Pas de collision à cause de la marge
  {
    name: "Pas de collision - marge",
    player: createHitbox(100, 100, 80, 80),
    obstacle: createHitbox(184, 184, 20, 20),
    expectCollision: false
  },
  
  // Test 6: Collision avec un obstacle volant
  {
    name: "Collision avec objet volant",
    player: createHitbox(100, 50, 80, 80),
    obstacle: createHitbox(150, 50, 60, 40),
    expectCollision: true
  }
];

// Exécuter les tests et retourner les résultats
function runCollisionTests() {
  const results = [];
  
  collisionTests.forEach(test => {
    const hasCollision = testCollision(test.player, test.obstacle);
    const passed = hasCollision === test.expectCollision;
    
    results.push({
      name: test.name,
      passed,
      expected: test.expectCollision,
      actual: hasCollision
    });
  });
  
  return results;
}

// Fonction de validation pour vérifier si tous les tests passent
function validateCollisions() {
  const results = runCollisionTests();
  const allPassed = results.every(r => r.passed);
  
  console.log("=== Tests de collision ===");
  results.forEach(r => {
    const status = r.passed ? "✅ RÉUSSI" : "❌ ÉCHEC";
    console.log(`${status} - ${r.name}`);
    if (!r.passed) {
      console.log(`  Attendu: ${r.expected}, Obtenu: ${r.actual}`);
    }
  });
  
  console.log(`\nRésultat: ${allPassed ? "✅ Tous les tests passent" : "❌ Certains tests échouent"}`);
  return allPassed;
}

export { validateCollisions, testCollision, createHitbox };
