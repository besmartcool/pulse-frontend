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
    fetch("http://10.0.2.19:3000/associations/all")
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

    fetch(`http://10.0.2.19:3000/associations/search${queryString}`)
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
  const handleBackToSearch = () => {
    setTypeContent("search");
  };

  const handleBackToDefault = () => {
    setTypeContent("default");
    setResultResearch("default"); // Revient aux associations aléatoires
  };

  // Bouton sur la div secondaire
  const handleResearch = () => {
    setTypeContent("result");
    setResultResearch("result"); // On garde les résultats affichés
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
    content = (
      <View style={styles.fakeModal}>
        <View style={styles.research}>
          {/* Header avec logo et bouton */}
          <View style={styles.topContent}>
            <Image style={styles.logo} source={require("../assets/Logo.png")} />
            <Pressable style={styles.addAsso}>
              <Text style={styles.addAssoText}>+ Ajouter une association</Text>
            </Pressable>
          </View>
          {/* Bouton de recherche */}
          <Pressable
            style={styles.searchButton}
            onPress={() => setTypeContent("search")}
          >
            <FontAwesome name="search" size={18} color="#FF6C02" />
            <Text style={styles.searchButtonText}>
              Rechercher une association
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
  if (typeContent === "search") {
    content = (
      <View style={styles.fakeModal}>
        <View style={styles.research}>
          {/* Bouton Retour */}
          <Pressable onPress={handleBackToDefault} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color="#FF6C02" />
          </Pressable>

          {/* Filtres */}
          <View style={styles.allInputs}>
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Pays d'origine"
                placeholder="Sélectionner un pays"
                selectedCountry={originCountry}
                onSelectCountry={setOriginCountry}
              />
            </View>

            <View style={styles.dropdown}>
              <CountryDropdown
                title="Pays de destination"
                placeholder="Sélectionner un pays"
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
                placeholder="Sélectionner une ville"
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

          {/* Catégories */}
          <ScrollView
            horizontal
            contentContainerStyle={styles.categoriesContainer}
            showsHorizontalScrollIndicator={false}
          >
            {associationsCategories}
          </ScrollView>

          {/* Critères supplémentaires */}
          <View style={styles.criterias}>
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

          {/* Bouton Valider */}
          <View style={styles.bottomContent}>
            <Pressable style={styles.validateButton} onPress={handleShowResult}>
              <FontAwesome name="filter" size={30} color="white" />
            </Pressable>
            <Pressable style={styles.validateButton} onPress={handleShowResult}>
              <FontAwesome name="angle-up" size={30} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  } else if (typeContent === "result") {
    if (!originCountry || !destinationCountry) {
      content = (
       <View><Text>Aîe</Text></View>
      );
    } else {
      content = (
        <View style={styles.fakeModal}>
        <View style={styles.newResearch}>
          {/* Bouton Retour */}
          <Pressable onPress={handleBackToDefault} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color="#FF6C02" />
          </Pressable>
            <View style={styles.resultat}>
                <View>
                  <Text style={styles.result}>
                    {originCountry || "N"} {""}
                  </Text>
                </View>
              <>
                <FontAwesome name="arrow-right" size={10} color="#bbbbbb" />
                <View>
                  <Text style={styles.result}>
                    {""} {destinationCountry || "N"}
                  </Text>
                </View>
              </>
            </View>
          <View style={styles.toptopContent}>
            <Pressable
              onPress={handleBackToSearch}
              style={styles.validateButton}
            >
              <FontAwesome name="angle-down" size={30} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      )
    }
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
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
    backgroundColor: "white",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
    width: "90%",
    height: "auto",
    marginTop: 30,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#FFF5E6",
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  allInputs: {
    width: "100%",
  },
  dropdown: {
    width: "auto",
    height: "80",
  },
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  criterias: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 8,
    justifyContent: "flex-start",
  },

  criteria: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#FF6C02",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFF5E6",
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  criteriaText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6C02",
  },
  validateButton: {
    height: 55,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C02",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
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
    marginTop: 10,
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
    height: "auto",
    gap: 15,
  },
  newResearch: {
    // CONTIENT TOUT
    width: "90%",
    height: "auto",
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 15,
  },
  resultat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 'auto',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#F9F9F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6C02",
    textAlign: "center",
  },
  toptopContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
