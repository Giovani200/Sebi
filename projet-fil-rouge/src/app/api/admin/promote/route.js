import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';

// Cette API permet de promouvoir un utilisateur en administrateur
// ATTENTION: À sécuriser en production!
export async function POST(request) {
    try {
        const { email, secretKey } = await request.json();

        // Vérification basique avec une clé secrète
        // En production, utilisez une méthode plus sécurisée
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json({ error: 'Clé secrète invalide' }, { status: 401 });
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
        }

        // Promouvoir l'utilisateur en administrateur
        user.isAdmin = true;
        await user.save();

        return NextResponse.json({
            success: true,
            message: `L'utilisateur ${email} est maintenant administrateur`
        });
    } catch (error) {
        console.error('Erreur lors de la promotion de l\'admin:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
