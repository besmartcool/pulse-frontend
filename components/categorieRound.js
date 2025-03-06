import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CategorieRound = ({ categorie }) => {
  const categoryIcons = {
    "Education": "graduation-cap",
    "Santé": "heartbeat",
    "Environnement": "leaf",
    "Sport": "soccer-ball-o",
    "Culture": "paint-brush",
    "Socioculturel": "users",
    "Politique": "balance-scale",
    "Spiritualité": "circle",
    "Emploi & Développement local": "briefcase",
    "Amicales": "handshake-o",
    "Solidarité": "users",
    "Loisirs": "gamepad",
    "Réflexion": "lightbulb-o",
    "Activités économiques": "dollar",
    "Droits & Civisme": "gavel",
    "Divers": "question-circle",
    "Communication": "bullhorn",
    "Interventions sociales": "user-md",
    "Justice": "balance-scale",
    "Logement": "home",
    "Patrimoine": "university",
    "Recherche": "flask",
    "Economie": "money",
    "Sécurité": "shield",
    "Médico-social": "stethoscope",
    "Services familiaux": "child",
    "Tourisme": "globe",
  };

  const categoryColors = {
    "Education": "#3498db",
    "Santé": "#e74c3c",
    "Environnement": "#2ecc71",
    "Sport": "#f39c12",
    "Culture": "#9b59b6",
    "Socioculturel": "#34495e",
    "Politique": "#c0392b",
    "Spiritualité": "#8e44ad",
    "Emploi & Développement local": "#2c3e50",
    "Amicales": "#d35400",
    "Solidarité": "#27ae60",
    "Loisirs": "#f1c40f",
    "Réflexion": "#7f8c8d",
    "Activités économiques": "#16a085",
    "Droits & Civisme": "#c0392b",
    "Non-renseigné": "#95a5a6",
    "Communication": "#2980b9",
    "Interventions sociales": "#e84393",
    "Justice": "#d63031",
    "Logement": "#6c5ce7",
    "Patrimoine": "#b2bec3",
    "Recherche": "#0984e3",
    "Economie": "#fdcb6e",
    "Sécurité": "#2d3436",
    "Médico-social": "#00cec9",
    "Services familiaux": "#fab1a0",
    "Tourisme": "#ff7675",
  };

  const iconName = categoryIcons[categorie] || "question-circle";
  const backgroundColor = categoryColors[categorie] || "#bdc3c7";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <FontAwesome name={iconName} size={12} color="white" />
      <Text style={styles.categoryText} numberOfLines={2} adjustsFontSizeToFit>
        {categorie}
      </Text>
    </View>
  );
};

export default CategorieRound;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 40, // Cercle parfait
    backgroundColor: "#bdc3c7",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 6,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginTop: 4,
  },
});
