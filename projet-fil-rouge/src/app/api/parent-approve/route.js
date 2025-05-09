import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';

export const GET = async (req) => {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'Lien invalide.' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user || user.age >= 13) {
      return NextResponse.json({ message: 'Utilisateur non concerné ou déjà approuvé.' }, { status: 404 });
    }

    if (user.isParentApproved) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/confirmation-reussie`);
    }

    user.isParentApproved = true;
    await user.save();

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/confirmation-reussie`);
  } catch (error) {
    console.error('Erreur dans la route API:', error);
    return NextResponse.json({ message: 'Erreur interne du serveur.' }, { status: 500 });
  }
};