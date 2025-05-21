# Rapport d'ajustement des collisions - Sebi Runner

## Modifications effectuées le 19 mai 2025

### Problème résolu
La hitbox de Sebi (la gazelle) était trop large par rapport à l'apparence visuelle du personnage, ce qui causait des collisions qui semblaient injustes ou imprécises pour les joueurs.

### Ajustements de la hitbox de Sebi

1. **Réduction de la largeur de la hitbox**
   - Largeur initiale : 1.5 × hauteur (trop large)
   - Nouvelle largeur : 0.8 × hauteur (plus précise)

2. **Ajustement des marges de collision**
   - Marge horizontale : augmentée de 5% à 20% (réduit davantage la zone de collision)
   - Marge verticale : augmentée de 5% à 10% (légèrement plus indulgente)

3. **Séparation des marges**
   - Marges différentes pour Sebi et les obstacles
   - Sebi : 20% horizontale, 10% verticale
   - Obstacles : 10% horizontale, 10% verticale

### Ajustements visuels

1. **Centrage du sprite sur la hitbox**
   - Calcul d'un offset pour centrer l'image sur la hitbox plus étroite
   - Ajustement des coordonnées de dessin pour maintenir l'apparence visuelle

2. **Adaptation des effets visuels**
   - Ajustement des effets de traînée pendant les sauts
   - Correction des points de rotation

### Ajustements des obstacles

1. **Légère augmentation de la largeur des buissons**
   - Largeur initiale : 0.8 × hauteur
   - Nouvelle largeur : 0.9 × hauteur

## Impact sur le gameplay

Ces ajustements rendent le jeu :
- Plus juste : les collisions correspondent mieux à ce que le joueur voit
- Plus précis : la hitbox de Sebi est maintenant mieux adaptée à sa forme visuelle
- Plus intuitif : les joueurs peuvent estimer plus facilement les distances de saut nécessaires

## Mode DEBUG

Le mode DEBUG (DEBUG_HITBOX = true) permet de visualiser les hitboxes pendant le jeu :
- Vert/jaune : pas de collision
- Rouge : collision détectée

---
*Documentation réalisée le 19 mai 2025*
