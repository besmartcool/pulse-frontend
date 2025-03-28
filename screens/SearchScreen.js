import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import SearchHome from "../components/searchScreen/searchHome";
import SearchFilters from "../components/searchScreen/searchFilters";
import SearchResult from "../components/searchScreen/searchResult";
import AssociationCard from "../components/associationCard";
import CategorieRound from "../components/categorieRound";
import categoriesList from "../assets/categoriesList";

import { BACKEND_ADDRESS } from "../assets/url";

export default function SearchScreen({ navigation }) {

  // États principaux d'affichage
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

  // Récupération des associations aléatoirement au chargement
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/associations/randomall`)
      .then((response) => response.json())
      .then((data) => setAssociations(data.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error)
      );
  }, []);

  // Fonction pour rechercher les associations avec les filtres
  const handleFilteredSearch = (origin, destination, city, category) => {
    let queryParams = [];

    if (origin) queryParams.push(`originCountry=${encodeURIComponent(origin)}`); // si origin existe, alors on l'ajoute dans le tableau
    if (destination)
      queryParams.push(`destinationCountry=${encodeURIComponent(destination)}`); // pareil avec destination
    if (city) queryParams.push(`city=${encodeURIComponent(city)}`); // city
    if (category) queryParams.push(`category=${encodeURIComponent(category)}`); // et categorie

    const queryString = // on va coller chaque parametre avec des ? et & pour former l'url que l'on souhaite avoir
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    if (!queryString) { // si rien alors
      setFilteredAssociations(associations); // on laisse les assos comme tel
    } else { // sinon
      fetch(`${BACKEND_ADDRESS}/associations/search${queryString}`) // on va chercher les assos correspondantes
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
    setSelectedCategory((prevCategory) => { // lorsque l'on clic sur une category, on regarde si il correspond à celui d'avant, sinon on met le nouveau
      const newCategory = prevCategory === category ? "" : category;
      handleFilteredSearch(originCountry, destinationCountry, destinationCity, newCategory);
      return newCategory;
    });
  };

  // Affichage des catégories
  const associationsCategories =
    categoriesList.length > 0 ? (
      categoriesList.map((category, index) => (
        <TouchableOpacity
          key={category}
          onPress={() => handleCategoryClick(category)}
        >
          <View style={{ marginRight: 5 }}>
            <CategorieRound categorie={category} />
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <Text>Aucune catégorie trouvée.</Text>
    )

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

  const handleShowResult = () => {
    setTypeContent("result");
  };

  // Affichage des associations
  const resultFromResearch =
    resultResearch === "default"
      ? associations.map((association) => (
          <AssociationCard key={association.name} association={association} />
        ))
      : filteredAssociations.map((association) => (
          <AssociationCard key={association.name} association={association} />
        ));

  return (
    <View style={styles.container}>
      <View style={styles.allContent}>
        {typeContent === "default" && (
          <SearchHome
            setTypeContent={setTypeContent}
            navigation={() => navigation.navigate("Asso")}
          />
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
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
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
