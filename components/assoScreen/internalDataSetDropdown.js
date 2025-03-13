import {
  StyleSheet,
  Text,
  View,
} from "react-native";


import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";

const InternalDataSetDropdown = ({
  title,
  dataSet,
  placeholder,
  value,
  onSelectItem,
}) => {
    return (
  <AutocompleteDropdownContextProvider>
    <View style={styles.container}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <AutocompleteDropdown
        clearOnFocus={false} // Garde le texte saisi quand on clique sur le champ
        closeOnBlur={true} // Ferme la liste quand on clique ailleurs
        closeOnSubmit={false} // Ne ferme pas la liste après sélection
        onSelectItem={onSelectItem}
        dataSet={dataSet} // Passe la liste des suggestions
        textInputProps={{
          placeholder, // Affichage du placeholder
          style: styles.input,
          value, // Texte affiché dans le champ
          //onChangeText: setSearchText,  Met à jour searchText à chaque frappe
        }}
        inputContainerStyle={styles.inputContainer}
        suggestionsListContainerStyle={styles.suggestionsList}
        suggestionsListProps={{
          nestedScrollEnabled: true, 
        }}
      />
    </View>
  </AutocompleteDropdownContextProvider>
  )
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

export default InternalDataSetDropdown;
