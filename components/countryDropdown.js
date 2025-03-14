import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";

const CountryDropdown = ({
  title,
  placeholder,
  onSelectCountry,
  resetInput,
}) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const firstRender = useRef(true); // ✅ useRef pour suivre la première exécution

  // ON STOCK LA LISTE DES PAYS TRADUITE DANS LE STATE ALLCOUNTRIES
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=translations")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formattedCountries = data.map((country) => ({
            title: country.translations?.fra?.common || country.name.common,
          }));
          setAllCountries(formattedCountries);
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des pays :", error)
      );
  }, []);

  useEffect(() => {
    // Ignore la première exécution afin de faire des suggestions uniquement après la première saisie
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!searchText) {
      setSuggestions([]);
      return;
    }

    // ON VERIFIE SI CE QUE L'USER ECRIT EXISTE DANS LE STATE ALLCOUNTRIES
    const filteredCountries = allCountries.filter((country) =>
      country.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setSuggestions(filteredCountries);
  }, [searchText, allCountries]);

  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title.toUpperCase()}</Text>}

        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          onSelectItem={(item) => {
            setSearchText(item?.title || "");
            onSelectCountry(item?.title);
          }}
          onClear={() => {
            setSearchText("");
            resetInput();
          }}
          dataSet={suggestions}
          textInputProps={{
            placeholder,
            style: styles.input,
            value: searchText,
            onChangeText: setSearchText,
          }}
          inputContainerStyle={styles.inputContainer}
          suggestionsListContainerStyle={styles.suggestionsList}
          suggestionsListProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View>
    </AutocompleteDropdownContextProvider>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  title: { color: "#FF6C02", fontSize: 12, fontWeight: "600", marginBottom: 4 },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    backgroundColor: 'white'
  },
  input: {
    padding: 8,
    fontSize: 14,
    color: "gray",
  },
  suggestionsList: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dddddd",
    right: 26.5,
  },
});

export default CountryDropdown;
