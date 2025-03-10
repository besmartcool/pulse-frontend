import React from "react";
import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SearchHome({ setTypeContent }) {
  return (
    <View style={styles.fakeModal}>
      <View style={styles.research}>
        <View style={styles.topContent}>
          <Image style={styles.logo} source={require("../../assets/Logo.png")} />
          <TouchableOpacity style={styles.addAsso}>
            <Text style={styles.addAssoText}>+ Ajouter une association</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setTypeContent("search")}
        >
          <FontAwesome name="search" size={18} color="#FF6C02" />
          <Text style={styles.searchButtonText}>
            Rechercher une association
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  research: {
    width: "90%",
    height: "auto",
    marginTop: 30,
  },
  topContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
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
    marginBottom: 5,
  },
  addAssoText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderColor: "#FF6C02",
    borderWidth: 1,
    width: "100%",
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  searchButtonText: {
    color: "#FF6C02",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
  },
});
