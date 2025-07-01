"use client";

import { useState, useEffect } from "react";
import PersonneList from "../components/PersonneList";
import { useAuth } from "../hooks/useAuth";

interface Personne {
  id: number;
  nom: string;
  prenoms: string;
  telephone: string;
  email: string | null;
  entite: string;
  poste: string;
  createdAt: string;
}

export default function ParticipantsPage() {
  const [personnes, setPersonnes] = useState<Personne[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isAuthenticated,
    user,
    isLoading: authLoading,
    logout,
    requireAuth,
  } = useAuth();

  // Vérifier l'authentification au montage
  // useEffect(() => {
  //   requireAuth();
  // }, [requireAuth]);

  // Charger les données une fois authentifié
  useEffect(() => {
    // if (isAuthenticated) {
    fetchPersonnes();
    // }
  }, []);

  const fetchPersonnes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/personnes");
      if (response.ok) {
        const data = await response.json();
        setPersonnes(data);
      } else {
        throw new Error("Erreur lors du chargement des données");
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher un loader pendant la vérification d'authentification
  // if (authLoading || !isAuthenticated) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200 flex items-center justify-center">
  //       <div className="bg-white p-8 rounded-2xl shadow-2xl">
  //         <div className="flex items-center space-x-4">
  //           <div className="animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
  //           <span className="text-gray-700 font-medium">
  //             Vérification de l'authentification...
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200">
      {/* En-tête avec barre de navigation */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Liste des Participants</h1>
                <p className="text-red-100">Espace administrateur</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-red-100">Connecté en tant que</p>
                <p className="font-semibold">{user}</p>
              </div>
              <button
                onClick={logout}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">👥</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {personnes.length}
                </p>
                <p className="text-gray-600">Total participants</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">📧</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {personnes.filter((p) => p.email).length}
                </p>
                <p className="text-gray-600">Avec email</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">🏢</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(personnes.map((p) => p.entite)).size}
                </p>
                <p className="text-gray-600">Entités</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">💼</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(personnes.map((p) => p.poste)).size}
                </p>
                <p className="text-gray-600">Postes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des participants */}
        <PersonneList personnes={personnes} onRefresh={fetchPersonnes} />

        {/* Indicateur de chargement */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
                <span className="text-gray-700 font-medium">Chargement...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
