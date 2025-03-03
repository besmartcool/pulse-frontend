import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";

const CityAutocomplete = () => {
  const [searchText, setSearchText] = useState(""); // État pour le texte saisi
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Met à jour le texte affiché quand un élément est sélectionné
  useEffect(() => {
    if (selectedItem?.title) {
      setSearchText(selectedItem.title);
    }
  }, [selectedItem]);

  // Fetch des villes depuis l'API Nominatim
  useEffect(() => {
    if (searchText.length < 2) {
      setSuggestions([]); // Évite de spammer l'API avec des recherches trop courtes
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${searchText}&format=json&limit=10`
        );
        const data = await response.json();

        if (data.length > 0) {
          setSuggestions(
            data.map((place, index) => ({
              id: index.toString(),
              title: place.display_name, // Affiche le nom complet (ville, pays)
            }))
          );
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des villes :", error);
      }
    };

    fetchCities();
  }, [searchText]);

  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Where are we going?</Text>
        <View style={styles.autocompleteContainer}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            onSelectItem={setSelectedItem}
            dataSet={suggestions} // Liste des villes de l'API
            textInputProps={{
              placeholder: "Search City",
              style: styles.input,
              value: searchText,
              onChangeText: setSearchText, // Met à jour l'état de l'input
            }}
            inputContainerStyle={styles.inputContainer}
            suggestionsListContainerStyle={styles.suggestionsList}
            containerStyle={styles.dropdownContainer}
          />
        </View>
        {selectedItem ? (
          <Text style={styles.selectedText}>
            Selected City: {selectedItem.title}
          </Text>
        ) : null}
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  autocompleteContainer: {
    width: "80%",
    zIndex: 1000,
  },
  dropdownContainer: {
    width: "100%",
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "green",
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
    borderColor: "green",
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default CityAutocomplete;
