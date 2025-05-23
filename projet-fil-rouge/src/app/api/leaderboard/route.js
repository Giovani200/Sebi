import connectDB from "@/lib/db";
import Score from '@/app/models/Score.model';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function GET(req) {
    await connectDB();

    const token = req.cookies?.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: "Non connecté" }, { status: 401 });
    }

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    } catch (err) {
        return NextResponse.json({ message: "Token invalide", error: err.message }, { status: 403 });
    }

    // top score
    /**
     * @swagger
     * aggregate : c'est une méthode de mongoose qui permet de faire des requêtes d'agrégation sur la base de données
     */
    const bestByGame = await Score.aggregate([
        {
            $group: {
                _id: {
                    user: "$userId",
                    game: "$gameSlug",
                },
                bestScore: {
                    $max: "$score"
                },
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "_id.user",
                foreignField: "_id",
                as: "user",
            },
        },
        { $unwind: "$user" },
        {
            $project: {
                game: "$_id.game",
                bestScore: 1,
                "user.firstName": 1,
            },
        },

        {
            $sort: {
                "bestScore": -1
            },
        },
    ]);

    // Top 3 des meilleurs joueurs tous jeux confondus
    const top3 = await Score.aggregate([
  {
    $group: {
      _id: "$userId",
      totalScore: { $sum: "$score" },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user",
    },
  },
  { $unwind: "$user" },
  {
    $project: {
      totalScore: 1,
      "user.firstName": 1,
    },
  },
  {
    $sort: { totalScore: -1 },
  },
  {
    $limit: 3,
  },
]);

    return NextResponse.json({ bestByGame, top3 }, { status: 200 });
}