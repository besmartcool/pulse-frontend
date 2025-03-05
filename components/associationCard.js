import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CategorieRound from "../components/categorieRound";

const AssociationCard = ({ association }) => {
  const [countryCode, setCountryCode] = useState("");

  const getCountryCode = (countryName) => {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          return data[0].cca2; // Récupère le code ISO alpha-2
        }
        return null;
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du code pays :", error);
        return null;
      });
  };

  useEffect(() => {
    if (association.nationality) {
      getCountryCode(association.nationality).then((code) => {
        if (code) {
          setCountryCode(code);
        }
      });
    }
  }, [association.nationality]);

  return (
    <View style={styles.associationCard}>
      <View style={styles.topAssoContent}>
        <View style={styles.textTitle}>
          <Text style={styles.assoName}>{association.name.length > 30
          ? association.name.slice(0, 30) + "..."
          : association.name}</Text>

          {/* Affichage du drapeau s'il est disponible */}
          {countryCode ? (
            <Image
              source={{
                uri: `https://flagsapi.com/${countryCode}/shiny/64.png`,
              }}
              style={styles.drapeau}
            />
          ) : (
            <Text>Pas de nationalité renseignée</Text>
          )}
        </View>
        <View style={styles.textCategorie}>
          <CategorieRound categorie={association.categorie} />
        </View>
      </View>
      <Image
        style={styles.image}
        source={require("../assets/placeholderImage.png")}
      />
      <Text style={styles.description}>
        {association.description.length > 150
          ? association.description.slice(0, 150) + "..."
          : association.description}
      </Text>
      <View style={styles.bottomAssoContent}>
        <FontAwesome name="heart" size={24} color="#000000" />
        <FontAwesome name="comment" size={24} color="#000000" />
      </View>
    </View>
  );
};

export default AssociationCard;

const styles = StyleSheet.create({
  associationCard: {
    height: 'auto',
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 70,
    resizeMode: "cover",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  topAssoContent: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 10,
    width: "100%",
    height: 100,
  },
  textTitle: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "70%",
    height: '100%',
  },
  assoName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textCategorie: {
    width: "25%",
    height: "70%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  textLogo: {
    width: "25%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  description: {
    padding: 10,
    height: 100,
    width: '100%',
  },
  bottomAssoContent: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    gap: 10,
    width: "100%",
  },
  drapeau: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
