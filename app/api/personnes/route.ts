import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

// GET - Récupérer toutes les personnes
export async function GET() {
  try {
    const personnes = await prisma.personne.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(personnes);
  } catch (error) {
    console.error("Erreur lors de la récupération des personnes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle personne
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenoms, telephone, email, entite, poste } = body;

    // Validation des champs requis
    if (!nom || !prenoms || !telephone || !entite || !poste) {
      return NextResponse.json(
        { error: "Tous les champs sont requis sauf email" },
        { status: 400 }
      );
    }

    const personne = await prisma.personne.create({
      data: {
        nom,
        prenoms,
        telephone,
        email,
        entite,
        poste,
      },
    });

    return NextResponse.json(personne, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la personne:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la personne" },
      { status: 500 }
    );
  }
}
