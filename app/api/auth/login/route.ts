import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../../../../lib/models/User';

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri as string);
    }
}

export async function POST(request: Request) {
    const { username, password } = await request.json();

    try {
        await connectToDatabase();
        console.log('Connected to MongoDB');

        const user = await UserModel.findOne({ name: username });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Login successful, set the authentication cookie
        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
        
        // Set the isAuthenticated cookie with an expiration time
        response.cookies.set('isAuthenticated', 'true', {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production', // secure cookie in production
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
