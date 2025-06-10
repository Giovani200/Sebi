import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import Score from '@/app/models/Score.model';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return NextResponse.json({ success: false, message: "Non connecté" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
    const { gameSlug } = body;

    if (!gameSlug) {
      return NextResponse.json({ success: false, message: "Paramètre gameSlug manquant" }, { status: 400 });
    }

    // Supprimer tous les scores de l'utilisateur pour ce jeu
    await Score.deleteMany({ userId, gameSlug });

    return NextResponse.json({ 
      success: true,
      message: "Scores réinitialisés avec succès" 
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: "Erreur lors de la réinitialisation des scores",
      error: err?.message 
    }, { status: 500 });
  }
}