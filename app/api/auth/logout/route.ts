// app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
    response.cookies.set('isAuthenticated', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0), // Expire the cookie immediately
    });
    return response;
}
