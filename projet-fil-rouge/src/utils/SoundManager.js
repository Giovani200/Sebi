/**
 * Gestionnaire de sons pour le jeu Sebi Runner
 * Permet de gérer les sons avec plus de flexibilité et de robustesse
 */

class SoundManager {
  constructor() {
    this.sounds = {};
    this.volume = 0.5;
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
          pause: () => {},
          addEventListener: () => {},
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
   * Change le volume global
   * @param {number} volume - Volume entre 0 et 1
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    for (const sound of Object.values(this.sounds)) {
      sound.volume = this.isMobile ? this.volume * 0.6 : this.volume;
    }
  }

  /**
   * Active/désactive les sons
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
    }
  }
}

// Créer et exporter une instance unique
const soundManager = new SoundManager();
export default soundManager;