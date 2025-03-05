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
import CityDropdown from "../components/cityDropdown";
import CountryDropdown from "../components/countryDropdown";
import AssociationCard from "../components/associationCard";
import CategorieRound from "../components/categorieRound";
import categoriesList from "../assets/categoriesList";

export default function SearchScreen({ navigation }) {
  const [typeContent, setTypeContent] = useState("default");
  const [resultResearch, setResultResearch] = useState("default");

  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");

  const [associations, setAssociations] = useState([]);
  const [filteredAssociations, setFilteredAssociations] = useState([]);

  const handleSearch = () => {
    setTypeContent("search");
    setResultResearch("default");
  };

  const handleResearch = () => {
    setTypeContent("default");
    setResultResearch("search");
  };

  // AFFICHAGE DES ASSOCIATIONS ALÉATOIRE AU LANCEMENT DE L'APP
  useEffect(() => {
    fetch("http://10.0.1.57:3000/associations/all")
      .then((response) => response.json())
      .then((data) => {
        setAssociations(data); // ON LES STOCKE DANS UN STATE
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des associations :",
          error
        )
      );
  }, []);

  // AFFICHAGE DES ASSOCIATIONS PAR CATÉGORIE LORS D'UN CLIC
  const handleCategoryClick = (category) => {
    fetch(`http://10.0.1.57:3000/associations/categories/${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFilteredAssociations(data.associations);
          setResultResearch("search");
        } else {
          setFilteredAssociations([]);
          setResultResearch("search");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error)
      );
  };

  const handleCountryClick = (country) => {
    fetch(`http://10.0.1.57:3000/associations/country/${country}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFilteredAssociations(data.associations);
          setResultResearch("search");
        } else {
          setFilteredAssociations([]);
          setResultResearch("search");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error)
      );
  };

  // RÉCUPÉRATION DES CATÉGORIES
  let associationsCategories =
    categoriesList.length > 0 ? (
      categoriesList.map((category, index) => (
        <Pressable key={index} onPress={() => handleCategoryClick(category)}>
          <View style={{ marginRight: 5 }}>
            <CategorieRound categorie={category} />
          </View>
        </Pressable>
      ))
    ) : (
      <Text>Aucune catégorie trouvée.</Text>
    );

  // AFFICHAGE DE LA DIV DE RECHERCHE
  let content;
  if (typeContent === "default") {
    // PAR DEFAUT
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
    // LORSQUE L'ON CLIC SUR RECHERCHER
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
                onSelectCountry={(country) => {
                  setDestinationCountry(country);
                  handleCountryClick(country);
                }}
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

          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
            showsHorizontalScrollIndicator={false}
            style={styles.categories}
          >
            {associationsCategories}
          </ScrollView>

          <View style={styles.criterias}>
            {/* CRTIERE A RECUPERER DU BACK OU DE QQPART AVEC UN .MAP */}
            <Pressable style={styles.criteria}>
              <Text style={styles.criteriaText}>Récemment créée</Text>
            </Pressable>
            <Pressable style={styles.criteria}>
              <Text style={styles.criteriaText}>Taille</Text>
            </Pressable>
            <Pressable style={styles.criteria}>
              <Text style={styles.criteriaText}>Statut</Text>
            </Pressable>
          </View>
          <Pressable style={styles.validateButton} onPress={handleResearch}>
            <Text style={styles.validateButtonText}>Rechercher</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // CONTENU INITIAL AVEC LES ASSO ALÉATOIRES
  let initialContent =
    associations.length > 0 ? (
      associations.map((association, index) => (
        <AssociationCard key={index} association={association} />
      ))
    ) : (
      <Text>Aucune association trouvée.</Text>
    );

  // CONTENU DES ASSOCIATIONS FILTRÉES
  let researchedContent =
    filteredAssociations.length > 0 ? (
      filteredAssociations.map((association, index) => (
        <AssociationCard key={index} association={association} />
      ))
    ) : (
      <Text>Aucune association trouvée.</Text>
    );

  // RESULTAT DE LA RECHERCHE
  let resultFromResearch;
  if (resultResearch === "default") {
    //
    resultFromResearch = initialContent;
  } else if (resultResearch === "search") {
    resultFromResearch = researchedContent;
  }

  return (
    // AFFICHAGE GLOBAL
    <View style={styles.container}>
      <View style={styles.allContent}>
        {content}
        <View style={styles.line}></View>
        <ScrollView style={styles.allAssociations}>
          {resultFromResearch}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTAINER GLOBAL
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  // CONTAINER SANS LE DIV DE RECHERCHE
  allContent: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  // DIV DE RECHERCHE SANS CRITÈRES
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

    // Ombre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  topContent: {
    // LOGO + BOUTON ENREGISTRER
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 32,
  },
  logo: {
    // LOGO
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  addAsso: {
    // BOUTON ENREGISTRER
    backgroundColor: "#FF6C02",
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginBottom: 7,

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
    // BOUTON RECHERCHER
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
  line: {
    // SÉPARATEUR
    width: "90%",
    height: 1,
    backgroundColor: "black",
    marginTop: 20,
    alignSelf: "center",
  },
  // DIV DE RECHERCHE AVEC CRITÈRES
  research: {
    // CONTIENT TOUT
    width: "90%",
    height: "auto",
    marginTop: 30,
  },
  allInputs: {
    // CONTIENT LES INPUTS
    height: "auto",
    justifyContent: "flex-start",
  },
  dropdown: {
    // LES DROPDOWNS
    width: "auto",
    height: "80",
  },
  criterias: {
    // TOUS LES CRIT7RES
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
    // UN CRITÈRE
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
  validateButton: {
    // BOUTON RECHERCHER AVEC FILTRES
    height: 43,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C02",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,

    // Ombre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  validateButtonText: {
    paddingVertical: 10,
    color: "white",
    fontWeight: "600",
  },
  // CONTENU ASSOCIATIONS
  allAssociations: {
    // CONTIENT TOUTES LES ASSOCIATIONS
    width: "90%",
    height: "auto",
    marginTop: 20,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "auto",
    overflow: "hidden",
  },
});
