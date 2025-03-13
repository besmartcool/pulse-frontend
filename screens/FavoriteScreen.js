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
  const user = useSelector((state) => state.user.value);
  console.log(user)

  const favorites = user.favorites.map((association, i) => (
    <View key={i} style={styles.favoriteContainer}>
      <AssociationCard association={association} />
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require("../assets/Logo_Letter.png")} />
      </View>
      <Text style={styles.title}>Favoris</Text>
      <View style={styles.line}></View>
      <ScrollView contentContainerStyle={styles.favoritesList}>
        {favorites.length > 0 ? favorites : (
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
  containerLogo: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  line: {
    width: "80%",
    height: 2,
    backgroundColor: "#FF6C02",
    marginBottom: 20,
  },
  favoritesList: {
    width: "90%",
    height: "auto",
  },
  favoriteContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  noFavorites: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 50,
  },
});