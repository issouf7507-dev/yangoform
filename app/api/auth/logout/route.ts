import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Créer la réponse
    const response = NextResponse.json(
      {
        success: true,
        message: "Déconnexion réussie",
      },
      { status: 200 }
    );

    // Supprimer le cookie d'authentification
    response.cookies.set("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immédiatement
      path: "/",
    });

    // Supprimer le cookie utilisateur
    response.cookies.set("user", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immédiatement
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
