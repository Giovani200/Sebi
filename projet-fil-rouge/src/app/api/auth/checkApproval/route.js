// src/app/api/auth/checkApproval/route.js

import { NextResponse } from 'next/server';
import User from '@/app/models/User.model';

export const GET = async (req) => {
  // Récupérer l'email de l'enfant depuis les paramètres ou headers
  const { email } = req.query;

  if (!email) {
    return NextResponse.json({ message: 'Email requis.' }, { status: 400 });
  }

  // Rechercher l'utilisateur dans la base de données
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'Utilisateur non trouvé.' }, { status: 404 });
  }

  // Vérifier si le parent a validé
  const isApproved = user.isParentApproved;

  return NextResponse.json({ isApproved });
};
