// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('isAuthenticated');

    // If the user is not authenticated and tries to access a protected route, redirect them to the login page
    if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// Only apply this middleware to routes under /dashboard
export const config = {
    matcher: ['/dashboard/:path*'],
};
