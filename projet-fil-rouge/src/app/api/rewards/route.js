import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reward from '@/app/models/Reward.model';
import jwt from 'jsonwebtoken';
import User from '@/app/models/User.model';
import OpenAI from 'openai';

//openai configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//Fonction pour générer un prompt adapté au jeu et au palier
function generatePrompt(gameSlug, milestone) {
  // Couleurs de base pour les badges selon le palier
  const colors = {
    100: 'blue and bronze',
    150: 'pink and red',
    200: 'purple and silver', 
    300: 'orange and gold',
    500: 'red and platinum',
    1000: 'rainbow colored with gold'
  };
  
  // Icônes selon le jeu
  const gameIcon = {
    'sebi-run': 'running rabbit',
    'memory-match': 'puzzle piece'
  };
  
  // Symboles selon le palier
  const symbols = {
    100: 'star',
    150: 'heart',
    200: 'medal', 
    300: 'ribbon',
    500: 'trophy',
    1000: 'crown'
  };
  
  // Sélection des éléments
  const color = colors[milestone] || 'colorful';
  const icon = gameIcon[gameSlug] || 'rabbit';
  const symbol = symbols[milestone] || 'star';
  
  // Prompt simplifié et direct
  return `A ${color} achievement badge for children with the number ${milestone} in the center. The badge has a ${symbol} shape with a small ${icon} icon. Cartoon style, vibrant colors, clean design. Digital art style suitable for kids.`;
}

// POST = Générer une nouvelle récompense si milestone atteint
export async function POST(req) {
  await connectDB();
  const { milestone, gameSlug } = await req.json();

  const token = req.cookies?.get('token')?.value;
  if (!token) return NextResponse.json({ message: "Non connecté" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    //récupération de l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Vérification si la récompense existe déjà
    const exists = await Reward.findOne({ userId, gameSlug, milestone });
    if (exists) {
      return NextResponse.json({
        message: "Récompense déjà accordée",
        reward: exists
      }, { status: 200 });
    }

    //Génération du prompt personnalisé
    const prompt = generatePrompt(gameSlug, milestone, user.username);

    // Génération de l'image avec OpenAI, l'api de DAL-E
    let imageUrl;
    try {
      console.log("Génération de l'image pour le prompt :", prompt);
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      imageUrl = response.data[0].url;
      console.log("Image générée avec succès:", imageUrl);
    } catch (aierror) {
      console.error("Erreur lors de la génération de l'image:", aierror);

      //Fallback sur DiceBar si 'l IA échoue
      imageUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${userId}-${milestone}-${gameSlug}`;
      console.log("Utilisation de l'image de fallback:", imageUrl);
    }

    // Création de la nouvelle récompense dans la base de données
    const reward = await Reward.create({
      userId,
      milestone,
      gameSlug,
      imageUrl,
      prompt, // Stocker le prompt pour référence future
      generatedAt: new Date(),
      title: `Niveau ${milestone} atteint dans ${gameSlug}!`,
      description: `Félicitations! Tu as atteint ${milestone} points dans le jeu.`
    });

    return NextResponse.json({
      message: "Récompense générée avec succès",
      reward
    }, { status: 201 });
  } catch (err) {
    console.error("Erreur POST reward:", err);
    return NextResponse.json({ message: "Erreur de génération" }, { status: 500 });
  }
}

// GET = Récupérer toutes les récompenses de l'utilisateur connecté
export async function GET(req) {
  await connectDB();

  const token = req.cookies?.get('token')?.value;
  if (!token) return NextResponse.json({ message: "Non connecté" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const rewards = await Reward.find({ userId }).sort({ generatedAt: -1 });
    return NextResponse.json({ rewards });
  } catch (err) {
    console.error("Erreur GET reward:", err);
    return NextResponse.json({ message: "Erreur de récupération" }, { status: 500 });
  }
}
