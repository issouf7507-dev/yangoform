#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Configuration de la base de données...\n");

// Vérifier si le fichier .env existe
const envPath = path.join(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  console.log("❌ Fichier .env non trouvé !");
  console.log(
    "📝 Créez un fichier .env à la racine du projet avec le contenu suivant :"
  );
  console.log("");
  console.log('DATABASE_URL="mysql://root:root0990@localhost:3306/yangoform"');
  console.log("");
  console.log("⚠️  Remplacez les valeurs selon votre configuration MySQL :");
  console.log("   - root: nom d'utilisateur MySQL");
  console.log("   - password: mot de passe MySQL");
  console.log("   - localhost: adresse du serveur MySQL");
  console.log("   - 3306: port MySQL (par défaut)");
  console.log("   - form_db: nom de la base de données");
  console.log("");
  process.exit(1);
}

try {
  // Générer le client Prisma
  console.log("📦 Génération du client Prisma...");
  execSync("npx prisma generate", { stdio: "inherit" });

  // Pousser le schéma vers la base de données
  console.log("🗄️  Application du schéma à la base de données...");
  execSync("npx prisma db push", { stdio: "inherit" });

  console.log("✅ Configuration terminée avec succès !");
  console.log("");
  console.log("🎉 Vous pouvez maintenant lancer l'application avec :");
  console.log("   npm run dev");
  console.log("");
} catch (error) {
  console.error("❌ Erreur lors de la configuration :", error.message);
  console.log("");
  console.log("🔧 Vérifiez que :");
  console.log("   1. MySQL est installé et en cours d'exécution");
  console.log('   2. La base de données "form_db" existe');
  console.log("   3. Les informations de connexion dans .env sont correctes");
  console.log("");
  process.exit(1);
}
