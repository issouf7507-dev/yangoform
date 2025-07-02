"use client";

import { Save, User } from "lucide-react";
import { useState } from "react";

interface PersonneFormData {
  nom: string;
  prenoms: string;
  telephone: string;
  email: string;
  entite: string;
  poste: string;
}

interface PersonneFormProps {
  onSubmit: (data: PersonneFormData) => void;
  isLoading?: boolean;
}

export default function PersonneForm({
  onSubmit,
  isLoading = false,
}: PersonneFormProps) {
  const [formData, setFormData] = useState<PersonneFormData>({
    nom: "",
    prenoms: "",
    telephone: "",
    email: "",
    entite: "",
    poste: "",
  });

  const [focusedField, setFocusedField] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    // Afficher le message de succès
    setShowSuccess(true);

    // Réinitialiser le formulaire après soumission
    setFormData({
      nom: "",
      prenoms: "",
      telephone: "",
      email: "",
      entite: "",
      poste: "",
    });

    // Masquer le message de succès après 5 secondes
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-100 animate-fade-in">
      {/* Message de succès */}
      {showSuccess && (
        <div className="fixed inset-0 bg-[#0000005e] bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Succès ! 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              La personne a été enregistrée avec succès dans la base de données.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <span className="text-2xl text-white">
            <User />
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Formulaire d'inscription
        </h2>
        <p className="text-gray-600">
          Remplissez les informations pour enregistrer une nouvelle personne
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label
              htmlFor="nom"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-600 transition-colors"
            >
              Nom *
            </label>
            <div className="relative">
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                onFocus={() => setFocusedField("nom")}
                onBlur={() => setFocusedField("")}
                required
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-black ${
                  focusedField === "nom"
                    ? "border-red-500 shadow-lg shadow-red-100"
                    : "border-gray-200 hover:border-red-300"
                }`}
                placeholder="Entrez le nom"
              />
              <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                  focusedField === "nom" ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-red-500">👤</span>
              </div>
            </div>
          </div>

          <div className="group">
            <label
              htmlFor="prenoms"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-600 transition-colors"
            >
              Prénoms *
            </label>
            <div className="relative">
              <input
                type="text"
                id="prenoms"
                name="prenoms"
                value={formData.prenoms}
                onChange={handleChange}
                onFocus={() => setFocusedField("prenoms")}
                onBlur={() => setFocusedField("")}
                required
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-black ${
                  focusedField === "prenoms"
                    ? "border-red-500 shadow-lg shadow-red-100"
                    : "border-gray-200 hover:border-red-300"
                }`}
                placeholder="Entrez les prénoms"
              />
              <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                  focusedField === "prenoms" ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-red-500">👤</span>
              </div>
            </div>
          </div>
        </div>

        <div className="group">
          <label
            htmlFor="telephone"
            className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-600 transition-colors"
          >
            Numéro de téléphone *
          </label>
          <div className="relative">
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              onFocus={() => setFocusedField("telephone")}
              onBlur={() => setFocusedField("")}
              required
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-black ${
                focusedField === "telephone"
                  ? "border-red-500 shadow-lg shadow-red-100"
                  : "border-gray-200 hover:border-red-300"
              }`}
              placeholder="Entrez le numéro de téléphone"
            />
            <div
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                focusedField === "telephone" ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-red-500">📞</span>
            </div>
          </div>
        </div>

        <div className="group">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-600 transition-colors"
          >
            Email (optionnel)
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-black ${
                focusedField === "email"
                  ? "border-red-500 shadow-lg shadow-red-100"
                  : "border-gray-200 hover:border-red-300"
              }`}
              placeholder="Entrez l'email"
            />
            <div
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                focusedField === "email" ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-red-500">📧</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label
              htmlFor="entite"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-600 transition-colors"
            >
              Entité *
            </label>
            <div className="relative">
              <input
                type="text"
                id="entite"
                name="entite"
                value={formData.entite}
                onChange={handleChange}
                onFocus={() => setFocusedField("entite")}
                onBlur={() => setFocusedField("")}
                required
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-black ${
                  focusedField === "entite"
                    ? "border-red-500 shadow-lg shadow-red-100"
                    : "border-gray-200 hover:border-red-300"
                }`}
                placeholder="Entrez l'entité"
              />
              <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                  focusedField === "entite" ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-red-500">🏢</span>
              </div>
            </div>
          </div>

          <div className="group">
            <label
              htmlFor="poste"
              className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-600 transition-colors"
            >
              Poste *
            </label>
            <div className="relative">
              <input
                type="text"
                id="poste"
                name="poste"
                value={formData.poste}
                onChange={handleChange}
                onFocus={() => setFocusedField("poste")}
                onBlur={() => setFocusedField("")}
                required
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-black placeholder:text-black placeholder:text-sm ${
                  focusedField === "poste"
                    ? "border-red-500 shadow-lg shadow-red-100"
                    : "border-gray-200 hover:border-red-300"
                }`}
                placeholder="Entrez le poste"
              />
              <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                  focusedField === "poste" ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-red-500">💼</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Enregistrement...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>
                  <Save />
                </span>
                <span>Enregistrer</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
