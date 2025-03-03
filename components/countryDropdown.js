import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";


const CountryDropdown = ({ title, placeholder, selectedCountry, onSelectCountry }) => {
  // État pour stocker le texte saisi par l'utilisateur
  const [searchText, setSearchText] = useState(selectedCountry || "");
  // État pour stocker la liste des suggestions de pays
  const [suggestions, setSuggestions] = useState([]);

  // Effet qui se déclenche à chaque modification de searchText
  useEffect(() => {
    if (!searchText) {
      setSuggestions([]); // Si l'utilisateur supprime tout, on vide la liste
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${searchText}?fields=name`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Transformation des données API en une liste exploitable
          const formattedCountries = data.map((country) => ({
            title: country.name.common, // Nom du pays
          }));

          setSuggestions(formattedCountries); // Mettre à jour les suggestions
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des pays :", error);
      });
  }, [searchText]); // le composant se met à jour à chaque modification de searchText

  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        {/* Affichage du titre si fourni */}
        {title && <Text style={styles.title}>{title.toUpperCase()}</Text>}
        
        {/* Composant AutocompleteDropdown */}
        <AutocompleteDropdown
          clearOnFocus={false} // Garde le texte saisi quand on clique sur le champ
          closeOnBlur={true} // Ferme la liste quand on clique ailleurs
          closeOnSubmit={false} // Ne ferme pas la liste après sélection
          onSelectItem={(item) => {
            setSearchText(item?.title || ""); // Met à jour le texte affiché
            onSelectCountry(item?.title || ""); // Exécute la fonction callback
          }}
          dataSet={suggestions} // Passe la liste des suggestions
          textInputProps={{
            placeholder, // Affichage du placeholder
            style: styles.input,
            value: searchText, // Texte affiché dans le champ
            onChangeText: setSearchText, // Met à jour searchText à chaque frappe
          }}
          inputContainerStyle={styles.inputContainer}
          suggestionsListContainerStyle={styles.suggestionsList}
        />
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    color: "#FF6C02",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    backgroundColor: "white",
  },
  input: {
    padding: 12,
    fontSize: 16,
    color: "#2c3e50",
  },
  suggestionsList: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dddddd",
    right: 20,
  },
});

export default CountryDropdown;