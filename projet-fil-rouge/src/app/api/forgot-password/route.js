import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import User from "@/app/models/User.model";
import nodemailer from "nodemailer";

export const POST = async (req) => { 
  await connectDB();

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "L'email est requis." }, { status: 400 });
  }

  // Trouver l'utilisateur
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Aucun utilisateur avec cet email." }, { status: 404 });
  }

  // Génération du token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Enregistrer les infos de reset dans MongoDB
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  // Construction du lien
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&email=${email}`;

  // Envoi du mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Réinitialisation du mot de passe",
    html: `
      <p>Bonjour,</p>
      <p>Clique sur ce lien pour réinitialiser ton mot de passe :</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>Ce lien expire dans 10 minutes.</p>
    `,
  });

  return NextResponse.json({ message: "Email de réinitialisation envoyé." });
};
