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

  return (
    <div className="relative min-h-screen bg-[url(/img/bg2.png)] bg-center bg-cover bg-no-repeat  flex flex-col">
      {/* En-tête avec barre de navigation */}
      <div className=" text-black ">
        <div className="  px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 text-black rounded-full flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Liste des Participants</h1>
                <p className="text-black">Espace administrateur</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-black">Connecté en tant que</p>
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

      <PersonneList personnes={personnes} onRefresh={fetchPersonnes} />
      <div className="px-4 py-">
        {/* Liste des participants */}

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
