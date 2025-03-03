import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from "../components/input";
import CityAutocomplete from "../components/cityDropdown";

export default function SearchScreen({ navigation }) {
  const [typeContent, setTypeContent] = useState("default");

  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");

  const handleSearch = () => {
    setTypeContent("search");
  };

  const handleResearch = () => {
    setTypeContent("default");
  };

  let content;
  if (typeContent === "default") {
    content = (
      <View style={styles.fakeModal}>
        <View style={styles.research}>
          <View style={styles.topContent}>
            <Image style={styles.logo} source={require("../assets/Logo.png")} />
            <Pressable style={styles.addAsso}>
              <Text style={styles.addAssoText}>
                Enregistrer une association
              </Text>
            </Pressable>
          </View>
          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>
              Rechercher une association
            </Text>
            <FontAwesome
              name="search"
              size={16}
              color="#bbbbbb"
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>
    );
  } else if (typeContent === "search") {
    content = (
      <View style={styles.fakeModal}>
        <View style={styles.research}>
          <Input
            title="Pays d'origine"
            placeholder="Pays..."
            value={originCountry}
            onChangeText={setOriginCountry}
            secureTextEntry={false}
            icon="flag"
          />
          <Input
            title="Pays de destination"
            placeholder="Pays..."
            value={destinationCountry}
            onChangeText={setDestinationCountry}
            secureTextEntry={false}
            icon="flag"
          />
          <Input
            title="Ville de destination"
            placeholder="Ville..."
            value={destinationCity}
            onChangeText={setDestinationCity}
            secureTextEntry={false}
            icon="flag"
          />

          <View style={styles.criterias}>
            {/* CRTIERE A RECUPERER DU BACK OU DE QQPART AVEC UN .MAP */}
            <Pressable style={styles.criteria}>
              <Text style={styles.criteriaText}>Criteria 1</Text>
            </Pressable>
            <Pressable style={styles.criteria}>
              <Text style={styles.criteriaText}>Criteria 2</Text>
            </Pressable>
            <Pressable style={styles.criteria}>
              <Text style={styles.criteriaText}>Criteria 3</Text>
            </Pressable>
          </View>
          <Pressable style={styles.validateButton} onPress={handleResearch}>
            <Text style={styles.validateButtonText}>Rechercher</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.allContent}>
        {content}
        <View style={styles.line}></View>
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
  allContent: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fakeModal: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
    borderWidth: 1,
    borderColor: "#bbbbbb",
    backgroundColor: "white",
    paddingVertical: 20,

    // Ombre sur iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // Ombre sur Android
    elevation: 8,
  },
  topContent: {
    width: "100%",
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
    height: "64",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FF6C02",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchButtonText: {
    paddingVertical: 10,
    color: "#bbbbbb",
  },
  validateButton: {
    height: 43,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C02",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // Ombre sur Android
    elevation: 8,
  },
  validateButtonText: {
    paddingVertical: 10,
    color: "white",
    fontWeight: "600",
  },
  line: {
    width: "90%",
    height: 1,
    backgroundColor: "black",
    marginTop: 30,
    alignSelf: "center",
  },
  research: {
    width: "90%",
    height: "auto",
    marginTop: 30,
  },
  criterias: {
    height: "auto",
    width: "auto",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
  criteria: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6C02",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  criteriaText: {
    fontSize: 12,
    fontWeight: "700",
    color: "black"
  },
});
