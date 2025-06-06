import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import Score from '@/app/models/Score.model';
import jwt from 'jsonwebtoken';

// Ajouter cette fonction pour récupérer le highscore
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const gameSlug = searchParams.get('gameSlug');
  
  if (!gameSlug) {
    return NextResponse.json({ message: "Paramètre gameSlug manquant" }, { status: 400 });
  }
  
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  // Si l'utilisateur n'est pas connecté, retourner un score de 0
  if (!token) {
    return NextResponse.json({ highscore: 0 }, { status: 200 });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
    
    // Récupérer le meilleur score pour cet utilisateur et ce jeu
    const bestScore = await Score.findOne({ 
      userId, 
      gameSlug 
    }).sort({ score: -1 }).limit(1);
    
    return NextResponse.json({ 
      highscore: bestScore ? bestScore.score : 0 
    });
  } catch (err) {
    return NextResponse.json({ highscore: 0, error: err }, { status: 200 });
  }
}

// Modifier la fonction POST pour vérifier les récompenses
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: "Non connecté" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;

    const { score, gameSlug } = body;

    if (typeof score !== "number" || !gameSlug) {
      return NextResponse.json({ message: "Score ou jeu manquant" }, { status: 400 });
    }

    // Enregistrer le nouveau score
    await Score.create({
      userId,
      score,
      gameSlug,
    });

    // Récupérer le meilleur score de l'utilisateur pour ce jeu
    const highscore = await Score.findOne({ 
      userId, 
      gameSlug 
    }).sort({ score: -1 }).limit(1);

    // Vérifier si des récompenses peuvent être débloquées
    const REWARD_MILESTONES = [100, 150, 200, 300, 500, 1000];
    const currentScore = highscore.score; // On utilise le highscore stocké en BDD
    
    // Vérifier les paliers éligibles
    const eligibleMilestones = REWARD_MILESTONES.filter(m => currentScore >= m);
    
    // Créer les récompenses non existantes
    let newReward = null;
    
    if (eligibleMilestones.length > 0) {
      // Import dynamique pour éviter des problèmes de dépendances circulaires
      const Reward = (await import('@/app/models/Reward.model')).default;
      
      // Vérifier chaque palier
      for (const milestone of eligibleMilestones) {
        // Vérifier si la récompense existe déjà
        const rewardExists = await Reward.findOne({ userId, gameSlug, milestone });
        
        if (!rewardExists) {
          // Appeler l'API de récompenses (version simplifiée)
          try {
            const response = await fetch(new URL('/api/rewards', req.url).toString(), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
              },
              body: JSON.stringify({ milestone, gameSlug })
            });
            
            if (response.ok) {
              const data = await response.json();
              if (data.reward) {
                newReward = data.reward;
                // Sortir de la boucle après avoir créé la première récompense
                break;
              }
            }
          } catch (err) {
            console.error("Erreur lors de la création de récompense:", err);
          }
        }
      }
    }

    return NextResponse.json({ 
      message: "Score enregistré", 
      highscore: currentScore,
      reward: newReward
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Token invalide ou erreur serveur", error: err?.message }, { status: 403 });
  }
}