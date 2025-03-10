import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import SearchHome from "../components/searchScreen/searchHome";
import SearchFilters from "../components/searchScreen/searchFilters";
import SearchResult from "../components/searchScreen/searchResult";
import AssociationCard from "../components/associationCard";
import CategorieRound from "../components/categorieRound";
import categoriesList from "../assets/categoriesList";

import { BACKEND_ADDRESS } from "../assets/url";

export default function SearchScreen({ navigation }) {

  // États principaux
  const [typeContent, setTypeContent] = useState("default");
  const [resultResearch, setResultResearch] = useState("default");

  // États pour les filtres
  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCriterias, setShowCriterias] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // États pour stocker les associations
  const [associations, setAssociations] = useState([]);
  const [filteredAssociations, setFilteredAssociations] = useState([]);

  // Récupération des associations au chargement
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/associations/randomall`)
      .then((response) => response.json())
      .then((data) => setAssociations(data.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error)
      );
  }, []);

  // Fonction pour rechercher les associations avec les filtres
  const handleFilteredSearch = (
    country = destinationCountry,
    city = destinationCity,
    category = selectedCategory
  ) => {
    let queryParams = [];

    if (country) queryParams.push(`country=${encodeURIComponent(country)}`);

    if (city) queryParams.push(`city=${encodeURIComponent(city)}`);

    if (category) queryParams.push(`category=${encodeURIComponent(category)}`);

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    if (!queryString) {
      setFilteredAssociations(associations);
    } else {
      fetch(`${BACKEND_ADDRESS}/associations/search${queryString}`)
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
          console.error("Erreur lors de la recherche :", error)
        );
    }
  };

  // Gestion du clic sur une catégorie
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTimeout(handleFilteredSearch, 0);
  };

  // Affichage des catégories
  const associationsCategories =
    categoriesList.length > 0 ? (
      categoriesList.map((category, index) => (
        <TouchableOpacity key={index} onPress={() => handleCategoryClick(category)}>
          <View style={{ marginRight: 5 }}>
            <CategorieRound categorie={category} />
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <Text>Aucune catégorie trouvée.</Text>
    );

  // Gestion de l'affichage
  const handleBackToDefault = () => {
    setTypeContent("default");
    setResultResearch("default");
  };

  const handleBackToSearch = () => {
    setTypeContent("search");
  };

  const toggleCriterias = () => {
    setShowCriterias(!showCriterias);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleShowResult = () => {
    setTypeContent("result");
  };

  // Affichage des associations
  const resultFromResearch =
  resultResearch === "default"
    ? associations.map((association) => (
          <AssociationCard key={association.id} association={association} />
      ))
    : filteredAssociations.map((association) => (
          <AssociationCard key={association.id} association={association} />
      ));

  return (
    <View style={styles.container}>
      <View style={styles.allContent}>
        {typeContent === "default" && (
          <SearchHome setTypeContent={setTypeContent} />
        )}
        {typeContent === "search" && (
          <SearchFilters
            handleBackToDefault={handleBackToDefault}
            handleFilteredSearch={handleFilteredSearch}
            originCountry={originCountry}
            setOriginCountry={setOriginCountry}
            destinationCountry={destinationCountry}
            setDestinationCountry={setDestinationCountry}
            destinationCity={destinationCity}
            setDestinationCity={setDestinationCity}
            associationsCategories={associationsCategories}
            criteriasView={showCriterias}
            filtersView={showFilters}
            toggleCriterias={toggleCriterias}
            handleShowResult={handleShowResult}
          />
        )}
        {typeContent === "result" && (
          <SearchResult
            handleBackToDefault={handleBackToDefault}
            handleBackToSearch={handleBackToSearch}
            originCountry={originCountry}
            destinationCountry={destinationCountry}
          />
        )}

        <ScrollView style={styles.allAssociations}>
          {resultFromResearch}
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
  allAssociations: {
    width: "90%",
    height: "auto",
    marginTop: 30,
  },
});
