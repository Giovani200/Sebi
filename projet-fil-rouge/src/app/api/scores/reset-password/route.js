import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const POST = async (req) => {
  await connectDB();

  const { email, token, newPassword } = await req.json();

  if (!email || !token || !newPassword) {
    return NextResponse.json({ message: "Tous les champs sont requis." }, { status: 400 });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    email,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return NextResponse.json({ message: "Token invalide ou expiré." }, { status: 404 });
  }

  // Mise à jour du mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return NextResponse.json({ message: "Mot de passe réinitialisé avec succès." });
};
