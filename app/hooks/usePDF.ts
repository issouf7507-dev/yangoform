import React, { useState } from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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

      // Styles pour le PDF
      const styles = StyleSheet.create({
        page: {
          flexDirection: "column",
          backgroundColor: "#ffffff",
          padding: 20,
          fontFamily: "Helvetica",
        },
        header: {
          marginBottom: 40,
          textAlign: "center",
          borderBottom: "3 solid #dc2626",
          paddingBottom: 25,
        },
        title: {
          fontSize: 32,
          fontWeight: "bold",
          color: "#1f2937",
          marginBottom: 12,
        },
        subtitle: {
          fontSize: 16,
          color: "#6b7280",
          marginBottom: 8,
        },
        date: {
          fontSize: 14,
          color: "#9ca3af",
        },
        table: {
          width: "auto",
          borderStyle: "solid",
          borderWidth: 2,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderColor: "#dc2626",
          marginBottom: 30,
        },
        tableRow: {
          margin: "auto",
          flexDirection: "row",
          minHeight: 35,
        },
        tableColHeader: {
          width: "13%",
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderColor: "#dc2626",
          backgroundColor: "#dc2626",
          padding: 12,
          justifyContent: "center",
        },
        tableColHeaderName: {
          width: "18%",
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderColor: "#dc2626",
          backgroundColor: "#dc2626",
          padding: 12,
          justifyContent: "center",
        },
        tableColHeaderEmail: {
          width: "20%",
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderColor: "#dc2626",
          backgroundColor: "#dc2626",
          padding: 12,
          justifyContent: "center",
        },
        tableCol: {
          width: "13%",
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderColor: "#e5e7eb",
          padding: 10,
          justifyContent: "center",
        },
        tableColName: {
          width: "18%",
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderColor: "#e5e7eb",
          padding: 10,
          justifyContent: "flex-start",
        },
        tableColEmail: {
          width: "20%",
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderColor: "#e5e7eb",
          padding: 10,
          justifyContent: "center",
        },
        tableCellHeader: {
          fontSize: 11,
          fontWeight: "bold",
          color: "#ffffff",
          textAlign: "center",
        },
        tableCell: {
          fontSize: 10,
          color: "#374151",
          textAlign: "center",
        },
        tableCellName: {
          fontSize: 10,
          fontWeight: "bold",
          color: "#1f2937",
          textAlign: "left",
        },
        tableCellEmail: {
          fontSize: 9,
          color: "#dc2626",
          textAlign: "center",
          wordWrap: "break-word",
          lineHeight: 1.2,
        },
        tableCellPoste: {
          fontSize: 9,
          color: "#dc2626",
          backgroundColor: "#fef2f2",
          padding: 6,
          borderRadius: 6,
          textAlign: "center",
          fontWeight: "bold",
        },
        summary: {
          marginTop: 40,
          padding: 25,
          backgroundColor: "#f9fafb",
          border: "2 solid #e5e7eb",
          borderRadius: 10,
        },
        summaryText: {
          fontSize: 14,
          color: "#374151",
          textAlign: "center",
          fontWeight: "bold",
        },
        footer: {
          position: "absolute",
          bottom: 40,
          left: 40,
          right: 40,
          textAlign: "center",
          fontSize: 11,
          color: "#9ca3af",
          borderTop: "2 solid #e5e7eb",
          paddingTop: 15,
        },
        pageNumber: {
          position: "absolute",
          bottom: 20,
          right: 40,
          fontSize: 10,
          color: "#9ca3af",
        },
      });

      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      // Créer le document PDF
      const pdfDoc = pdf(
        React.createElement(
          Document,
          {},
          React.createElement(
            Page,
            { size: "A4", style: styles.page },
            // En-tête
            React.createElement(
              View,
              { style: styles.header },
              React.createElement(
                Text,
                { style: styles.title },
                "Liste des Personnes Enregistrées"
              ),
              React.createElement(
                Text,
                { style: styles.subtitle },
                "Système de Gestion des Participants"
              ),
              React.createElement(
                Text,
                { style: styles.date },
                `Généré le ${new Date().toLocaleDateString(
                  "fr-FR"
                )} à ${new Date().toLocaleTimeString("fr-FR")}`
              )
            ),
            // Tableau
            React.createElement(
              View,
              { style: styles.table },
              // En-tête du tableau
              React.createElement(
                View,
                { style: styles.tableRow },
                React.createElement(
                  View,
                  { style: styles.tableColHeaderName },
                  React.createElement(
                    Text,
                    { style: styles.tableCellHeader },
                    "Nom & Prénoms"
                  )
                ),
                React.createElement(
                  View,
                  { style: styles.tableColHeader },
                  React.createElement(
                    Text,
                    { style: styles.tableCellHeader },
                    "Téléphone"
                  )
                ),
                React.createElement(
                  View,
                  { style: styles.tableColHeaderEmail },
                  React.createElement(
                    Text,
                    { style: styles.tableCellHeader },
                    "Email"
                  )
                ),
                React.createElement(
                  View,
                  { style: styles.tableColHeader },
                  React.createElement(
                    Text,
                    { style: styles.tableCellHeader },
                    "Entité"
                  )
                ),
                React.createElement(
                  View,
                  { style: styles.tableColHeader },
                  React.createElement(
                    Text,
                    { style: styles.tableCellHeader },
                    "Poste"
                  )
                ),
                React.createElement(
                  View,
                  { style: styles.tableColHeader },
                  React.createElement(
                    Text,
                    { style: styles.tableCellHeader },
                    "Date"
                  )
                )
              ),
              // Lignes de données
              ...personnes.map((personne) =>
                React.createElement(
                  View,
                  { key: personne.id, style: styles.tableRow },
                  React.createElement(
                    View,
                    { style: styles.tableColName },
                    React.createElement(
                      Text,
                      { style: styles.tableCellName },
                      `${personne.nom} ${personne.prenoms}`
                    )
                  ),
                  React.createElement(
                    View,
                    { style: styles.tableCol },
                    React.createElement(
                      Text,
                      { style: styles.tableCell },
                      personne.telephone
                    )
                  ),
                  React.createElement(
                    View,
                    { style: styles.tableColEmail },
                    React.createElement(
                      Text,
                      { style: styles.tableCellEmail },
                      personne.email || "-"
                    )
                  ),
                  React.createElement(
                    View,
                    { style: styles.tableCol },
                    React.createElement(
                      Text,
                      { style: styles.tableCell },
                      personne.entite
                    )
                  ),
                  React.createElement(
                    View,
                    { style: styles.tableCol },
                    React.createElement(
                      Text,
                      { style: styles.tableCellPoste },
                      personne.poste
                    )
                  ),
                  React.createElement(
                    View,
                    { style: styles.tableCol },
                    React.createElement(
                      Text,
                      { style: styles.tableCell },
                      formatDate(personne.createdAt)
                    )
                  )
                )
              )
            ),
            // Résumé
            React.createElement(
              View,
              { style: styles.summary },
              React.createElement(
                Text,
                { style: styles.summaryText },
                `Total: ${personnes.length} personne${
                  personnes.length > 1 ? "s" : ""
                } enregistrée${personnes.length > 1 ? "s" : ""}`
              )
            ),
            // Pied de page
            React.createElement(
              Text,
              { style: styles.footer },
              "Document généré automatiquement - Système de Gestion des Participants"
            ),
            // Numéro de page
            React.createElement(Text, {
              style: styles.pageNumber,
              render: ({ pageNumber, totalPages }: any) =>
                `${pageNumber} / ${totalPages}`,
              fixed: true,
            })
          )
        )
      );

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
