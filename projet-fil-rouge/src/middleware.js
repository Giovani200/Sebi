import { NextResponse } from 'next/server';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Protection des routes admin
  if (path.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;
    
    // Si pas de token, rediriger vers la page de connexion admin
    if (!token) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
    
    // Si on a un token, on laisse passer et on vérifie côté serveur
    // La vérification se fera dans le layout de l'admin
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
