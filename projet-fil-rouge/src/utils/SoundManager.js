/**
 * Gestionnaire de sons pour le jeu Sebi Runner
 * Permet de gérer les sons avec plus de flexibilité et de robustesse
 */

class SoundManager {
  constructor() {
    this.sounds = {};
    this.backgroundMusic = null;
    this.volume = 0.5;
    this.musicVolume = 0.3; // Volume plus bas pour la musique de fond
    this.muted = false;
    this.isMobile = this.detectMobile();
  }

  /**
   * Détecte si l'appareil est mobile
   */
  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Charge un son dans le gestionnaire
   * @param {string} key - Clé unique pour le son
   * @param {string} path - Chemin du fichier son
   */
  loadSound(key, path) {
    try {
      const sound = new Audio(path);
      sound.preload = 'auto';

      // Ajuster le volume en fonction du type d'appareil
      sound.volume = this.isMobile ? this.volume * 0.6 : this.volume;

      this.sounds[key] = sound;

      // Pour déboguer
      sound.addEventListener('canplaythrough', () => {
        console.log(`Son ${key} chargé avec succès`);
      });

      sound.addEventListener('error', (error) => {
        console.warn(`Son ${key} non disponible, utilisation d'un son muet.`);
        // Remplacer par un son muet en cas d'erreur
        const dummySound = {
          play: () => Promise.resolve(),
          pause: () => { },
          addEventListener: () => { },
          volume: 0,
          currentTime: 0
        };
        this.sounds[key] = dummySound;
      });

      return true;
    } catch (error) {
      console.error(`Impossible de charger le son ${key}:`, error);
      return false;
    }
  }

  /**
   * Charge plusieurs sons à la fois
   * @param {Object} soundsMap - Objet avec les clés et chemins des sons
   */
  loadSounds(soundsMap) {
    const results = {};
    for (const [key, path] of Object.entries(soundsMap)) {
      results[key] = this.loadSound(key, path);
    }
    return results;
  }

  /**
   * Charge et configure la musique de fond
   * @param {string} path - Chemin du fichier de musique
   */
  loadBackgroundMusic(path) {
    try {
      this.backgroundMusic = new Audio(path);
      this.backgroundMusic.volume = this.musicVolume;
      this.backgroundMusic.loop = true; // La musique se joue en boucle

      console.log(`Musique de fond chargée: ${path}`);

      // Gestion des erreurs
      this.backgroundMusic.onerror = (e) => {
        console.error(`Erreur lors du chargement de la musique: ${path}`, e);
        this.backgroundMusic = null;
      };

      return true;
    } catch (e) {
      console.error(`Impossible de charger la musique: ${path}`, e);
      return false;
    }
  }

  /**
   * Démarre la lecture de la musique de fond
   */
  playBackgroundMusic() {
    if (this.muted || !this.backgroundMusic) return;

    // Promise pour gérer le démarrage de la musique (qui peut être bloqué par le navigateur)
    const playPromise = this.backgroundMusic.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("La lecture automatique de la musique a été empêchée par le navigateur", error);
      });
    }
  }

  /**
   * Met en pause la musique de fond
   */
  pauseBackgroundMusic() {
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
    }
  }

  /**
   * Joue un son avec gestion des erreurs
   * @param {string} key - Clé du son à jouer
   * @param {Object} options - Options (pitchVariation, volume)
   */
  play(key, options = {}) {
    if (this.muted) return;

    try {
      const sound = this.sounds[key];
      if (!sound) {
        console.warn(`Son ${key} non trouvé`);
        return;
      }

      // Réinitialiser et préparer le son
      sound.pause();
      sound.currentTime = 0;

      // Appliquer les options
      if (options.volume !== undefined) {
        sound.volume = options.volume * (this.isMobile ? 0.6 : 1);
      }

      // Ajouter cette ligne
      if (options.loop) {
        sound.loop = true;
      }

      // Variation de hauteur (pitch) pour plus de variété
      if (options.pitchVariation) {
        const variation = (Math.random() * options.pitchVariation * 2) - options.pitchVariation;
        sound.playbackRate = 1 + variation;
      } else {
        sound.playbackRate = 1;
      }

      // Jouer le son avec gestion des promesses
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Impossible de jouer le son ${key}:`, error.message);
        });
      }
    } catch (error) {
      console.error(`Erreur lors de la lecture du son ${key}:`, error);
    }
  }

  /**
   * Change le volume global des effets sonores
   * @param {number} volume - Volume entre 0 et 1
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    for (const sound of Object.values(this.sounds)) {
      sound.volume = this.isMobile ? this.volume * 0.6 : this.volume;
    }
  }

  /**
   * Change le volume de la musique de fond
   * @param {number} volume - Volume entre 0 et 1
   */
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = this.musicVolume;
    }
  }

  /**
   * Active/désactive tous les sons
   * @param {boolean} muted - État muet (true) ou non (false)
   */
  setMuted(muted) {
    this.muted = muted;
    if (muted) {
      // Arrêter tous les sons en cours
      for (const sound of Object.values(this.sounds)) {
        sound.pause();
        sound.currentTime = 0;
      }
      // Arrêter la musique de fond
      this.pauseBackgroundMusic();
    } else if (this.backgroundMusic) {
      // Reprendre la musique quand on réactive le son
      this.playBackgroundMusic();
    }
  }
}

// Créer et exporter une instance unique
const soundManager = new SoundManager();
export default soundManager;