import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CategorieRound = ({ categorie2 }) => {
  const categoryIcons = {
    "Éducation": "graduation-cap",
    "Santé": "heartbeat",
    "Environnement": "leaf",
    "Sport": "soccer-ball-o",
    "Culture": "paint-brush",
    "Technologie": "laptop",
    "Humanitaire": "hands-helping",
    "Socioculturel": "users",
    "Politique": "balance-scale",
    "Spiritualité": "circle",
    "Emploi & Développement local": "briefcase",
    "Amicales": "handshake-o",
    "Solidarité": "users",
    "Loisirs": "gamepad",
    "Réflexion": "lightbulb-o",
    "Activités économiques": "chart-line",
    "Droits & Civisme": "gavel",
    "Non renseigné": "question-circle",
    "Communication": "bullhorn",
    "Interventions sociales": "user-md",
    "Justice": "balance-scale",
    "Logement": "home",
    "Patrimoine": "university",
    "Recherche": "flask",
    "Économie": "money",
    "Sécurité": "shield",
    "Médico-social": "stethoscope",
    "Services familiaux": "child",
    "Tourisme": "globe",
  };

  const categoryColors = {
    "Éducation": "#3498db",
    "Santé": "#e74c3c",
    "Environnement": "#2ecc71",
    "Sport": "#f39c12",
    "Culture": "#9b59b6",
    "Technologie": "#1abc9c",
    "Humanitaire": "#e67e22",
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
    "Économie": "#fdcb6e",
    "Sécurité": "#2d3436",
    "Médico-social": "#00cec9",
    "Services familiaux": "#fab1a0",
    "Tourisme": "#ff7675",
  };

  const iconName = categoryIcons[categorie2] || "question-circle";
  const backgroundColor = categoryColors[categorie2] || "#bdc3c7";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <FontAwesome name={iconName} size={16} color="white" />
      <Text style={styles.categoryText}>{categorie2}</Text>
    </View>
  );
};

export default CategorieRound;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbbbbb"
  },
  categoryText: {
    fontSize: 7,
    fontWeight: "light",
    marginTop: 5,
    textAlign: "center",
    color: "white",
  },
});
