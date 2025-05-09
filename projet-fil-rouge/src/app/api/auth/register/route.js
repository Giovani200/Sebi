import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies as getCookies } from 'next/headers'; // Import corrigé
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';
import { sendApprovalEmail } from '@/lib/email'; // ✅ appel correct si tu suis bien la structure

export const POST = async (req) => {
    await connectDB();
    const body = await req.json();

    const { firstName, lastName, age, email, parentEmail, password } = body;

    // Champs requis
    if (!firstName || !lastName || !email || !password || !age) {
        return NextResponse.json({ message: "Champs manquants." }, { status: 400 });
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: "Utilisateur déjà existant." }, { status: 409 });
    }

    // Vérifie que l'âge est correct
    if (isNaN(age) || age < 4 || age > 120) {
        return NextResponse.json({ message: "Âge invalide." }, { status: 400 });
    }

    // Si l'âge < 13, parentEmail est requis
    if (age < 13 && !parentEmail) {
        return NextResponse.json({ message: "L'adresse email d'un parent est requise pour les enfants de moins de 13 ans." }, { status: 400 });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création utilisateur
    const newUser = await User.create({
        firstName,
        lastName,
        age,
        email,
        password: hashedPassword,
        parentEmail: age < 13 ? parentEmail : null,
        isParentApproved: age < 13 ? false : true, // attente d'approbation
    });

    // Envoi de l'email d'approbation si l'âge est inférieur à 13
    if (age < 13 && parentEmail) {
        try {
            await sendApprovalEmail(parentEmail, `${firstName} ${lastName}`, newUser._id);
        } catch (error) {
            console.error('Error sending approval email:', error);
            return NextResponse.json({ message: "Erreur lors de l'envoi de l'email de confirmation." }, { status: 500 });
        }
    }

    // Création d’un token JWT
    const jwtToken = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    // Enregistrement du token dans un cookie
    const cookies = await getCookies(); // Attente du cookies()
    cookies.set('token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 semaine
        path: '/',
    });

    return NextResponse.json({
        message: "Inscription réussie.",
        user: {
            id: newUser._id,
            firstName: newUser.firstName,
            age: newUser.age,
            isParentApproved: newUser.isParentApproved,
        }
    }, { status: 201 });
};
