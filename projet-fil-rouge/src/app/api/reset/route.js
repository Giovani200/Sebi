import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import Score from '@/app/models/Score.model';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { gameSlug } = body;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: "Non connecté" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;

    // Supprimer tous les scores pour ce jeu et cet utilisateur
    await Score.deleteMany({ userId, gameSlug });

    return NextResponse.json({ 
      message: "Highscore réinitialisé avec succès",
      success: true
    }, { status: 200 });
  } catch (err) {
    console.error("Erreur lors de la réinitialisation du highscore:", err);
    return NextResponse.json({ 
      message: "Erreur lors de la réinitialisation" 
    }, { status: 500 });
  }
}