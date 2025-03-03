import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.modalBackground}>
          <View style={styles.fakeModal}>
            <View style={styles.topContent}>
              <Image
                style={styles.logo}
                source={require("../assets/Logo.png")}
                size={25}
              />
              <Pressable style={styles.addAsso}>
                <Text style={styles.addAssoText}>
                  Enregistrer une association
                </Text>
              </Pressable>
            </View>
            <Pressable style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Rechercher</Text>
              <FontAwesome
                name="search"
                size={16}
                color="#bbbbbb"
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Contenu en dessous de la modal */}
      <View style={styles.line}>
        <Text>Hey</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-start",
  },
  fakeModal: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "35%",
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
    borderWidth: 1,
    borderColor: "#bbbbbb",
    paddingBottom: 30,
    backgroundColor: "white",

    // Ombre sur iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // Ombre sur Android
    elevation: 8,
  },
  topContent: {
    width: "80%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  addAsso: {
    backgroundColor: "#FF6C02",
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginBottom: 7,

    // Ombre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  addAssoText: {
    color: "white",
    fontWeight: "600",
  },
  searchButton: {
    height: "30%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FF6C02",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchButtonText: {
    paddingVertical: 10,
    color: "#bbbbbb",
  },
  line: {
    width: "80%",
    height: 1,
    backgroundColor: "black",
    marginTop: 30,
    alignSelf: "center",
  },
});
