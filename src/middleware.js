import { NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = '/dashboard';
const authRoutes = '/auth';

const getAuthToken = (request) => {
  return request.cookies.get('authToken') || null;
};

export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(protectedRoutes); // same as /auth/*
  const isAuthRoutes = path.startsWith(authRoutes); // same as /auth/*

  // 3. Decrypt the session from the cookie
  const authToken = getAuthToken(req);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (isAuthRoutes && authToken) {
    return NextResponse.redirect(new URL('/dashboard/recordings', req.nextUrl.origin));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$).*)'],
};
