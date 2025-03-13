import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";
import AssociationCard from "../associationCard";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_ADDRESS } from "../../assets/url";

export default function MyAssociations({ handleTypeContent }) {
  const user = useSelector((state) => state.user.value);
  const [associations, setAssociations] = useState([]);

  // Récupération des associations au chargement
  useEffect(() => {
    fetch(
      `${BACKEND_ADDRESS}/associations/getAssociationsByIds/${user.token}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAssociations(data.data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error)
      );
  }, [user.associations]);

  const myAssociations = associations.map((association, index) => {
    return (
      <View key={index} style={styles.favoriteContainer}>
        <AssociationCard key={index} association={association} />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.fakeModal}>
        <View style={styles.newResearch}>
          <Text style={styles.bigTitle}>Associations</Text>
          <TouchableOpacity style={styles.addAsso} onPress={handleTypeContent}>
            <Text style={styles.addAssoText}>+ Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.favoritesList}>
        {myAssociations.length > 0 ? (
          myAssociations
        ) : (
          <Text style={styles.noFavorites}>Aucune association enregistrée</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  fakeModal: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  newResearch: {
    width: "90%",
    height: "auto",
    alignItems: "flex-start",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
  },
  bigTitle: {
    fontWeight: "600",
    fontSize: 30,
    marginTop: 10,
  },
  addAsso: {
    backgroundColor: "#FF6C02",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 17,
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  addAssoText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  favoritesList: {
    width: "90%",
    height: "auto",
    marginTop: 10,
  },
  favoriteContainer: {
    paddingVertical: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  noFavorites: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 50,
  },
});