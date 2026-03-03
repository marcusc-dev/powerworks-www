import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || 'unknown';
  const path = req.nextUrl.pathname;

  // Only log for real pages, not static assets
  if (!path.startsWith('/_next') && !path.startsWith('/api')) {
    console.log('[PW-REQ]', path, 'UA:', ua);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
