// app/api/auth/me/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/app/models/User.model';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await connectDB();
        const user = await User.findById(decoded.userId, '-password');
        
        if (!user) {
            return NextResponse.json({ isAuthenticated: false }, { status: 401 });
        }

        return NextResponse.json({ 
            isAuthenticated: true, 
            user: {
                id: user._id,
                firstName: user.firstName,
                age: user.age
            }
        });
    } catch (err) {
        return NextResponse.json({ isAuthenticated: false, error: err.message }, { status: 401 });
    }
}