import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
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

interface PersonnePDFProps {
  personnes: Personne[];
}

// Définir les styles pour le PDF
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

const PersonnePDF: React.FC<PersonnePDFProps> = ({ personnes }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>Liste des Personnes Enregistrées</Text>
          <Text style={styles.subtitle}>
            Système de Gestion des Participants
          </Text>
          <Text style={styles.date}>
            Généré le {new Date().toLocaleDateString("fr-FR")} à{" "}
            {new Date().toLocaleTimeString("fr-FR")}
          </Text>
        </View>

        {/* Tableau des personnes */}
        <View style={styles.table}>
          {/* En-tête du tableau */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderName}>
              <Text style={styles.tableCellHeader}>Nom & Prénoms</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Téléphone</Text>
            </View>
            <View style={styles.tableColHeaderEmail}>
              <Text style={styles.tableCellHeader}>Email</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Entité</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Poste</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Date</Text>
            </View>
          </View>

          {/* Lignes de données */}
          {personnes.map((personne) => (
            <View key={personne.id} style={styles.tableRow}>
              <View style={styles.tableColName}>
                <Text style={styles.tableCellName}>
                  {personne.nom} {personne.prenoms}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{personne.telephone}</Text>
              </View>
              <View style={styles.tableColEmail}>
                <Text style={styles.tableCellEmail}>
                  {personne.email || "-"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{personne.entite}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellPoste}>{personne.poste}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {formatDate(personne.createdAt)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Résumé */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total: {personnes.length} personne
            {personnes.length > 1 ? "s" : ""} enregistrée
            {personnes.length > 1 ? "s" : ""}
          </Text>
        </View>

        {/* Pied de page */}
        <Text style={styles.footer}>
          Document généré automatiquement - Système de Gestion des Participants
        </Text>

        {/* Numéro de page */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PersonnePDF;
