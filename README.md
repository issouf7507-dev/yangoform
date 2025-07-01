# Système de Gestion des Personnes

Une application Next.js moderne pour enregistrer et gérer les informations des personnes avec Prisma et MySQL.

## Fonctionnalités

- ✅ Formulaire d'inscription avec validation
- ✅ Stockage en base de données MySQL
- ✅ Liste des personnes enregistrées
- ✅ Fonction d'impression de la liste
- ✅ Interface responsive et moderne
- ✅ Notifications de succès/erreur

## Prérequis

- Node.js 18+
- MySQL 8.0+
- npm ou yarn

## Installation

1. **Cloner le projet**

   ```bash
   git clone <votre-repo>
   cd form
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configuration de la base de données**

   Créez un fichier `.env` à la racine du projet avec le contenu suivant :

   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/form_db"
   ```

   Remplacez les valeurs selon votre configuration MySQL :

   - `root` : nom d'utilisateur MySQL
   - `password` : mot de passe MySQL
   - `localhost` : adresse du serveur MySQL
   - `3306` : port MySQL (par défaut)
   - `form_db` : nom de la base de données

4. **Créer la base de données**

   ```sql
   CREATE DATABASE form_db;
   ```

5. **Générer et appliquer les migrations Prisma**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Lancer l'application**
   ```bash
   npm run dev
   ```

L'application sera accessible à l'adresse : http://localhost:3000

## Structure du projet

```
form/
├── app/
│   ├── api/personnes/     # Routes API
│   ├── components/        # Composants React
│   └── page.tsx          # Page principale
├── prisma/
│   └── schema.prisma     # Schéma de base de données
└── ...
```

## Utilisation

1. **Enregistrer une personne** : Remplissez le formulaire avec les informations requises
2. **Voir la liste** : La liste se met à jour automatiquement après chaque enregistrement
3. **Imprimer** : Cliquez sur le bouton "Imprimer" pour imprimer la liste
4. **Actualiser** : Cliquez sur "Actualiser" pour recharger la liste

## Champs du formulaire

- **Nom** (requis) : Nom de famille
- **Prénoms** (requis) : Prénoms
- **Numéro de téléphone** (requis) : Numéro de contact
- **Email** (optionnel) : Adresse email
- **Entité** (requis) : Organisation ou entreprise
- **Poste** (requis) : Fonction ou poste occupé

## Technologies utilisées

- **Next.js 15** : Framework React
- **Prisma** : ORM pour la base de données
- **MySQL** : Base de données
- **Tailwind CSS** : Framework CSS
- **TypeScript** : Typage statique

## Développement

Pour le développement, vous pouvez utiliser :

```bash
# Mode développement avec Turbopack
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

## Base de données

Le schéma de base de données inclut :

```prisma
model Personne {
  id        Int      @id @default(autoincrement())
  nom       String
  prenoms   String
  telephone String
  email     String?
  entite    String
  poste     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
