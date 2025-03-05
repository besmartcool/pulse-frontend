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
  // Etats type de contenu div du haut
  const [typeContent, setTypeContent] = useState("default");
  const [resultResearch, setResultResearch] = useState("default");

  // États pour stocker les filtres de recherche
  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // États pour stocker les associations
  const [associations, setAssociations] = useState([]);
  const [filteredAssociations, setFilteredAssociations] = useState([]);

  // Récupération des associations aléatoires au lancement
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

  // Fonction pour rechercher les associations en fonction des filtres
  const handleFilteredSearch = (
    country = destinationCountry,
    city = destinationCity,
    category = selectedCategory
  ) => {
    let queryParams = [];

    if (country) {
      queryParams.push(`country=${encodeURIComponent(country)}`);
    }
    if (city) {
      queryParams.push(`city=${encodeURIComponent(city)}`);
    }
    if (category) {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    // ON GÉNÉRE LA QUERY AVEC LES FILTRES VOULUS

    fetch(`http://10.0.1.57:3000/associations/search${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFilteredAssociations(data.associations); // ON STOCKE LES ASSOCIATIONS FILTRÉES
          setResultResearch("search"); // ON AFFICHE LES ASSO FILTRÉES
        } else {
          setFilteredAssociations([]); // SINON, AUCUNE ASSO TROUVÉE
          setResultResearch("search"); // ON AFFICHE QU'IL N'Y A PAS DE RÉSULTAT
        }
      })
      .catch((error) => console.error("Erreur lors de la recherche :", error));
  };

  // Gestion de la sélection d'une catégorie
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTimeout(handleFilteredSearch, 0); // ON APPELLE LA FONCTION DE RECHERCHE ET ON ATTEND QUE LE STATE SOIT BIEN MIS ) JOUR AVEC SETTIMEOUT
  };

  // Gestion des états d'affichage de la div principale
  // Bouton sur la div principale
  const handleSearch = () => {
    setTypeContent("search");
    setResultResearch("default");
  };

  // Bouton sur la div secondaire
  const handleResearch = () => {
    setTypeContent("default");
    setResultResearch("search");
  };

  // Bouton pour afficher le résultat de la recherche
const handleShowResult = () => {
  setTypeContent("result");
};


  // Gestion de la recherche filtrée après la mise à jour des filtres
  useEffect(() => {
    handleFilteredSearch();
  }, [destinationCountry, destinationCity, selectedCategory]);

  // Récupération des catégories de la BDD
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

  // Affichage des associations initiales (sans filtres)
  let initialContent =
    associations.length > 0 ? (
      associations.map((association, index) => (
        <AssociationCard key={index} association={association} />
      ))
    ) : (
      <Text>Aucune association trouvée.</Text>
    );

  // Affichage des associations filtrées
  let researchedContent =
    filteredAssociations.length > 0 ? (
      filteredAssociations.map((association, index) => (
        <AssociationCard key={index} association={association} />
      ))
    ) : (
      <Text>Aucune association trouvée.</Text>
    );

  // Définition des différents contenus
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
                  setTimeout(
                    () =>
                      handleFilteredSearch(
                        country,
                        destinationCity,
                        selectedCategory
                      ),
                    0
                  );
                }}
              />
            </View>
            <View style={styles.dropdown}>
              <CityDropdown
                title="Ville de destination"
                placeholder="Rechercher une ville..."
                selectedCity={destinationCity}
                onSelectCity={(city) => {
                  setDestinationCity(city);
                  setTimeout(
                    () =>
                      handleFilteredSearch(
                        destinationCountry,
                        city,
                        selectedCategory
                      ),
                    0
                  );
                }}
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
          <View style={styles.bottomContent}>
          <Pressable style={styles.validateButton} onPress={handleShowResult}>
            <FontAwesome name="angle-up" size={30} color="white" />
          </Pressable>
          </View>
        </View>
      </View>
    );
  } else if (typeContent === "result") {
    content = (
      <View style={styles.fakeModal}>
        <View style={styles.research}>
          <View styles={styles.toptopContent}>
          <Pressable style={styles.validateButton} onPress={handleSearch}>
            <FontAwesome name="angle-down" size={30} color="white" />
          </Pressable>
          </View>
        </View>
      </View>
    );
  }

  // Détermination du contenu affiché
  let resultFromResearch =
    resultResearch === "default" ? initialContent : researchedContent;

  return (
    <View style={styles.container}>
      <View style={styles.allContent}>
        {content}
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
    marginVertical: 20,
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
    height: 50,
    width: 50,
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
    backgroundColor: "#FF6C02",
    borderRadius: 25, // Pour un bouton bien rond

    // Ombre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  // CONTENU ASSOCIATIONS
  allAssociations: {
    // CONTIENT TOUTES LES ASSOCIATIONS
    width: "90%",
    height: "auto",
    marginTop: 30,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "auto",
    overflow: "hidden",
    marginTop: 10
  },
  buttonUpContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 'auto'
  },
  toptopContent: {
    backgroundColor: 'red',
  }
});
