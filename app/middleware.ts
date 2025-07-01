import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Protéger la route /participants
  if (request.nextUrl.pathname.startsWith("/participants")) {
    // Vérifier si l'utilisateur est authentifié
    const authToken = request.cookies.get("authToken")?.value;

    if (!authToken || authToken !== "authenticated") {
      // Rediriger vers la page de connexion
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/participants/:path*"],
};
