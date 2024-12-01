import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Example logic for checking authentication (you can replace this with your actual auth logic)
  const isAuthenticated = request.cookies.get('token')?.value || false;

  // Redirect unauthenticated users to login if they try to access protected routes
  if (
    (!isAuthenticated && pathname.startsWith('/dashboard')) ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/settings')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users from /login to /dashboard
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
};

// Matcher for applying middleware to specific routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/login',
  ],
};
