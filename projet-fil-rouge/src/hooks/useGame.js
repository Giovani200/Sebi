import { useRef, useEffect, useState, useCallback } from "react";
import { generateObstacle } from "../utils/gameGeneratorsSimple";
import soundManager from "../utils/SoundManager";
import { validateCollisions } from "../utils/collisionTests";
import { initializeAI, predictReward, analyzePerformance } from "../utils/AIRewardSystem";

// Définition des constantes initiales
const SEBI_INITIAL = { x: 100, y: 100, w: 80, h: 80, vy: 0, vx: 0, jumping: false };

// Paliers de récompenses
// const REWARD_MILESTONES = [100, 200, 300, 500, 1000];

// Debug mode - mettre à true pendant le développement pour voir les hitboxes
const DEBUG_HITBOX = false;

export default function useGame(canvasRef) {
  const [rewardUnlocked, setRewardUnlocked] = useState(null);
  // États
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(4); // Nouveau: état pour la vitesse actuelle

  // Pour suivre les paliers déjà débloqués
  const unlockedMilestonesRef = useRef(new Set());
  const scoreSubmittedRef = useRef(false);

  // État du jeu
  const state = useRef({
    sebi: { ...SEBI_INITIAL },
    obstacles: [],
    stars: [],  // Pour l'animation nocturne
    speed: 4,
    gravity: 1.2,
    jumpPower: -16,
    frame: 0,
    running: true,
    currentDistance: 0,
    gameStartTime: 0,        // Nouveau: temps de début du jeu
    lastSpeedIncrease: 0     // Nouveau: dernier moment d'augmentation de vitesse
  });

  // Préchargement des images et sons
  const imagesRef = useRef({});

  useEffect(() => {
    console.log("Loading images...");
    const images = {};

    // Détection de l'appareil mobile pour optimisation
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log(`Detected device: ${isMobile ? 'mobile' : 'desktop'}`);

    // Ajuster la qualité et la taille des ressources selon l'appareil
    const imageQualitySuffix = isMobile ? '-small' : '';

    // Ne charger que les images nécessaires: arrière-plan, Sebi et buissons
    const toLoad = [
      { key: 'bg', src: `/foret-bg${imageQualitySuffix}.png` },
      { key: 'sebi', src: `/sebi${imageQualitySuffix}.png` },
      { key: 'bush', src: `/bush${imageQualitySuffix}.png` }
    ];

    // Vérification des ressources - fallback si les versions optimisées n'existent pas
    toLoad.forEach(({ key, src }) => {
      const img = new window.Image();
      img.src = src;

      // Gestionnaire d'erreur pour charger la version standard si la version optimisée n'existe pas
      img.onerror = () => {
        console.warn(`Failed to load optimized image ${src}, falling back to standard version`);
        const standardSrc = src.replace('-small.png', '.png');
        img.src = standardSrc;
      };

      img.onload = () => console.log(`Image ${key} loaded successfully: ${img.src}`);
      images[key] = img;
    });

    imagesRef.current = images;

    // Préchargement des sons avec le gestionnaire de sons
    console.log("Loading sounds...");
    try {
      // Charger uniquement le son de saut (les autres sons ont été supprimés)
      soundManager.loadSounds({
        jump: '/music/jump.wav'
      });

      // Chargement de la musique de fond
      soundManager.loadBackgroundMusic('/music/savannah.mp3');

      console.log("Sounds loaded successfully");
    } catch (e) {
      console.error("Failed to load sounds", e);
    }
  }, []);

  // Démarrer ou arrêter la musique selon l'état du jeu
  useEffect(() => {
    // Démarrer la musique quand le jeu est prêt
    if (isGameReady && !isGameOver) {
      soundManager.playBackgroundMusic();
    }

    // Mettre en pause la musique quand le jeu est terminé
    if (isGameOver) {
      soundManager.pauseBackgroundMusic();
    }

    return () => {
      // Arrêter la musique quand le composant est démonté
      soundManager.pauseBackgroundMusic();
    };
  }, [isGameReady, isGameOver]);

  // Charger le high score depuis l'API
  useEffect(() => {
    // Initialiser le highscore à 0 par défaut
    setHighScore(0);

    // Récupérer le highscore depuis l'API
    fetch("/api/scores?gameSlug=sebi-run", {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log("Highscore reçu de l'API:", data);
        // Utiliser directement le score du serveur
        setHighScore(data.highscore || 0);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération du highscore:", err);
      });

    // Vérifier si le tutoriel a déjà été vu
    const tutorialSeen = localStorage.getItem("sebi-tutorial-seen");
    if (!tutorialSeen) {
      setShowTutorial(true);
    }

    // Exécuter les tests de collision en mode développement
    if (process.env.NODE_ENV === 'development') {
      console.log("Exécution des tests de collision...");
      validateCollisions();
    }
  }, []);

  // Boucle principale du jeu
  useEffect(() => {
    console.log(`Main effect - isGameOver: ${isGameOver}, isGameReady: ${isGameReady}`);

    // Vérification du canvas
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas ref is null");
      return;
    }
    console.log(`Canvas dimensions: ${canvas.width}x${canvas.height}`);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("Failed to get 2d context");
      return;
    }

    // Variables de jeu
    let animation;
    let lastTime = performance.now();

    // Initialisation simple du score
    let distance = 0;
    state.current.currentDistance = 0;
    console.log("STARTUP: New game, distance reset to 0");
    const GROUND_HEIGHT = canvas.height * 0.12; // 12% de hauteur pour le sol
    const PLAYER_HEIGHT = canvas.height * 0.18;
    const PLAYER_WIDTH = PLAYER_HEIGHT * 0.8; // Réduit de 1.5 à 0.8 pour une hitbox plus réaliste
    const FLOOR_Y = canvas.height - GROUND_HEIGHT;
    const PLAYER_Y = FLOOR_Y - PLAYER_HEIGHT;
    const PLAYER_X = canvas.width * 0.2;

    console.log(`Game dimensions - Floor: ${FLOOR_Y}, Player pos: (${PLAYER_X},${PLAYER_Y})`);

    // Ajustement des paramètres physiques
    state.current.jumpPower = -canvas.height * 0.032;   // Réduction modérée de la puissance de saut (était 0.040)
    state.current.gravity = canvas.height * 0.0015;     // Ajustement léger de la gravité pour un saut plus naturel
    state.current.speed = Math.max(4, canvas.width * 0.005);

    // Fonction pour dessiner Sebi
    function drawPlayer(g, now, isMobile = false) {
      const sebiImg = imagesRef.current.sebi;

      if (!sebiImg) {
        console.log("drawPlayer: sebiImg is not loaded yet");
        // Fallback si l'image n'est pas chargée
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = '#f59e42';
        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.restore();
        return;
      }

      if (sebiImg.complete) {
        const aspect = sebiImg.width / sebiImg.height || 1;
        const targetH = PLAYER_HEIGHT;
        // La largeur visuelle est toujours basée sur les proportions de l'image, 
        // mais nous décalons la position pour centrer l'image sur la hitbox plus étroite
        const targetW = targetH * aspect;

        // Ajuster la position horizontale pour centrer l'image sur la hitbox
        const imageOffset = (targetW - g.w) / 2;

        ctx.save();

        try {
          // Animation d'oscillation verticale pendant la course
          const runningOffset = g.jumping ? 0 : Math.sin(now / 100) * 5;

          // Effet de rotation pendant le saut - simplifié sur mobile
          if (g.jumping) {
            // Centre de rotation
            const centerX = g.x + imageOffset + targetW / 2;
            const centerY = g.y + targetH / 2;

            // Calculer un angle de rotation qui dépend de la vélocité verticale
            // Limiter l'angle à ±15 degrés
            const jumpRotation = Math.max(-15, Math.min(15, g.vy * 0.5));

            // Appliquer la rotation
            ctx.translate(centerX, centerY);
            ctx.rotate(jumpRotation * Math.PI / 180);
            ctx.translate(-centerX, -centerY);

            // Effet de trainée pendant le saut - désactivé ou réduit sur mobile
            if (g.vy < 5 && !isMobile) { // Seulement sur desktop ou si la vélocité est basse
              ctx.globalAlpha = 0.3;
              ctx.drawImage(sebiImg, g.x - 5 - imageOffset, g.y + 5, targetW, targetH);

              // Second effet de traînée uniquement sur desktop
              if (!isMobile) {
                ctx.globalAlpha = 0.15;
                ctx.drawImage(sebiImg, g.x - 10 - imageOffset, g.y + 10, targetW, targetH);
              }
              ctx.globalAlpha = 1;
            }
          }

          // Dessiner Sebi
          ctx.drawImage(sebiImg, g.x - imageOffset, g.y + runningOffset, targetW, targetH);
        } catch (error) {
          // En cas d'erreur avec les animations, dessiner simplement le personnage
          console.error("Erreur animation Sebi:", error);
          ctx.restore();
          ctx.drawImage(sebiImg, g.x - imageOffset, g.y, targetW, targetH);
          return;
        }

        ctx.restore();
      } else {
        // Fallback en attendant que l'image se charge
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = '#f59e42';
        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.restore();
      }
    }

    // Fonction pour dessiner un obstacle
    function drawObstacle(o, isMobile = false) {
      // Uniquement des buissons dans cette version simplifiée
      const bushImg = imagesRef.current.bush;

      if (bushImg && bushImg.complete) {
        ctx.save();
        try {
          // Dessiner le buisson
          ctx.drawImage(bushImg, o.x, o.y, o.w, o.h);

          // Ajouter une ombre sous le buisson - seulement sur desktop
          if (!isMobile) {
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(o.x + o.w / 2, o.y + o.h, o.w * 0.4, o.h * 0.1, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        } catch (error) {
          console.error("Erreur dessin buisson:", error);
          ctx.fillStyle = '#228B22';
          ctx.fillRect(o.x, o.y, o.w, o.h);
        }
        ctx.restore();
      } else {
        // Fallback
        ctx.save();
        ctx.fillStyle = '#228B22';
        ctx.fillRect(o.x, o.y, o.w, o.h);
        ctx.restore();
      }
    }

    // Fonction pour dessiner l'arrière-plan
    function drawBackground(isMobile = false) {
      const bgImg = imagesRef.current.bg;

      // Qualité simplifiée pour les appareils mobiles
      const qualityLevel = isMobile ? 'low' : 'high';

      try {
        if (bgImg && bgImg.complete) {
          // Dessiner l'image de fond de manière statique (sans parallaxe)
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

          // Ajouter un dégradé par-dessus l'image pour l'effet jour/nuit
          if (nightMode) {
            ctx.fillStyle = "rgba(0, 0, 50, 0.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ajouter des étoiles la nuit - moins nombreuses sur mobile
            const starsUpdateInterval = isMobile ? 60 : 30;
            if (state.current.frame % starsUpdateInterval === 0) {
              // Générer de nouvelles étoiles périodiquement - moins sur mobile
              const starCount = isMobile ? 25 : 50;
              state.current.stars = Array.from({ length: starCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.7, // Seulement dans le ciel
                r: Math.random() * 2 + 1, // Taille variable
                brightness: Math.random() // Luminosité variable pour le scintillement
              }));
            }

            // Dessiner les étoiles
            if (state.current.stars && state.current.stars.length > 0) {
              ctx.save();

              // Sur mobile, skip une étoile sur deux pour alléger le rendu
              const renderStride = isMobile ? 2 : 1;

              for (let i = 0; i < state.current.stars.length; i += renderStride) {
                const star = state.current.stars[i];
                // Faire scintiller les étoiles - animation plus lente sur mobile
                const animationSpeed = isMobile ? 0.05 : 0.1;
                const twinkle = 0.5 + Math.sin(state.current.frame * animationSpeed + star.x) * 0.5;
                const alpha = star.brightness * twinkle;

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();
            }

            // Ajouter une lune - simplifiée sur mobile
            ctx.save();
            const moonX = (canvas.width * 0.8 + state.current.frame * 0.1) % (canvas.width * 1.5) - canvas.width * 0.2;
            const moonY = canvas.height * 0.2;
            const moonRadius = canvas.width * 0.05;

            if (qualityLevel === 'high') {
              // Lueur autour de la lune - uniquement sur desktop
              const gradient = ctx.createRadialGradient(
                moonX, moonY, moonRadius * 0.8,
                moonX, moonY, moonRadius * 2
              );
              gradient.addColorStop(0, "rgba(255, 255, 180, 0.4)");
              gradient.addColorStop(1, "rgba(255, 255, 180, 0)");
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(moonX, moonY, moonRadius * 2, 0, Math.PI * 2);
              ctx.fill();
            }

            // La lune elle-même
            ctx.fillStyle = "rgba(255, 255, 200, 0.9)";
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
            ctx.fill();

            // Cratères sur la lune - seulement sur desktop
            if (qualityLevel === 'high') {
              ctx.fillStyle = "rgba(200, 200, 150, 0.6)";
              ctx.beginPath();
              ctx.arc(moonX - moonRadius * 0.3, moonY + moonRadius * 0.1, moonRadius * 0.2, 0, Math.PI * 2);
              ctx.fill();
              ctx.beginPath();
              ctx.arc(moonX + moonRadius * 0.4, moonY - moonRadius * 0.2, moonRadius * 0.15, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        } else {
          // Fallback avec un dégradé
          const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
          grad.addColorStop(0, nightMode ? '#183a1d' : '#4ade80');
          grad.addColorStop(0.5, nightMode ? '#22543d' : '#166534');
          grad.addColorStop(1, nightMode ? '#0f172a' : '#052e16');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      } catch (error) {
        console.error("Erreur dessin arrière-plan:", error);
        // Fallback simple en cas d'erreur
        ctx.fillStyle = nightMode ? '#183a1d' : '#4ade80';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      try {
        // Sol
        ctx.fillStyle = nightMode ? "#2d3748" : "#4b5320";
        ctx.fillRect(0, FLOOR_Y, canvas.width, GROUND_HEIGHT);

        // Herbe sur le sol - moins dense sur mobile
        const grassDensity = isMobile ? 40 : 20; // Plus élevé = moins dense
        const grassCount = Math.ceil(canvas.width / grassDensity);
        ctx.save();
        for (let i = 0; i < grassCount; i++) {
          const x = (i * grassDensity - (state.current.frame % grassDensity)) % canvas.width;
          const height = 5 + Math.sin(i) * 3;
          const color = nightMode ? `rgba(40, 80, 40, 0.7)` : `rgba(80, 200, 80, 0.9)`;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(x, FLOOR_Y);
          ctx.lineTo(x + 3, FLOOR_Y - height);
          ctx.lineTo(x + 6, FLOOR_Y);
          ctx.fill();
        }
        ctx.restore();
      } catch (error) {
        console.error("Erreur dessin sol:", error);
        // Fallback simple pour le sol en cas d'erreur
        ctx.fillStyle = "#4b5320";
        ctx.fillRect(0, FLOOR_Y, canvas.width, GROUND_HEIGHT);
      }
    }

    // Fonction de détection de collision avec tolérance ajustable
    function detectCollision(rect1, rect2) {
      // Réduire considérablement la marge pour rendre les collisions plus précises
      const xMargin = rect1.w * 0.2; // 20% de marge horizontale pour Sebi (réduit sa largeur effective)
      const yMargin = rect1.h * 0.1; // 10% de marge verticale (légèrement augmentée)

      // Marges spécifiques pour les obstacles (rect2)
      const obstacleXMargin = rect2.w * 0.1; // 10% de marge pour les buissons
      const obstacleYMargin = rect2.h * 0.1; // 10% de marge verticale

      // Collision standard entre rectangles, avec des marges ajustées séparément pour Sebi et les obstacles
      const collision = (
        rect1.x + xMargin < rect2.x + rect2.w - obstacleXMargin &&
        rect1.x + rect1.w - xMargin > rect2.x + obstacleXMargin &&
        rect1.y + yMargin < rect2.y + rect2.h - obstacleYMargin &&
        rect1.y + rect1.h - yMargin > rect2.y + obstacleYMargin
      );

      // Si le mode debug est activé, dessiner les hitboxes
      if (DEBUG_HITBOX && ctx) {
        ctx.save();
        // Dessiner la hitbox de Sebi
        ctx.strokeStyle = collision ? 'red' : 'lime';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          rect1.x + xMargin,
          rect1.y + yMargin,
          rect1.w - 2 * xMargin,
          rect1.h - 2 * yMargin
        );

        // Dessiner la hitbox de l'obstacle
        ctx.strokeStyle = collision ? 'red' : 'yellow';
        ctx.strokeRect(
          rect2.x + obstacleXMargin,
          rect2.y + obstacleYMargin,
          rect2.w - 2 * obstacleXMargin,
          rect2.h - 2 * obstacleYMargin
        );
        ctx.restore();
      }

      return collision;
    }

    // Fonction pour réinitialiser Sebi
    function resetSebi() {
      console.log("Resetting Sebi position");
      state.current.sebi = {
        x: PLAYER_X,
        y: PLAYER_Y,
        w: PLAYER_WIDTH,
        h: PLAYER_HEIGHT,
        vy: 0,
        vx: 0,
        jumping: false
      };
    }

    // Fonction pour réinitialiser les obstacles
    function resetObstacles() {
      state.current.obstacles = [];
    }

    // Fonction principale de boucle de jeu
    function gameLoop(timestamp) {
      // Calculer le temps écoulé depuis la dernière frame
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      state.current.frame++;

      // Calcul du delta temps avec protection contre les grandes valeurs
      // (par exemple, si l'onglet a été inactif)
      const safeDelta = Math.min(delta, 0.05);

      // Utiliser le timestamp pour les animations
      const now = timestamp;

      // Détection d'appareil mobile pour ajuster les performances
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // Vérifier si le jeu est terminé
      if (isGameOver) return;

      // Vérifier si le jeu est prêt à commencer
      if (!isGameReady) return;

      // Vérifier si le jeu est en cours d'exécution
      if (!state.current.running) return;

      // Effacer l'écran
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner l'arrière-plan et le sol
      drawBackground(isMobile);

      // Dessiner les obstacles
      state.current.obstacles.forEach(o => drawObstacle(o, isMobile));

      // Dessiner Sebi
      drawPlayer(state.current.sebi, now, isMobile);

      // Mettre à jour la boucle de jeu toutes les 60 secondes environ pour ajuster la qualité
      if (state.current.frame % 3600 === 0) {
        // Utiliser des paramètres de qualité par défaut
        const quality = {
          starsEnabled: true,
          effectsLevel: 'high'
        };

        // Ajuster la fréquence de mise à jour des étoiles en fonction de la qualité
        if (quality.starsEnabled) {
          // Générer des étoiles avec une fréquence basée sur la qualité
          const starsUpdateInterval = isMobile ? 60 : (quality.effectsLevel === 'high' ? 30 : 90);
          if (nightMode && state.current.frame % starsUpdateInterval === 0) {
            // Ajuster le nombre d'étoiles en fonction de la qualité
            const starCount = isMobile ? 25 : (quality.effectsLevel === 'high' ? 50 : 30);
            state.current.stars = Array.from({ length: starCount }, () => ({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height * 0.7,
              r: Math.random() * 2 + 1,
              brightness: Math.random()
            }));
          }
        } else if (nightMode && !quality.starsEnabled) {
          // Réduire considérablement le nombre d'étoiles si désactivé
          state.current.stars = Array.from({ length: 10 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.7,
            r: Math.random() * 2 + 1,
            brightness: Math.random()
          }));
        }
      }

      // NOUVELLE LOGIQUE : Vitesse progressive - augmente de 1.5 toutes les 10 secondes
      const speedIncreaseInterval = 10000; // 10 secondes en millisecondes
      if (timestamp - state.current.lastSpeedIncrease >= speedIncreaseInterval) {
        state.current.speed += 1.5; // Accumulation: ajouter 1.5 à la vitesse actuelle
        setCurrentSpeed(state.current.speed); // Mettre à jour l'état pour l'affichage
        state.current.lastSpeedIncrease = timestamp;
        const gameTimeInSeconds = (timestamp - state.current.gameStartTime) / 1000;
        console.log(`Vitesse augmentée à ${state.current.speed} après ${Math.floor(gameTimeInSeconds)} secondes`);
      }

      // Mise à jour de la physique du jeu et la logique

      // Mise à jour du joueur (Sebi)
      const sebi = state.current.sebi;

      // Appliquer la gravité si en saut
      if (sebi.jumping) {
        sebi.vy += state.current.gravity * safeDelta * 60;
        sebi.y += sebi.vy;

        // Réduction progressive de la vitesse horizontale
        sebi.vx *= 0.95;
        sebi.x += sebi.vx;

        // Vérifier si le joueur est revenu au sol
        const FLOOR_Y = canvas.height - canvas.height * 0.12 - sebi.h;
        if (sebi.y >= FLOOR_Y) {
          sebi.y = FLOOR_Y;
          sebi.vy = 0;
          sebi.jumping = false;
          sebi.doubleJumpAvailable = false;
        }
      }

      // Limiter la position horizontale de Sebi
      const minX = canvas.width * 0.1;
      const maxX = canvas.width * 0.3;
      if (sebi.x < minX) sebi.x = minX;
      if (sebi.x > maxX) sebi.x = maxX;

      // Mise à jour de la distance/score
      distance += state.current.speed * safeDelta;
      state.current.currentDistance = Math.floor(distance);
      setScore(state.current.currentDistance);

      // Mise à jour des statistiques du joueur
      updatePlayerStats({
        distance: state.current.currentDistance,
        speed: state.current.speed,
        playTime: (timestamp - state.current.gameStartTime) / 1000
      });

      // Vérifier et mettre à jour le high score si nécessaire
      if (state.current.currentDistance > highScore) {
        setHighScore(state.current.currentDistance);
        // Ne pas redémarrer le jeu, continuer la partie
      }

      // Activer le mode nuit périodiquement
      if (Math.floor(distance / 1000) % 2 === 1 && !nightMode) {
        setNightMode(true);
      } else if (Math.floor(distance / 1000) % 2 === 0 && nightMode) {
        setNightMode(false);
      }

      // Augmenter progressivement la vitesse du jeu - REMPLACÉ par la logique temporelle
      // state.current.speed = 4 + Math.floor(distance / 500) * 0.5;

      // Mise à jour des obstacles existants
      state.current.obstacles = state.current.obstacles.filter(o => {
        // Déplacer l'obstacle
        o.x -= state.current.speed * safeDelta * 60;

        // Vérifier si l'obstacle est passé sans collision
        if (!o.passed && o.x + o.w < sebi.x) {
          o.passed = true;
        }

        // Vérifier les collisions seulement si l'obstacle n'a pas encore été passé
        if (!o.passed && detectCollision(sebi, o)) {
          // Collision détectée - fin du jeu
          console.log("Collision avec un obstacle ! Game over");

          // Jouer le son du saut pour simuler l'impact
          soundManager.play('jump', { pitchVariation: 0.15, volume: 0.8 });

          // Vérifier si le score a déjà été soumis
          if (!scoreSubmittedRef.current) {
            scoreSubmittedRef.current = true;

            // Statistiques finales de la partie
            const finalStats = {
              score: state.current.currentDistance,
              jumps: playerStats.jumps,
              speed: state.current.speed,
              playTime: (timestamp - state.current.gameStartTime) / 1000,
              highScore: highScore
            };

            // Mettre à jour l'historique des parties
            setGameHistory(prev => [...prev, finalStats]);

            // Générer dynamiquement le prochain palier en fonction du score actuel
            // (Déplacé hors de la fonction gameLoop pour éviter le warning)
            // function getNextMilestone(current) {
            //   if (current < 500) return current + 100;
            //   if (current < 2000) return current + 200;
            //   return current + Math.floor(current * 0.2); // +20% du dernier palier
            // }

            // Palier atteint (le plus haut palier non encore débloqué)
            const palier = rewardMilestones.find(
              m => state.current.currentDistance >= m && !unlockedMilestonesRef.current.has(m)
            );
            if (palier) {
              unlockedMilestonesRef.current.add(palier);

              // Générer l'image IA et afficher la récompense
              generateMascotteImageAI({
                userId: "user-" + Math.floor(Math.random() * 100000), // À remplacer par l'ID réel
                score: state.current.currentDistance,
                palier,
                mascotte: "Sebi la gazelle",
                ami: "Léo le lion"
              }).then(imageUrl => {
                const reward = {
                  score: state.current.currentDistance,
                  palier,
                  imageUrl,
                  title: `Bravo !`,
                  description: `Tu as débloqué une illustration unique de Sebi et son ami !`,
                  icon: "🦁",
                  bgGradient: "from-green-200 to-yellow-200",
                  borderColor: "border-yellow-500",
                  pattern: "✨",
                  specialNote: "Image générée spécialement pour toi par l'IA !"
                };
                setRewardUnlocked(reward);
                soundManager.play('jump', { pitchVariation: -0.2, volume: 1.2 });
                setTimeout(() => setRewardUnlocked(null), 8000);
              });

              // Générer dynamiquement tous les prochains paliers nécessaires
              generateNextRewardMilestone();
            } else {
              // Récompense IA classique si pas de nouveau palier
              let aiReward;
              if (aiInitializedRef.current) {
                aiReward = predictReward(finalStats);
                const specialPerformance = analyzePerformance(gameHistory, finalStats.score);
                if (specialPerformance && finalStats.score > 300) {
                  aiReward = {
                    ...aiReward,
                    ...specialPerformance,
                    score: finalStats.score
                  };
                }
              } else {
                aiReward = {
                  score: finalStats.score,
                  title: finalStats.score > highScore ? "Nouveau Record!" : "Belle Performance!",
                  description: `Tu as parcouru ${finalStats.score} mètres!`,
                  icon: "🏆",
                  bgGradient: "from-yellow-300 to-orange-400",
                  borderColor: "border-yellow-500",
                  pattern: "✨"
                };
              }
              setRewardUnlocked(aiReward);
            }

            // Enregistrer le score final
            fetch("/api/scores", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                score: state.current.currentDistance,
                gameSlug: "sebi-run",
                stats: finalStats
              }),
              credentials: 'include',
            })
              .then(res => res.json())
              .then(data => {
                console.log("Score enregistré:", data);

                // Mettre à jour le highscore si nécessaire
                if (data.highscore) {
                  setHighScore(data.highscore);
                }
              })
              .catch(err => {
                console.error("Erreur d'enregistrement du score final:", err);
              });
          }

          // Mettre fin au jeu
          setIsGameOver(true);
          state.current.running = false;

          return false; // Retirer l'obstacle de la liste
        }

        // Conserver les obstacles toujours visibles ou à proximité
        return o.x > -o.w;
      });

      // Générer de nouveaux obstacles périodiquement
      // CORRIGÉ: Garder un espacement constant malgré l'augmentation de vitesse
      const baseObstacleInterval = 120; // Interval fixe pour un espacement constant
      const obstacleInterval = Math.floor(baseObstacleInterval);

      // Vérifier si le dernier obstacle ajouté est suffisamment éloigné avant d'en ajouter un nouveau
      let canAddObstacle = true;
      if (state.current.obstacles.length > 0) {
        const lastObstacle = state.current.obstacles[state.current.obstacles.length - 1];
        // CORRIGÉ: Espacement basé sur la distance plutôt que sur la position relative
        const minDistance = 300; // Distance minimale entre obstacles en pixels
        canAddObstacle = lastObstacle.x < canvas.width - minDistance;
      }

      if (state.current.frame % obstacleInterval === 0 && canAddObstacle) {
        state.current.obstacles.push(generateObstacle(canvas, state.current.currentDistance));
      }

      // SUPPRIMÉ: Vérification des récompenses pendant le jeu
      // Les récompenses sont maintenant accordées uniquement à la fin du jeu

      // Continuer la boucle
      animation = requestAnimationFrame(gameLoop);
    }

    // Démarrer le jeu uniquement si les conditions sont remplies
    if (!isGameOver && isGameReady) {
      console.log("Starting game logic");

      // Initialisation d'une nouvelle partie
      console.log("Starting new game");
      resetSebi();
      resetObstacles();
      lastTime = performance.now();

      // Réinitialiser les variables de temps
      state.current.gameStartTime = 0;
      state.current.lastSpeedIncrease = 0;
      state.current.speed = 4; // Réinitialiser la vitesse de base
      setCurrentSpeed(4); // Réinitialiser l'affichage de la vitesse

      // Réinitialiser les paliers débloqués
      unlockedMilestonesRef.current.clear();

      // Toujours mettre running à true pour lancer la boucle
      state.current.running = true;

      // Démarrer la boucle de jeu
      gameLoop(performance.now());
    }

    // Nettoyage
    return () => {
      state.current.running = false;
      if (animation) {
        cancelAnimationFrame(animation);
      }
    };
  }, [canvasRef, isGameOver, isGameReady, nightMode]);

  // Fonction de saut améliorée avec "double saut"
  function jump() {
    if (isGameOver) return;

    const g = state.current.sebi;

    if (!g.jumping) {
      // Premier saut - saut normal
      g.vy = state.current.jumpPower;
      g.vx = state.current.speed * 0.4;
      g.x += 6;
      g.jumping = true;
      g.doubleJumpAvailable = true;

      // Mettre à jour les statistiques - nombre de sauts
      updatePlayerStats({
        jumps: playerStats.jumps + 1
      });

      soundManager.play('jump', { pitchVariation: 0.05 });
    } else if (g.doubleJumpAvailable && g.vy > state.current.jumpPower * 0.3) {
      // Double saut
      g.vy = state.current.jumpPower * 0.7;
      g.vx += state.current.speed * 0.2;
      g.doubleJumpAvailable = false;

      // Mettre à jour les statistiques - nombre de sauts
      updatePlayerStats({
        jumps: playerStats.jumps + 1
      });

      soundManager.play('jump', { pitchVariation: 0.05, volume: 0.7 });
    }
  }

  // Fonction de réinitialisation
  const reset = useCallback(() => {
    console.log("Reset called");
    setIsGameOver(false);
    setScore(0);
    setNightMode(false);
    setIsGameReady(true);
    setShowTutorial(false);
    setCurrentSpeed(4); // Réinitialiser la vitesse affichée
    setRewardUnlocked(null); // AJOUTÉ: Réinitialiser les récompenses

    // Réinitialiser le score
    state.current.currentDistance = 0;

    // Réinitialiser les statistiques du joueur
    setPlayerStats({
      jumps: 0,
      obstaclesAvoided: 0,
      speed: 4,
      playTime: 0,
      distance: 0
    });

    // Ne pas réinitialiser les paliers de récompense pour garder la progression

    // Réinitialiser le drapeau de soumission de score
    scoreSubmittedRef.current = false;

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas && canvas.width > 0 && canvas.height > 0) {
        console.log("Canvas is ready for reset");
      } else {
        console.log("Canvas not ready for reset, trying again soon");
        setTimeout(() => reset(), 100);
      }
    }, 50);
  }, [canvasRef]);

  // Fonction pour fermer le tutoriel et marquer comme vu
  const closeTutorial = useCallback(() => {
    setShowTutorial(false);
    // Marquer le tutoriel comme vu dans le localStorage
    localStorage.setItem("sebi-tutorial-seen", "true");
  }, []);

  //reset password 

  const resetHighScore = useCallback(() => {
    console.log("Réinitialisation du highscore");

    // Réinitialiser le highscore local
    setHighScore(0);
    // Supprimé: localStorage.setItem("sebi-highscore", "0");

    // Réinitialiser le highscore en base de données
    fetch("/api/scores/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameSlug: "sebi-run"
      }),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log("Highscore réinitialisé:", data);
        // Optionnel : afficher une notification
      })
      .catch(err => {
        console.error("Erreur lors de la réinitialisation du highscore:", err);
      });
  }, []);

  // État pour les statistiques du joueur (pour l'IA)
  const [playerStats, setPlayerStats] = useState({
    jumps: 0,
    obstaclesAvoided: 0,
    speed: 4,
    playTime: 0,
    distance: 0
  });

  // État pour l'historique de jeu (pour l'IA)
  const [gameHistory, setGameHistory] = useState([]);

  // État pour les paliers de récompenses dynamiques (commence à 100)
  const [rewardMilestones, setRewardMilestones] = useState([100]);

  // Référence pour savoir si l'IA est initialisée
  const aiInitializedRef = useRef(false);

  // Initialiser l'IA au premier rendu
  useEffect(() => {
    if (!aiInitializedRef.current) {
      console.log("Initialisation de l'IA...");
      initializeAI().then(success => {
        aiInitializedRef.current = success;
        console.log("Statut d'initialisation de l'IA:", success);
      });
    }
  }, []);

  // Fonction pour mettre à jour les statistiques du joueur
  const updatePlayerStats = useCallback((newStats) => {
    setPlayerStats(prev => ({
      ...prev,
      ...newStats
    }));
  }, []);

  // Générer le prochain palier de récompense dynamiquement
  const generateNextRewardMilestone = useCallback(() => {
    // Recherche du dernier palier atteint (pas seulement le dernier du tableau)
    let lastMilestone = rewardMilestones[rewardMilestones.length - 1];
    // Ajoute dynamiquement des paliers tant que le score actuel dépasse le dernier palier connu
    while (score >= lastMilestone) {
      lastMilestone = getNextMilestone(lastMilestone);
      setRewardMilestones(prev => [...prev, lastMilestone]);
      console.log(`Nouveau palier de récompense généré dynamiquement: ${lastMilestone}`);
    }
  }, [rewardMilestones, score]);

  // Fonction pour générer une image IA pour la récompense
  async function generateMascotteImageAI({ userId, score, palier, mascotte, ami }) {
    // Appel à une API d'IA générative (exemple fictif, à adapter selon ton backend)
    // Le prompt peut être personnalisé selon le jeu, le score, la mascotte, etc.
    const prompt = `Illustration colorée et joyeuse de ${mascotte} (mascotte principale) avec son ami ${ami}, célébrant un score de ${score} au palier ${palier}, style cartoon pour enfants.`;
    try {
      const res = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          userId,
          score,
          palier,
          mascotte,
          ami
        }),
        credentials: 'include'
      });
      const data = await res.json();
      return data.imageUrl; // L'URL de l'image générée par l'IA
    } catch (e) {
      console.error("Erreur génération image IA:", e);
      return null;
    }
  }

  // Retourner les états et fonctions nécessaires
  return {
    state: state,
    score,
    highScore,
    isGameOver,
    isGameReady,
    nightMode,
    showTutorial,
    closeTutorial,
    jump: () => {
      if (isGameOver) return;

      // Ne pas déclencher le saut si le jeu n'est pas prêt
      if (!isGameReady) {
        console.log("Game is not ready yet, setting up game");
        return;
      }

      jump();
    },
    reset,
    rewardUnlocked,
    resetHighScore,
    currentSpeed, // Nouveau: exposer la vitesse actuelle
    playerStats,
    rewardMilestones,
    gameHistory,
  };
}

// À la racine du module (hors de toute fonction), déclare getNextMilestone pour éviter le warning :
function getNextMilestone(current) {
  if (current < 500) return current + 100;
  if (current < 2000) return current + 200;
  return current + Math.floor(current * 0.2); // +20% du dernier palier
}