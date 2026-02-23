import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    try {
      // Check if user has a valid session
      const sessionCookie = request.cookies.get('better-auth.session_token');
      
      if (!sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Verify session with Better Auth
      const verifyResponse = await fetch(
        new URL('/api/auth/get-session', request.url),
        {
          headers: {
            Cookie: request.headers.get('cookie') || '',
          },
        }
      );

      if (!verifyResponse.ok) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const session = await verifyResponse.json();
      
      if (!session || !session.user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Continue to the requested page
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
