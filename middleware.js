import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// Paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/api/protected'];

// Paths that are public (optional)
const publicPaths = ['/', '/login', '/api/auth'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is protected
  const isPathProtected = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  if (!isPathProtected) {
    return NextResponse.next();
  }

  // Get the token if it exists
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if there's no token and the path is protected
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Specify the paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/auth routes
     * 2. /_next (Next.js internals)
     * 3. /fonts, /icons, etc. (static resources)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};