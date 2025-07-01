#!/usr/bin/env node

const { PrismaClient } = require("../app/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Initialisation de la base de données...\n");

  try {
    // Vérifier si l'utilisateur admin existe déjà
    const existingAdmin = await prisma.user.findUnique({
      where: { username: "admin" },
    });

    if (existingAdmin) {
      console.log("✅ L'utilisateur admin existe déjà");
    } else {
      // Créer l'utilisateur admin
      const hashedPassword = await bcrypt.hash("admin123", 12);

      const adminUser = await prisma.user.create({
        data: {
          username: "admin",
          password: hashedPassword,
          email: "admin@example.com",
          role: "admin",
          isActive: true,
        },
      });

      console.log("✅ Utilisateur admin créé avec succès");
      console.log(`   Username: ${adminUser.username}`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Role: ${adminUser.role}`);
    }

    // Afficher les statistiques
    const userCount = await prisma.user.count();
    const personneCount = await prisma.personne.count();

    console.log("\n📊 Statistiques de la base de données :");
    console.log(`   Utilisateurs: ${userCount}`);
    console.log(`   Personnes: ${personneCount}`);

    console.log("\n🎉 Initialisation terminée avec succès !");
    console.log("\n🔑 Informations de connexion :");
    console.log("   Username: admin");
    console.log("   Password: admin123");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation :", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
