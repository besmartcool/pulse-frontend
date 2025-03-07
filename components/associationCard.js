import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CategorieRound from "../components/categorieRound";

const AssociationCard = ({ association }) => {
  const [countryCode, setCountryCode] = useState("");
  const navigation = useNavigation();

  // FONCTION QUI NOUS PERMET DE RETROUVER LE CODE DU PAYS
  const getCountryCode = (countryName) => {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          return data[0].cca2;
        }
        return null;
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du code pays :", error);
        return null;
      });
  };

  // PERMET DE RÉCUPÉRER LES DRAPEAUX POUR CHAQUE ASSOCIATION
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
      <Pressable onPress={() => navigation.navigate("Description", { association })}>
      <View style={styles.topAssoContent}>
        <View style={styles.textTitle}>
          {/* AFFICHAGE DU DRAPEAU SI LA NATIONALITÉ DE L'ASSO EXISTE */}
          {countryCode ? (
            <Image
              source={{
                uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
              }}
              style={styles.drapeau}
            />
          ) : (
            <Text></Text>
          )}
          <Text style={styles.assoName}>
            {/* TRONCAGE DU NOM DE L'ASSO */}
            {association.name.length > 30
              ? association.name.slice(0, 30) + "..."
              : association.name}
          </Text>

        </View>
        <View style={styles.textCategorie}>
          <CategorieRound categorie={association.categorie} />
        </View>
      </View>

      <Text style={styles.address}>
        <FontAwesome name="map-pin" size={14} color="#000000" />{"  "}
        {association.address.city.toUpperCase()}{" "}
        {association.address.zipCode}, {association.address.country}
      </Text>
      <Text style={styles.description}>
        {/* TRONCAGE DE LA DESCRIPTION DE L'ASSO */}
        {association.description.length > 150
          ? association.description.slice(0, 150) + "..."
          : association.description}
      </Text>
      </Pressable>
      <View style={styles.bottomAssoContent}>
        <Pressable>
          <FontAwesome
            name="heart"
            size={28}
            color="#000000"
            style={styles.icon}
          />
        </Pressable>
        <Pressable style={styles.contact}>
          <Text style={styles.contactText}>Contacter</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AssociationCard;

const styles = StyleSheet.create({
  associationCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  topAssoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  textTitle: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    width: "75%",
  },
  drapeau: {
    width: 26,
    height: 26,
    marginRight: 10,
    borderRadius: 13,
  },
  assoName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    flexShrink: 1,
  },
  textCategorie: {
    alignItems: "center",
    justifyContent: "center",
  },
  address: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginVertical: 8,
  },
  bottomAssoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  icon: {
    fontSize: 28,
  },
  contact: {
    backgroundColor: "#FF6C02",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  contactText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});
