import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Score from '@/app/models/Score.model';
// import User from '@/app/models/User.model';

export async function GET() {
  try {
    await connectDB();

    // Récupération des meilleurs scores par jeu
    const bestByGameSebi = await Score.aggregate([
      {
        $group: {
          _id: {
            game: "$gameSlug",
            userId: "$userId"
          },
          bestScore: { $max: "$score" }
        }
      },
      {
        $sort: { bestScore: -1 }
      },
      {
        $group: {
          _id: "$_id.game",
          user: { $first: "$_id.userId" },
          bestScore: { $first: "$bestScore" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          game: "$_id",
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            avatar: "$user.avatar"
          },
          bestScore: 1,
          _id: 0
        }
      }
    ]);

    // Top 3 pour le jeu Sebi
    const topSebi = await Score.aggregate([
      { $match: { gameSlug: "sebi-run" } }, // Ajustez selon le slug réel du jeu Sebi
      {
        $group: {
          _id: "$userId",
          bestScore: { $max: "$score" },
          totalScore: { $sum: "$score" },
          gamesPlayed: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            avatar: "$user.avatar"
          },
          bestScore: 1,
          totalScore: 1,
          gamesPlayed: 1
        }
      },
      { $sort: { bestScore: -1 } },
      { $limit: 3 }
    ]);

    // Top 3 pour le jeu James (quand il sera disponible)
    const topJames = await Score.aggregate([
      { $match: { gameSlug: "james-hibou" } }, // Ajustez selon le slug réel du jeu James
      {
        $group: {
          _id: "$userId",
          bestScore: { $max: "$score" },
          totalScore: { $sum: "$score" },
          gamesPlayed: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            avatar: "$user.avatar"
          },
          bestScore: 1,
          totalScore: 1,
          gamesPlayed: 1
        }
      },
      { $sort: { bestScore: -1 } },
      { $limit: 3 }
    ]);

    // Top 3 global (addition des meilleurs scores de chaque jeu)
    const topGlobal = await Score.aggregate([
      // Trouver le meilleur score par joueur et par jeu
      {
        $group: {
          _id: { userId: "$userId", gameSlug: "$gameSlug" },
          bestScore: { $max: "$score" }
        }
      },
      // Regrouper par joueur et additionner les meilleurs scores
      {
        $group: {
          _id: "$_id.userId",
          totalScore: { $sum: "$bestScore" },
          gamesPlayed: { $sum: 1 }
        }
      },
      // Récupérer les infos utilisateur
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          totalScore: 1,
          gamesPlayed: 1,
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            avatar: "$user.avatar"
          }
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 3 }
    ]);

    // Liste de tous les joueurs Sebi avec leur score
    const sebiPlayers = await Score.aggregate([
      { $match: { gameSlug: "sebi-run" } },
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
          gamesPlayed: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            avatar: "$user.avatar"
          },
          totalScore: 1,
          gamesPlayed: 1
        }
      },
      { $sort: { totalScore: -1 } }
    ]);

    return NextResponse.json({
      bestByGameSebi,
      topSebi,
      topJames,
      topGlobal,
      sebiPlayers
    }, { status: 200 });

  } catch (error) {
    console.error("Erreur de récupération du leaderboard:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération du classement" },
      { status: 500 }
    );
  }
}