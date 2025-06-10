import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';

export async function GET() {
    await connectDB();

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = decoded;

        const user = await User.findById(userId);

        if (!user || !user.isAdmin) {
            return NextResponse.json({ isAdmin: false }, { status: 403 });
        }

        return NextResponse.json({ isAdmin: true });
    } catch (error) {
        console.error('Erreur vérification admin:', error);
        return NextResponse.json({ isAdmin: false }, { status: 401 });
    }
}
