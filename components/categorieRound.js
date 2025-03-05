import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { library, icon } from '@fortawesome/fontawesome-svg-core'

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
      <View style={styles.icon}>
      <FontAwesome name={iconName} size={16} color="white"/>
      </View>
      <View style={styles.text}>
      <Text style={styles.categoryText}>{categorie}</Text>
      </View>
    </View>
  );
};

export default CategorieRound;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: 80,
    height: 60,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbbbbb"
  },
  icon: {
    height: '40%',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    height: '60%',
    width: '100%',
    alignItems: "center",
    justifyContent: "flex-start",
  },
  categoryText: {
    fontSize: 7,
    width: '100%',
    fontWeight: "light",
    marginTop: 5,
    textAlign: "center",
    color: "white",
  },
});