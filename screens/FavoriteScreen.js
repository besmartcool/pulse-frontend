import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_ADDRESS } from "../assets/url";
import { useSelector } from "react-redux";
import AssociationCard from "../components/associationCard";

export default function FavoritesScreen({ navigation }) {
  // on récupère les infos likés par l'user
  const user = useSelector((state) => state.user.value);

  // et on les affiche
  const favorites = user.favorites.map((association, i) => (
    <View key={i} style={styles.favoriteContainer}>
      <AssociationCard association={association} />
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.fakeModal}>
        <View style={styles.newResearch}>
          <Text style={styles.bigTitle}>Favoris</Text>
        </View>

      </View>
        <ScrollView contentContainerStyle={styles.favoritesList}>
          {favorites.length > 0 ? (
            favorites
          ) : (
            <Text style={styles.noFavorites}>Aucun favori enregistré</Text>
          )}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
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
  },
  bigTitle: {
    fontWeight: 600,
    fontSize: 30,
    marginTop: 10,
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
