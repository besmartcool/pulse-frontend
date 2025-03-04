import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from "../components/input";
import CityDropdown from "../components/cityDropdown";
import CountryDropdown from "../components/countryDropdown";

export default function SearchScreen({ navigation }) {
  const [typeContent, setTypeContent] = useState("default");

  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");

  const [associations, setAssociations] = useState([]);

  const handleSearch = () => {
    setTypeContent("search");
  };

  const handleResearch = () => {
    setTypeContent("default");
  };

  useEffect(() => {
    fetch("http://localhost:3000/associations/all")
      .then((response) => response.json())
      .then((data) => {
        data.association;
        setAssociations(data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des associations :",
          error
        )
      );
  }, []);

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
          <View style={styles.allInputs}>
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Pays d'origine"
                placeholder="Rechercher un pays..."
                selectedCountry={originCountry}
                onSelectCountry={setOriginCountry}
              />
            </View>
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Pays de destination"
                placeholder="Rechercher un pays..."
                selectedCountry={destinationCountry}
                onSelectCountry={setDestinationCountry}
              />
            </View>
            <View style={styles.dropdown}>
              <CityDropdown
                title="Ville de destination"
                placeholder="Rechercher une ville..."
                selectedCity={destinationCity}
                onSelectCity={setDestinationCity}
              />
            </View>
          </View>

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

  let resultFromSearch =
    associations.length > 0 ? (
      associations.map((association, index) => (
        <View key={index} style={styles.associationCard}>
          <View style={styles.topAssoContent}>
            <Text>Logo</Text>
            <View style={styles.textTitle}>
              <Text>{association.name}</Text>
              <Text>{association.nationality}</Text>
            </View>
            <Text>Categorie</Text>
          </View>
          <Image
            style={styles.image}
            source={require("../assets/placeholderImage.png")}
          />
          <Text style={styles.description}>
            {association.description.length > 100
              ? association.description.slice(0, 200) + "..."
              : association.description}
          </Text>
          <View style={styles.bottomAssoContent}>
            <FontAwesome name="heart" size={28} color="#000000" />
            <FontAwesome name="comment" size={28} color="#000000" />
          </View>
        </View>
      ))
    ) : (
      <Text>Aucune association trouvée.</Text>
    );

  return (
    <View style={styles.container}>
      <View style={styles.allContent}>
        {content}
        <View style={styles.line}></View>
        <ScrollView style={styles.allAssociations}>
          {resultFromSearch}
        </ScrollView>
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
  allInputs: {
    height: "auto",
    justifyContent: "flex-start",
  },
  dropdown: {
    width: "auto",
    height: "80",
  },
  criterias: {
    height: "auto",
    width: "auto",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
    color: "black",
  },
  allAssociations: {
    width: "90%",
    height: "auto",
    marginTop: 20,
  },
  associationCard: {
    height: 300,
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: "flex-start",
    alignItems: "center",
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
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    width: "100%",
  },
  textTitle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  description: {
    padding: 10,
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
});
