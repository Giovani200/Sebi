'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// // Définir les langues supportées
// export const locales = ['fr', 'en'];
// export const defaultLocale = 'fr';

// Ressources de traduction
const resources = {
    fr: {
        common: {
            "welcome": "Bienvenue aux",
            "littleAdventurers": "Petits Aventuriers",
            "heroGreeting": "Salut petit aventurier ! 👋",
            "heroIntro": "Je m'appelle Sebi ! Je serai ton guide tout au long de ton aventure !",
            "heroHelp": "Clique sur moi en bas à droite quand tu as besoin d'aide 😉 !",
            "startAdventure": "Commencer l'aventure !",
            "companions": "Tes compagnons d'aventure",
            "sebi": {
                "name": "Sebi la gazelle",
                "description": "Salut ! Je suis Sebi, une gazelle aventurière qui adore explorer la savane. Je suis rapide comme le vent !",
                "cta": "Jouer avec Sebi"
            },
            "james": {
                "name": "James le hibou",
                "description": "Bonjour ! Je suis James, un hibou qui adore les mathématiques. Avec moi, tu découvriras que les maths peuvent être amusantes !",
                "cta": "Jouer avec James"
            },
            "switchLanguage": "Switch to English",
            "soundControl": {
                "turnOn": "Activer le son",
                "turnOff": "Désactiver le son"
            },
            "nav": {
                "home": "Accueil",
                "games": "Jeux",
                "scores": "Scores et Classement",
                "stars": "Mes Étoiles",
                "register": "Inscription",
                "login": "Connexion",
                "logout": "Déconnexion",
                "exit": "Quitter",
                "enter": "Entrer"
            },
            "footer": {
                "tagline": "Des jeux amusants pour les petits explorateurs !",
                "ourPages": "Nos pages",
                "forParents": "Pour les parents",
                "privacy": "Confidentialité",
                "legal": "Mentions légales",
                "help": "Aide",
                "contactUs": "Contactez-nous",
                "seeYouSoon": "À bientôt pour de nouvelles aventures !",
                "copyright": "Créé avec ❤️ pour les enfants curieux"
            },
            "gamesPage": {
                "title": "À quoi veux-tu jouer aujourd'hui ?",
                "subtitle": "Choisis ton compagnon d'aventure !",
                "playNow": "Jouer maintenant !",
                "sebiCard": {
                    "title": "Joue avec Sebi !",
                    "description": "Aide Sebi à sauter par-dessus les obstacles !"
                },
                "jamesCard": {
                    "title": "Joue avec James !",
                    "description": "Résous des énigmes avec James le hibou !"
                }
            },
            "game": {
                "title": "Sebi Runner",
                "instructions": "Aide Sebi à sauter par-dessus les obstacles !",
                "actions": {
                    "jump": "Sauter",
                    "collect": "Collecter",
                    "avoid": "Éviter"
                },
                "startButton": "Commencer l'aventure !",
                "controls": "Appuie sur Espace ou Clique pour sauter",
                "gameOver": "Partie terminée",
                "yourScore": "Ton score",
                "newRecord": "Nouveau Record !",
                "bestScore": "Ton meilleur score",
                "playAgain": "Rejouer",
                "resetRecord": "Effacer record",
                "encouragement": "N'abandonne pas, Sebi a besoin de toi !",
                "scoreLabel": "Score",
                "bestLabel": "Meilleur",
                "nightMode": "Mode nuit"
            },
            "leaderboard": {
                "loading": "Chargement du classement...",
                "title": "Super Champions",
                "subtitle": "Les meilleurs joueurs toutes catégories",
                "globalPodium": "Grand Podium Général",
                "topSebi": "Top 3 Sebi Runner",
                "sebiRanking": "Classement Sebi",
                "topJames": "Top 3 James le Hibou",
                "jamesRanking": "Classement James - À venir",
                "points": "pts",
                "games": "parties",
                "gamesSingular": "partie",
                "noScores": "Pas encore de scores pour les jeux Sebi !",
                "startPlaying": "Commence à jouer aux jeux Sebi pour apparaître dans le classement.",
                "comingSoon": "Le Top 3 James arrive bientôt !",
                "jamesGames": "James le hibou prépare des jeux passionnants et éducatifs pour toi.",
                "jamesRankingMessage": "Les classements des jeux James seront bientôt disponibles !",
                "encouragement": "Continue à jouer pour devenir le roi des jeux !"
            },
            "rewards": {
                "loading": "Chargement de tes trésors...",
                "title": "Mon Trésor de Récompenses",
                "subtitle": "Regarde tous les trésors que tu as gagnés !",
                "emptyChestAlt": "Coffre au trésor vide",
                "emptyChest": "Ton coffre est vide !",
                "noRewardsYet": "Tu n'as pas encore de récompenses dans ta collection.",
                "playToEarn": "Joue aux jeux et gagne des points pour remplir ton coffre au trésor !",
                "startAdventure": "Partir à l'aventure !",
                "yourRewards": "Tes Super Récompenses",
                "rewardImage": "Récompense niveau {{milestone}}",
                "level": "Niveau {{level}}",
                "obtainedOn": "Obtenu le",
                "encouragement": "Continue à jouer pour gagner encore plus de trésors !",
                "awesome": "Super !"
            },
            "notFound": {
                "title": "Oups !",
                "message": "On dirait que tu t'es perdu dans la forêt...",
                "homeButton": "Retour à l'accueil",
                "imageAlt": "Image de forêt 404"
            },
            "register": {
                "title": "Rejoins l'aventure !",
                "subtitle": "Crée ton compte pour jouer avec Sebi",
                "sebiAlt": "Sebi la gazelle",
                "fields": {
                    "firstName": "Prénom",
                    "lastName": "Nom",
                    "email": "Email",
                    "age": "Âge",
                    "password": "Mot de passe"
                },
                "placeholders": {
                    "firstName": "Ton prénom",
                    "lastName": "Ton nom",
                    "email": "Ton adresse email",
                    "age": "Ton âge",
                    "password": "Choisis un mot de passe",
                    "parentEmail": "Email du parent"
                },
                "parentEmailNotice": "Moins de 14 ans ? Un email parent est requis",
                "buttons": {
                    "register": "S'inscrire",
                    "login": "Connexion"
                },
                "loading": "Inscription en cours...",
                "success": "Inscription réussie !",
                "errors": {
                    "allFieldsRequired": "Tous les champs sont obligatoires.",
                    "parentEmailRequired": "L'email d'un parent est requis pour les moins de 14 ans.",
                    "registrationError": "Erreur lors de l'inscription",
                    "serverConnection": "Problème de connexion au serveur"
                }
            },
            "login": {
                "title": "Bienvenue !",
                "subtitle": "Connectez-vous pour jouer avec Sebi",
                "sebiAlt": "Sebi la gazelle",
                "fields": {
                    "email": "Email",
                    "password": "Mot de passe"
                },
                "placeholders": {
                    "email": "Votre adresse email",
                    "password": "Votre mot de passe"
                },
                "buttons": {
                    "login": "Se connecter",
                    "register": "Créer un compte"
                },
                "forgotPassword": "Mot de passe oublié ?",
                "or": "ou",
                "success": "Connexion réussie !"
            },
            "sebiGuide": {
                "altText": "Sebi la gazelle - ton guide",
                "closeMessage": "Fermer le message",
                "minimize": "Réduire Sebi",
                "expand": "Agrandir Sebi",
                "pages": {
                    "home": "Bienvenue sur Sebi ! Clique sur 'Commencer l'aventure' pour jouer à des jeux amusants !",
                    "games": "Choisis un jeu et amuse-toi ! Tu peux gagner des étoiles en jouant !",
                    "sebiGame": "Bienvenue dans mon jeu de course ! Utilise les flèches pour m'aider à éviter les obstacles et attraper les étoiles !",
                    "jamesGame": "Bonjour ! Dans mon jeu de maths, tu dois résoudre des additions et des soustractions. Plus tu es rapide, plus tu gagnes de points !",
                    "leaderboard": "Voici les meilleurs joueurs ! Joue beaucoup pour apparaître ici !",
                    "rewards": "Regarde toutes les récompenses que tu as gagnées en jouant !",
                    "login": "Entre ton nom et ton mot de passe pour jouer !",
                    "register": "Crée ton compte pour commencer l'aventure !",
                    "default": "Explore cette page ! Je suis là si tu as besoin d'aide !"
                }
            },

            "confirmation": {
                "sebiAlt": "Sebi la gazelle",
                "title": "Votre inscription a été validée avec succès !",
                "message": "Merci d'avoir rejoint l'aventure Sebi ! Vous pouvez désormais accéder à toutes les fonctionnalités de la plateforme.",
                "loginButton": "Se connecter"
            },

            "resetPassword": {
                "sebiAlt": "Sebi la gazelle",
                "title": "Nouveau mot de passe",
                "subtitle": "Choisissez un mot de passe sécurisé",
                "fields": {
                    "newPassword": "Nouveau mot de passe",
                    "confirmPassword": "Confirmation"
                },
                "placeholders": {
                    "newPassword": "Votre nouveau mot de passe",
                    "confirmPassword": "Confirmez votre mot de passe"
                },
                "buttons": {
                    "reset": "Réinitialiser mon mot de passe",
                    "backToLogin": "Retour à la connexion"
                },
                "errors": {
                    "invalidLink": "Lien invalide ou expiré.",
                    "passwordsMatch": "Les mots de passe ne correspondent pas."
                },
                "success": "Mot de passe réinitialisé avec succès !"
            },
            "forgotPassword": {
                "sebiAlt": "Sebi la gazelle",
                "title": "Mot de passe oublié ?",
                "subtitle": "Pas de panique ! Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
                "fields": {
                    "email": "Adresse email"
                },
                "placeholders": {
                    "email": "VOTRE EMAIL"
                },
                "buttons": {
                    "sendLink": "Envoyer le lien",
                    "backToLogin": "Retour à la connexion"
                },
                "emailSent": "Email envoyé !",
                "success": "Email de réinitialisation envoyé (si le compte existe)."
            },
            "legal": {
                "title": "Mentions légales",
                "editor": {
                    "title": "1. Éditeur du site",
                    "text": "Le site Sebi la Gazelle est édité par :",
                    "responsible": "Nom du responsable",
                    "names": "Sosthene-Giovani Kloussey, Enzo Couteau, Zamblezi Jean-David",
                    "contact": "Contact",
                    "status": "Statut",
                    "statusText": "Projet étudiant / Site éducatif à but non lucratif"
                },
                "hosting": {
                    "title": "2. Hébergement",
                    "text": "Le site est hébergé par :",
                    "name": "Nom de l'hébergeur",
                    "address": "Adresse",
                    "addressText": "Chem. des Pardiaux, 63000 Clermont-Ferrand",
                    "website": "Site Web"
                },
                "intellectual": {
                    "title": "3. Propriété intellectuelle",
                    "text": "Tous les éléments du site (textes, illustrations, logo, nom \"Sebi la Gazelle\", etc.) sont la propriété exclusive de l'éditeur, sauf mention contraire.",
                    "reproduction": "Toute reproduction ou utilisation non autorisée est interdite."
                },
                "data": {
                    "title": "4. Protection des données personnelles",
                    "intro": "Conformément au Règlement Général sur la Protection des Données (RGPD – UE) et aux lois internationales applicables :",
                    "point1": "Aucune donnée personnelle n'est collectée sans consentement.",
                    "point2": "Les données éventuellement collectées via formulaire (email, prénom…) sont destinées uniquement à un usage pédagogique ou de contact.",
                    "point3": "L'utilisateur peut à tout moment demander la suppression de ses données à l'adresse : lagazellesebi@gmail.com.",
                    "point4": "Aucune donnée n'est revendue à des tiers."
                },
                "cookies": {
                    "title": "5. Cookies",
                    "text": "Le site peut utiliser des cookies à des fins de navigation ou d'analyse statistique anonymisée.",
                    "config": "L'utilisateur peut configurer son navigateur pour les refuser ou les supprimer."
                },
                "responsibility": {
                    "title": "6. Responsabilité",
                    "text": "L'éditeur ne saurait être tenu responsable des erreurs typographiques, techniques ou des dysfonctionnements liés à l'hébergement ou à des services tiers."
                },
                "law": {
                    "title": "7. Droit applicable",
                    "text": "Le présent site est soumis au droit international et aux législations en vigueur dans le pays de l'utilisateur. En cas de litige, une solution amiable sera toujours privilégiée."
                }
            },
            "privacy": {
                "title": "Politique de confidentialité",
                "lastUpdate": "Dernière mise à jour",
                "introduction": "Chez Sebi Kids, la confidentialité de vos données est une priorité. Cette politique de confidentialité explique quelles données nous collectons, comment nous les utilisons et quels sont vos droits, conformément au Règlement Général sur la Protection des Données (RGPD) et autres réglementations applicables.",
                "backToHome": "Retour à l'accueil",

                "whoWeAre": {
                    "title": "1. Qui sommes-nous ?",
                    "text": "Sebi Kids est un projet éducatif numérique destiné aux enfants de 4 à 8 ans.",
                    "responsible": "Responsable du traitement",
                    "name": "Nom",
                    "names": "Sosthene-Giovani Kloussey, Enzo Couteau, Zamblezie Jean-David",
                    "email": "Email de contact"
                },

                "dataCollected": {
                    "title": "2. Quelles données collectons-nous ?",
                    "text": "Nous pouvons collecter les données suivantes :",
                    "personalData": "a. Données personnelles (uniquement si volontairement fournies) :",
                    "personal1": "Prénom ou pseudo",
                    "personal2": "Âge",
                    "personal3": "Adresse e-mail (parentale si nécessaire)",
                    "personal4": "Données de connexion (avec consentement)",
                    "technicalData": "b. Données techniques :",
                    "technical1": "Navigateur et système d'exploitation",
                    "technical2": "Pages visitées",
                    "technical3": "Cookies (voir section 5)"
                },

                "whyCollect": {
                    "title": "3. Pourquoi collectons-nous ces données ?",
                    "text": "Vos données sont collectées uniquement pour :",
                    "reason1": "Permettre l'accès à certaines fonctionnalités du site",
                    "reason2": "Enregistrer la progression de l'enfant",
                    "reason3": "Fournir un classement ou des récompenses ludiques",
                    "reason4": "Améliorer l'expérience utilisateur",
                    "reason5": "Répondre à vos demandes via le mail de contact",
                    "noExcess": "Nous ne collectons pas plus de données que nécessaire."
                },

                "legalBasis": {
                    "title": "4. Base légale du traitement",
                    "text": "Les données sont traitées sur la base de :",
                    "basis1": "Votre consentement (formulaire, cookies, création de profil)",
                    "basis2": "L'intérêt légitime de l'éditeur (amélioration de la plateforme)",
                    "basis3": "L'obligation légale si requise (ex. : sécurité, contentieux)"
                },

                "cookies": {
                    "title": "5. Utilisation des cookies",
                    "text": "Des cookies peuvent être utilisés pour :",
                    "purpose1": "Enregistrer les préférences linguistiques",
                    "purpose2": "Éviter de ressaisir certaines données",
                    "purpose3": "Analyser la navigation à des fins anonymes de statistiques",
                    "settings": "Vous pouvez refuser ou paramétrer les cookies à tout moment via votre navigateur."
                },

                "retention": {
                    "title": "6. Combien de temps conservons-nous les données ?",
                    "text": "Les données sont conservées :",
                    "period1": "Le temps nécessaire à leur finalité",
                    "period2": "Maximum 12 mois pour les données de navigation",
                    "period3": "Jusqu'à demande de suppression pour les comptes créés"
                },

                "rights": {
                    "title": "7. Vos droits (RGPD)",
                    "text": "Vous pouvez à tout moment exercer vos droits :",
                    "right1": "Droit d'accès à vos données",
                    "right2": "Droit de rectification",
                    "right3": "Droit d'effacement (\"droit à l'oubli\")",
                    "right4": "Droit à la portabilité",
                    "right5": "Droit d'opposition au traitement",
                    "right6": "Droit de retrait du consentement",
                    "contact": "Contact",
                    "complaint": "Vous avez également le droit d'introduire une réclamation auprès de la CNIL (France) ou de l'autorité compétente de votre pays."
                },

                "sharing": {
                    "title": "8. Partage des données",
                    "text": "Aucune donnée personnelle n'est vendue ou partagée à des tiers, sauf obligation légale.",
                    "hosting": "Les données peuvent être hébergées sur des serveurs sécurisés situés en Europe ou dans des pays reconnus comme offrant une protection équivalente (ex. : via des clauses contractuelles types)."
                },

                "children": {
                    "title": "9. Protection des enfants",
                    "text": "Le site est destiné aux enfants, mais toute collecte de données personnelles se fait avec le consentement des parents ou responsables légaux, conformément au RGPD (art. 8).",
                    "noCollection": "Nous ne collectons ni ne traitons sciemment de données personnelles d'enfants sans ce consentement."
                },

                "changes": {
                    "title": "10. Modifications de la politique",
                    "text": "Nous pouvons mettre à jour cette politique à tout moment. La date de mise à jour sera affichée en haut du document. Nous vous conseillons de la consulter régulièrement."
                }
            },


        }
    },
    en: {
        common: {
            "welcome": "Welcome to",
            "littleAdventurers": "Little Adventurers",
            "heroGreeting": "Hi little adventurer! 👋",
            "heroIntro": "My name is Sebi! I'll be your guide throughout your adventure!",
            "heroHelp": "Click on me in the bottom right when you need help 😉!",
            "startAdventure": "Start the adventure!",
            "companions": "Your adventure companions",
            "sebi": {
                "name": "Sebi the gazelle",
                "description": "Hi! I'm Sebi, an adventurous gazelle who loves exploring the savannah. I'm as fast as the wind!",
                "cta": "Play with Sebi"
            },
            "james": {
                "name": "James the owl",
                "description": "Hello! I'm James, an owl who loves mathematics. With me, you'll discover that math can be fun!",
                "cta": "Play with James"
            },
            "switchLanguage": "Passer en français",
            "soundControl": {
                "turnOn": "Turn on sound",
                "turnOff": "Turn off sound"
            },
            "nav": {
                "home": "Home",
                "games": "Games",
                "scores": "Scores & Ranking",
                "stars": "My Stars",
                "register": "Sign Up",
                "login": "Login",
                "logout": "Logout",
                "exit": "Exit",
                "enter": "Enter"
            },
            "footer": {
                "tagline": "Fun games for little explorers!",
                "ourPages": "Our pages",
                "forParents": "For parents",
                "privacy": "Privacy Policy",
                "legal": "Legal Notice",
                "help": "Help",
                "contactUs": "Contact us",
                "seeYouSoon": "See you soon for new adventures!",
                "copyright": "Created with ❤️ for curious children"
            },
            "gamesPage": {
                "title": "What do you want to play today?",
                "subtitle": "Choose your adventure companion!",
                "playNow": "Play now!",
                "sebiCard": {
                    "title": "Play with Sebi!",
                    "description": "Help Sebi jump over obstacles!"
                },
                "jamesCard": {
                    "title": "Play with James!",
                    "description": "Solve puzzles with James the owl!"
                }
            },
            "game": {
                "title": "Sebi Runner",
                "instructions": "Help Sebi jump over obstacles!",
                "actions": {
                    "jump": "Jump",
                    "collect": "Collect",
                    "avoid": "Avoid"
                },
                "startButton": "Start the adventure!",
                "controls": "Press Space or Click to jump",
                "gameOver": "Game Over",
                "yourScore": "Your score",
                "newRecord": "New Record!",
                "bestScore": "Your best score",
                "playAgain": "Play again",
                "resetRecord": "Reset record",
                "encouragement": "Don't give up, Sebi needs you!",
                "scoreLabel": "Score",
                "bestLabel": "Best",
                "nightMode": "Night mode"
            },
            "leaderboard": {
                "loading": "Loading leaderboard...",
                "title": "Super Champions",
                "subtitle": "The best players in all categories",
                "globalPodium": "Grand General Podium",
                "topSebi": "Top 3 Sebi Runner",
                "sebiRanking": "Sebi Ranking",
                "topJames": "Top 3 James the Owl",
                "jamesRanking": "James Ranking - Coming Soon",
                "points": "pts",
                "games": "games",
                "gamesSingular": "game",
                "noScores": "No scores for Sebi games yet!",
                "startPlaying": "Start playing Sebi games to appear in the ranking.",
                "comingSoon": "Top 3 James coming soon!",
                "jamesGames": "James the owl is preparing exciting and educational games for you.",
                "jamesRankingMessage": "Rankings for James games will be available soon!",
                "encouragement": "Keep playing to become the king of games!"
            },
            "rewards": {
                "loading": "Loading your treasures...",
                "title": "My Treasure of Rewards",
                "subtitle": "Look at all the treasures you have earned!",
                "emptyChestAlt": "Empty treasure chest",
                "emptyChest": "Your chest is empty!",
                "noRewardsYet": "You don't have any rewards in your collection yet.",
                "playToEarn": "Play games and earn points to fill your treasure chest!",
                "startAdventure": "Start the adventure!",
                "yourRewards": "Your Super Rewards",
                "rewardImage": "Level {{milestone}} reward",
                "level": "Level {{level}}",
                "obtainedOn": "Obtained on",
                "encouragement": "Keep playing to earn even more treasures!",
                "awesome": "Awesome!"
            },
            "notFound": {
                "title": "Oops!",
                "message": "It looks like you got lost in the forest...",
                "homeButton": "Back to home",
                "imageAlt": "404 Forest image"
            },
            "register": {
                "title": "Join the adventure!",
                "subtitle": "Create your account to play with Sebi",
                "sebiAlt": "Sebi the gazelle",
                "fields": {
                    "firstName": "First Name",
                    "lastName": "Last Name",
                    "email": "Email",
                    "age": "Age",
                    "password": "Password"
                },
                "placeholders": {
                    "firstName": "Your first name",
                    "lastName": "Your last name",
                    "email": "Your email address",
                    "age": "Your age",
                    "password": "Choose a password",
                    "parentEmail": "Parent's email"
                },
                "parentEmailNotice": "Under 14? A parent's email is required",
                "buttons": {
                    "register": "Register",
                    "login": "Login"
                },
                "loading": "Registering...",
                "success": "Registration successful!",
                "errors": {
                    "allFieldsRequired": "All fields are required.",
                    "parentEmailRequired": "A parent's email is required for children under 14.",
                    "registrationError": "Error during registration",
                    "serverConnection": "Problem connecting to server"
                }
            },
            "login": {
                "title": "Welcome!",
                "subtitle": "Log in to play with Sebi",
                "sebiAlt": "Sebi the gazelle",
                "fields": {
                    "email": "Email",
                    "password": "Password"
                },
                "placeholders": {
                    "email": "Your email address",
                    "password": "Your password"
                },
                "buttons": {
                    "login": "Log in",
                    "register": "Create an account"
                },
                "forgotPassword": "Forgot password?",
                "or": "or",
                "success": "Login successful!"
            },
            "sebiGuide": {
                "altText": "Sebi the gazelle - your guide",
                "closeMessage": "Close message",
                "minimize": "Minimize Sebi",
                "expand": "Expand Sebi",
                "pages": {
                    "home": "Welcome to Sebi! Click on 'Start the adventure' to play fun games!",
                    "games": "Choose a game and have fun! You can earn stars by playing!",
                    "sebiGame": "Welcome to my running game! Use the arrows to help me avoid obstacles and catch stars!",
                    "jamesGame": "Hello! In my math game, you need to solve additions and subtractions. The faster you are, the more points you earn!",
                    "leaderboard": "Here are the best players! Play a lot to appear here!",
                    "rewards": "Look at all the rewards you've earned by playing!",
                    "login": "Enter your name and password to play!",
                    "register": "Create your account to start the adventure!",
                    "default": "Explore this page! I'm here if you need help!"
                }
            },

            "confirmation": {
                "sebiAlt": "Sebi the gazelle",
                "title": "Your registration has been successfully validated!",
                "message": "Thank you for joining the Sebi adventure! You can now access all the features of the platform.",
                "loginButton": "Log in"
            },

            "resetPassword": {
                "sebiAlt": "Sebi the gazelle",
                "title": "New password",
                "subtitle": "Choose a secure password",
                "fields": {
                    "newPassword": "New password",
                    "confirmPassword": "Confirmation"
                },
                "placeholders": {
                    "newPassword": "Your new password",
                    "confirmPassword": "Confirm your password"
                },
                "buttons": {
                    "reset": "Reset my password",
                    "backToLogin": "Back to login"
                },
                "errors": {
                    "invalidLink": "Invalid or expired link.",
                    "passwordsMatch": "Passwords do not match."
                },
                "success": "Password reset successfully!"
            },
            "forgotPassword": {
                "sebiAlt": "Sebi the gazelle",
                "title": "Forgot password?",
                "subtitle": "Don't panic! Enter your email address and we'll send you a link to reset your password.",
                "fields": {
                    "email": "Email address"
                },
                "placeholders": {
                    "email": "YOUR EMAIL"
                },
                "buttons": {
                    "sendLink": "Send link",
                    "backToLogin": "Back to login"
                },
                "emailSent": "Email sent!",
                "success": "Reset email sent (if account exists)."
            },
            // Dans votre objet de ressources, ajoutez ces traductions :

            // Pour le français (fr.common)
            "legal": {
                "title": "Mentions légales",
                "editor": {
                    "title": "1. Éditeur du site",
                    "text": "Le site Sebi la Gazelle est édité par :",
                    "responsible": "Nom du responsable",
                    "names": "Sosthene-Giovani Kloussey, Enzo Couteau, Zamblezi Jean-David",
                    "contact": "Contact",
                    "status": "Statut",
                    "statusText": "Projet étudiant / Site éducatif à but non lucratif",
                    "backToHome": "Retour à l'accueil",
                },
                "hosting": {
                    "title": "2. Hébergement",
                    "text": "Le site est hébergé par :",
                    "name": "Nom de l'hébergeur",
                    "address": "Adresse",
                    "addressText": "Chem. des Pardiaux, 63000 Clermont-Ferrand",
                    "website": "Site Web"
                },
                "intellectual": {
                    "title": "3. Propriété intellectuelle",
                    "text": "Tous les éléments du site (textes, illustrations, logo, nom \"Sebi la Gazelle\", etc.) sont la propriété exclusive de l'éditeur, sauf mention contraire.",
                    "reproduction": "Toute reproduction ou utilisation non autorisée est interdite."
                },
                "data": {
                    "title": "4. Protection des données personnelles",
                    "intro": "Conformément au Règlement Général sur la Protection des Données (RGPD – UE) et aux lois internationales applicables :",
                    "point1": "Aucune donnée personnelle n'est collectée sans consentement.",
                    "point2": "Les données éventuellement collectées via formulaire (email, prénom…) sont destinées uniquement à un usage pédagogique ou de contact.",
                    "point3": "L'utilisateur peut à tout moment demander la suppression de ses données à l'adresse : lagazellesebi@gmail.com.",
                    "point4": "Aucune donnée n'est revendue à des tiers."
                },
                "cookies": {
                    "title": "5. Cookies",
                    "text": "Le site peut utiliser des cookies à des fins de navigation ou d'analyse statistique anonymisée.",
                    "config": "L'utilisateur peut configurer son navigateur pour les refuser ou les supprimer."
                },
                "responsibility": {
                    "title": "6. Responsabilité",
                    "text": "L'éditeur ne saurait être tenu responsable des erreurs typographiques, techniques ou des dysfonctionnements liés à l'hébergement ou à des services tiers."
                },
                "law": {
                    "title": "7. Droit applicable",
                    "text": "Le présent site est soumis au droit international et aux législations en vigueur dans le pays de l'utilisateur. En cas de litige, une solution amiable sera toujours privilégiée."
                }
            },

            // Pour l'anglais (en.common)
            "legal": {
                "title": "Legal Notice",
                "editor": {
                    "title": "1. Website Editor",
                    "text": "The Sebi la Gazelle website is edited by:",
                    "responsible": "Responsible person",
                    "names": "Sosthene-Giovani Kloussey, Enzo Couteau, Zamblezi Jean-David",
                    "contact": "Contact",
                    "status": "Status",
                    "statusText": "Student project / Non-profit educational website",
                    "backToHome": "Back to home",
                },
                "hosting": {
                    "title": "2. Hosting",
                    "text": "The site is hosted by:",
                    "name": "Host name",
                    "address": "Address",
                    "addressText": "Chem. des Pardiaux, 63000 Clermont-Ferrand, France",
                    "website": "Website"
                },
                "intellectual": {
                    "title": "3. Intellectual Property",
                    "text": "All elements of the site (texts, illustrations, logo, name \"Sebi la Gazelle\", etc.) are the exclusive property of the editor, unless otherwise stated.",
                    "reproduction": "Any unauthorized reproduction or use is prohibited."
                },
                "data": {
                    "title": "4. Personal Data Protection",
                    "intro": "In accordance with the General Data Protection Regulation (GDPR - EU) and applicable international laws:",
                    "point1": "No personal data is collected without consent.",
                    "point2": "Data potentially collected through forms (email, first name...) is intended solely for educational or contact purposes.",
                    "point3": "Users can request the deletion of their data at any time by contacting: lagazellesebi@gmail.com.",
                    "point4": "No data is sold to third parties."
                },
                "cookies": {
                    "title": "5. Cookies",
                    "text": "The site may use cookies for navigation purposes or anonymized statistical analysis.",
                    "config": "Users can configure their browser to refuse or delete them."
                },
                "responsibility": {
                    "title": "6. Responsibility",
                    "text": "The editor cannot be held responsible for typographical or technical errors, or malfunctions related to hosting or third-party services."
                },
                "law": {
                    "title": "7. Applicable Law",
                    "text": "This site is subject to international law and the legislation in force in the user's country. In case of dispute, an amicable solution will always be preferred."
                }
            },
            "privacy": {
                "title": "Privacy Policy",
                "lastUpdate": "Last updated",
                "introduction": "At Sebi Kids, the privacy of your data is a priority. This privacy policy explains what data we collect, how we use it, and what your rights are, in accordance with the General Data Protection Regulation (GDPR) and other applicable regulations.",
                "backToHome": "Back to home",

                "whoWeAre": {
                    "title": "1. Who are we?",
                    "text": "Sebi Kids is a digital educational project for children ages 4 to 8.",
                    "responsible": "Data controller",
                    "name": "Name",
                    "names": "Sosthene-Giovani Kloussey, Enzo Couteau, Zamblezie Jean-David",
                    "email": "Contact email"
                },

                "dataCollected": {
                    "title": "2. What data do we collect?",
                    "text": "We may collect the following data:",
                    "personalData": "a. Personal data (only if voluntarily provided):",
                    "personal1": "First name or nickname",
                    "personal2": "Age",
                    "personal3": "Email address (parental if necessary)",
                    "personal4": "Connection data (with consent)",
                    "technicalData": "b. Technical data:",
                    "technical1": "Browser and operating system",
                    "technical2": "Pages visited",
                    "technical3": "Cookies (see section 5)"
                },

                "whyCollect": {
                    "title": "3. Why do we collect this data?",
                    "text": "Your data is collected only to:",
                    "reason1": "Allow access to certain features of the site",
                    "reason2": "Record the child's progress",
                    "reason3": "Provide rankings or fun rewards",
                    "reason4": "Improve user experience",
                    "reason5": "Respond to your requests via contact email",
                    "noExcess": "We do not collect more data than necessary."
                },

                "legalBasis": {
                    "title": "4. Legal basis for processing",
                    "text": "Data is processed on the basis of:",
                    "basis1": "Your consent (form, cookies, profile creation)",
                    "basis2": "The legitimate interest of the publisher (platform improvement)",
                    "basis3": "Legal obligation if required (e.g., security, litigation)"
                },

                "cookies": {
                    "title": "5. Use of cookies",
                    "text": "Cookies may be used to:",
                    "purpose1": "Save language preferences",
                    "purpose2": "Avoid re-entering certain data",
                    "purpose3": "Analyze navigation for anonymous statistical purposes",
                    "settings": "You can refuse or configure cookies at any time via your browser."
                },

                "retention": {
                    "title": "6. How long do we keep data?",
                    "text": "Data is kept:",
                    "period1": "For the time necessary for its purpose",
                    "period2": "Maximum 12 months for navigation data",
                    "period3": "Until deletion request for created accounts"
                },

                "rights": {
                    "title": "7. Your rights (GDPR)",
                    "text": "You can exercise your rights at any time:",
                    "right1": "Right of access to your data",
                    "right2": "Right to rectification",
                    "right3": "Right to erasure (\"right to be forgotten\")",
                    "right4": "Right to data portability",
                    "right5": "Right to object to processing",
                    "right6": "Right to withdraw consent",
                    "contact": "Contact",
                    "complaint": "You also have the right to lodge a complaint with the CNIL (France) or the competent authority in your country."
                },

                "sharing": {
                    "title": "8. Data sharing",
                    "text": "No personal data is sold or shared with third parties, except as required by law.",
                    "hosting": "Data may be hosted on secure servers located in Europe or in countries recognized as offering equivalent protection (e.g., via standard contractual clauses)."
                },

                "children": {
                    "title": "9. Protection of children",
                    "text": "The site is intended for children, but any collection of personal data is done with the consent of parents or legal guardians, in accordance with the GDPR (art. 8).",
                    "noCollection": "We do not knowingly collect or process personal data from children without this consent."
                },

                "changes": {
                    "title": "10. Policy changes",
                    "text": "We may update this policy at any time. The update date will be displayed at the top of the document. We recommend that you consult it regularly."
                }
            }
        }
    }
};

// Initialisation d'i18next
i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fr', // Langue par défaut
        fallbackLng: 'fr',
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

// Ajoutez cette fonction pour sauvegarder la langue dans localStorage
i18next.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});

export default i18next;