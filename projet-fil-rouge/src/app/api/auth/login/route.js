import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';

export const POST = async (req) => {
  await connectDB();

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: "Il manque des champs" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
  }

  if (!user.isParentApproved) {
  return NextResponse.json({ message: "Le compte n’a pas encore été validé par les parents." }, { status: 403 });
}


  // Génération du token JWT
  const jwtToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Écriture du cookie
  cookies().set('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
    path: '/',
  });

  return NextResponse.json({
    message: "Connexion réussie",
    user: {
      id: user._id,
      firstName: user.firstName,
      age: user.age,
      isParentApproved: user.isParentApproved,
    }
  });
};
