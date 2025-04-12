import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = '/dashboard';

export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.includes(protectedRoutes);

  // 3. Decrypt the session from the cookie
  const authToken = (await cookies()).get('authToken')?.value;

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (!isProtectedRoute && authToken && !req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
