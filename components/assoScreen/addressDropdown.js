import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";

const AddressDropdown = ({
  title,
  placeholder,
  selectedAddress,
  onSelectAddress,
  updateAddressProperties,
}) => {
  // État pour stocker le texte saisi par l'utilisateur
  const [searchText, setSearchText] = useState(selectedAddress || "");
  // État pour stocker la liste des suggestions de villes
  const [suggestions, setSuggestions] = useState([]);

  // Effet qui se déclenche à chaque modification de searchText
  useEffect(() => {
    if (searchText.length < 1) {
      // si la recherche est < 1 on fait rien
      setSuggestions([]);
      return;
    }

    fetch(`https://api-adresse.data.gouv.fr/search/?q=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.features) {
          // Transformation des données API en une liste exploitable
          const formattedAddresses = data.features.map((feature, index) => ({
            id: index,
            title: feature.properties.label, // Nom de la rue
          }));

          setSuggestions(formattedAddresses); // Mettre à jour les suggestions
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des addresses :", error);
      });
  }, [searchText]); // se met à jour à chaque modification de searchText

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
            if (!item) return; // Vérifie que l'élément sélectionné est valide
            fetch(`https://api-adresse.data.gouv.fr/search/?q=${item.title}`)
              .then((response) => response.json())
              .then((data) => {
                if (data.features) {
                  // Met à jour le texte affiché
                  setSearchText(data.features[0].properties.name || ""); 
                  // Mettre à jour les champs de l'addresse, de "numéro et libellé de la voie" à "pays"
                  updateAddressProperties(data) //
                }
              });
            onSelectAddress(item?.title || ""); // Exécute la fonction callback
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
          suggestionsListProps={{
            nestedScrollEnabled: true,
          }}
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

export default AddressDropdown;
