import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';
import bcrypt from 'bcrypt';

// GET - Récupérer un utilisateur spécifique
export async function GET(request, { params }) {
    try {
        const { id } = params;
        await connectDB();

        const user = await User.findById(id).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: 'Utilisateur non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Erreur récupération utilisateur:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT - Mettre à jour un utilisateur
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { firstName, lastName, email, password, age, isAdmin } = await request.json();

        await connectDB();

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json(
                { error: 'Utilisateur non trouvé' },
                { status: 404 }
            );
        }

        // Mettre à jour les champs
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (age) user.age = parseInt(age);
        if (typeof isAdmin !== 'undefined') user.isAdmin = isAdmin;

        // Mettre à jour le mot de passe uniquement s'il est fourni
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return NextResponse.json({
            message: 'Utilisateur mis à jour avec succès',
            user: { ...user.toObject(), password: undefined }
        });
    } catch (error) {
        console.error('Erreur mise à jour utilisateur:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Supprimer un utilisateur
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        await connectDB();

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json(
                { error: 'Utilisateur non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur suppression utilisateur:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
