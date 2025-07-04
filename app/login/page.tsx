"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { User } from "lucide-react";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(credentials.username, credentials.password);

    if (result.success) {
      // La redirection sera gérée par le hook
    } else {
      setError(result.error || "Erreur de connexion");
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative min-h-screen bg-[url(/img/bg2.png)] bg-center bg-cover bg-no-repeat px-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Connexion</h1>
          <p className="text-gray-600">Accédez à la liste des participants</p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-[#f1eae7] rounded-2xl shadow-2xl p-8 border  animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className=" flex items-center  text-sm font-semibold text-gray-700 mb-2"
              >
                <User />
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className=" w-full border h-14 border-[#000] rounded-lg focus:border-red-400 focus-visible:border-red-400 focus:border-4 outline-0 transition-all px-2 placeholder:text-gray-400 text-black"
                placeholder="Entrez votre nom d'utilisateur"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                🔒 Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className=" w-full border h-14 border-[#000] rounded-lg focus:border-red-400 focus-visible:border-red-400 focus:border-4 outline-0 transition-all px-2 placeholder:text-gray-400 text-black"
                // placeholder="Entrez votre nom d'utilisateur"
                placeholder="Entrez votre mot de passe"
              />
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg animate-slide-in-down">
                <div className="flex items-center">
                  <span className="text-xl mr-3">❌</span>
                  {error}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-red-500 px-10 py-3 rounded-full font-semibold  hover:bg-red-600 w-full justify-center"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Connexion...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Se connecter</span>
                </div>
              )}
            </button>
          </form>

          {/* Informations de connexion */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">
              🔑 Informations de connexion :
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Utilisateur :</strong> admin
              <br />
              <strong>Mot de passe :</strong> admin123
            </p>
          </div>
        </div>

        {/* Lien vers le formulaire d'inscription */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            ← Retour au formulaire d'inscription
          </a>
        </div>
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in-down {
          animation: slide-in-down 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
