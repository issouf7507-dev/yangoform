"use client";

import { useState, useEffect } from "react";
import PersonneForm from "./components/PersonneForm";
import PersonneList from "./components/PersonneList";

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

interface PersonneFormData {
  nom: string;
  prenoms: string;
  telephone: string;
  email: string;
  entite: string;
  poste: string;
}

export default function Home() {
  const [personnes, setPersonnes] = useState<Personne[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [activeSection, setActiveSection] = useState<"form" | "list">("form");

  // Charger les personnes au montage du composant
  useEffect(() => {
    fetchPersonnes();
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
      setMessage({
        type: "error",
        text: "Erreur lors du chargement des données",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: PersonneFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/personnes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPersonne = await response.json();
        setPersonnes((prev) => [newPersonne, ...prev]);
        setMessage({
          type: "success",
          text: "Personne enregistrée avec succès !",
        });
        // Basculer vers la liste après enregistrement
        setTimeout(() => setActiveSection("list"), 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'enregistrement");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'enregistrement",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200">
      {/* En-tête avec animation */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
              Système de Gestion des Personnes
            </h1>
            <p className="text-xl text-red-100 animate-fade-in-up">
              Enregistrez et gérez les informations des personnes
            </p>

            {/* Bouton d'accès administrateur */}
          </div>
        </div>

        {/* Éléments décoratifs animés */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-spin"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation des sections */}
        {/* <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveSection("form")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeSection === "form"
                    ? "bg-red-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                📝 Formulaire
              </button>
              <button
                onClick={() => setActiveSection("list")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeSection === "list"
                    ? "bg-red-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                📋 Liste ({personnes.length})
              </button>
            </div>
          </div>
        </div> */}

        {/* Message de notification avec animation */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg shadow-lg animate-slide-in-down ${
              message.type === "success"
                ? "bg-green-100 border-l-4 border-green-500 text-green-700"
                : "bg-red-100 border-l-4 border-red-500 text-red-700"
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {message.type === "success" ? "✅" : "❌"}
              </span>
              {message.text}
            </div>
          </div>
        )}

        {/* Contenu principal avec animation de transition */}
        <div className="relative">
          <div
            className={`transition-all duration-500 ease-in-out ${
              activeSection === "form"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute inset-0"
            }`}
          >
            <PersonneForm onSubmit={handleSubmit} isLoading={isSubmitting} />
          </div>

          <div
            className={`transition-all duration-500 ease-in-out ${
              activeSection === "list"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full absolute inset-0"
            }`}
          >
            <PersonneList personnes={personnes} onRefresh={fetchPersonnes} />
          </div>
        </div>

        {/* Indicateur de chargement avec animation */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl animate-bounce">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
                <span className="text-gray-700 font-medium">Chargement...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx global>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s both;
        }

        .animate-slide-in-down {
          animation: slide-in-down 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
