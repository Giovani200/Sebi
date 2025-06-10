import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';
import bcrypt from 'bcrypt';

// GET - Récupérer tous les utilisateurs
export async function GET() {
    try {
        await connectDB();
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        return NextResponse.json(users);
    } catch (error) {
        console.error('Erreur récupération utilisateurs:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Créer un nouvel utilisateur
export async function POST(request) {
    try {
        const { firstName, lastName, email, password, age, isAdmin } = await request.json();

        await connectDB();

        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Un utilisateur avec cet email existe déjà' },
                { status: 400 }
            );
        }

        // Générer un avatar par défaut
        const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${firstName}-${lastName}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age: parseInt(age),
            avatar: avatarUrl,
            isAdmin: isAdmin || false,
            isParentApproved: true
        });

        await newUser.save();

        return NextResponse.json(
            { message: 'Utilisateur créé avec succès', user: { ...newUser.toObject(), password: undefined } },
            { status: 201 }
        );
    } catch (error) {
        console.error('Erreur création utilisateur:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
