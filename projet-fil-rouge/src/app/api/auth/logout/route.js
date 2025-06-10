import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('token', { path: '/' });
        
        return NextResponse.json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        return NextResponse.json({ message: 'Erreur lors de la déconnexion' }, { status: 500 });
    }
}