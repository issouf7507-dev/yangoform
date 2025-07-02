import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import PersonnePDF from "../components/PersonnePDF";

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

export const usePDF = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndDownloadPDF = async (personnes: Personne[]) => {
    try {
      setIsGenerating(true);

      // Créer le document PDF
      const pdfDoc = pdf(React.createElement(PersonnePDF, { personnes }));
      //   jd;
      // Générer le blob
      const blob = await pdfDoc.toBlob();

      // Créer l'URL du blob
      const url = URL.createObjectURL(blob);

      // Créer un lien de téléchargement
      const link = document.createElement("a");
      link.href = url;
      link.download = `liste-personnes-${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      // Déclencher le téléchargement
      document.body.appendChild(link);
      link.click();

      // Nettoyer
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Erreur lors de la génération du PDF. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAndDownloadPDF,
    isGenerating,
  };
};
