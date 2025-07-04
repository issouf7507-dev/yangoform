"use client";

import { useState, useEffect } from "react";
import { usePDF } from "../hooks/usePDF";

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

interface PersonneListProps {
  personnes: Personne[];
  onRefresh: () => void;
}

export default function PersonneList({
  personnes,
  onRefresh,
}: PersonneListProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { generateAndDownloadPDF, isGenerating } = usePDF();

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (personnes.length === 0) {
    return (
      <div className=" rounded-2xl shadow-2xl p-8 border border-red-100 bg-red-400">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-3xl text-white">📋</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Liste des personnes
          </h2>
          <p className="text-gray-600 text-lg">
            Aucune personne enregistrée pour le moment.
          </p>
          <div className="mt-6">
            <button
              onClick={onRefresh}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Actualiser la liste
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Styles pour l'impression */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            margin: 0;
            padding: 20px;
          }
        }
        @media screen {
          .print-only {
            display: none;
          }
        }
      `}</style>

      <div className=" rounded-2xl  p-8 border border-red-100 animate-fade-in">
        <div className="flex justify-between items-center mb-8 no-print">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-xl text-white">📋</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Liste des personnes
              </h2>
              <p className="text-gray-600">
                Total: {personnes.length} personne
                {personnes.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onRefresh}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              🔄 Actualiser
            </button>
            <button
              onClick={() => generateAndDownloadPDF(personnes)}
              disabled={isGenerating}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "⏳ Génération..." : "📄 Télécharger PDF"}
            </button>
          </div>
        </div>

        {/* Titre pour l'impression */}
        <div className="print-only mb-6">
          <h1 className="text-4xl font-bold text-center mb-4">
            Liste des Personnes Enregistrées
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Généré le {new Date().toLocaleDateString("fr-FR")} à{" "}
            {new Date().toLocaleTimeString("fr-FR")}
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-red-600 to-red-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    👤 Nom & Prénoms
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    📞 Téléphone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    📧 Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    🏢 Entité
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    💼 Poste
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider no-print">
                    📅 Date d'enregistrement
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {personnes.map((personne, index) => (
                  <tr
                    key={personne.id}
                    className={`transition-all duration-300 ${
                      hoveredRow === personne.id
                        ? "bg-red-50 transform scale-[1.02] shadow-md"
                        : "hover:bg-gray-50"
                    }`}
                    onMouseEnter={() => setHoveredRow(personne.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">
                            {personne.nom.charAt(0)}
                            {personne.prenoms.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {personne.nom} {personne.prenoms}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {personne.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {personne.telephone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {personne.email ? (
                          <a
                            href={`mailto:${personne.email}`}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            {personne.email}
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {personne.entite}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {personne.poste}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 no-print">
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        {formatDate(personne.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Résumé pour l'impression */}
        <div className="print-only mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Total: {personnes.length} personne{personnes.length > 1 ? "s" : ""}{" "}
            enregistrée{personnes.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </>
  );
}
