import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import Score from '@/app/models/Score.model';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  // Correction ici : cookies() doit être awaité
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

    await Score.create({
      userId,
      score,
      gameSlug,
    });

    return NextResponse.json({ message: "Score enregistré" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Token invalide ou erreur serveur", error: err?.message }, { status: 403 });
  }
}