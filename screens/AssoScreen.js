import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CountryDropdown from "../components/countryDropdown";
import AddressDropdown from "../components/addressDropdown";
import categoriesList from "../assets/categoriesList";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";

const BACKEND_ADDRESS = "http://10.0.1.62:3000";

export default function AssoScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [residenceCountry, setResidenceCountry] = useState("");
  const [categories, setCategories] = useState([]);
  const [streetNumberAndLabel, setStreetNumberAndLabel] = useState("");
  const [zipcode, setZipcode] = useState(null);
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [country, setCountry] = useState("");
  const [languages, setLanguages] = useState([]);
  const [interventionZone, setInterventionZone] = useState([]);
  const [creationDate, setCreationDate] = useState(null);
  const [lastDeclarationDate, setlastDeclarationDate] = useState(null);
  const [legalNumber, setLegalNumber] = useState("");

  const categoriesDataSet = categoriesList.map((category, i) => ({
    id: `${i}`,
    title: category,
  }));

  const selectResidenceCountry = (country) => {
    country && setResidenceCountry(country);
  };

  const selectNationalities = (country) => {
    country && setNationalities((nationalities) => [...nationalities, country]);
  };

  const selectCategories = (category) => {
    category && setCategories((categories) => [...categories, category]);
  };

  const selectAddress = (address) => {
    country && setStreetNumberAndLabel(address);
    console.log(streetNumberAndLabel)
  };

  let textNationalitiesSeleted = nationalities.length>0 &&
      <View style={styles.dataSelected}>
        <Text>Sélection:</Text>
      </View>

  const nationalitiesSelected = nationalities?.map((data, i) => {
    return (
        <View key={i}>
          <Text style={{ marginRight: 5, marginLeft: 5, color: "blue" }}>
            {data}
          </Text>
        </View>
    );
  });

  let textCategoriesSeleted = categories.length>0 &&
      <View style={styles.dataSelected}>
        <Text>Sélection:</Text>
      </View>

  const categoriesSelected = categories?.map((data, i) => {
    return (
        <View key={i} >
          <Text style={{ marginRight: 5, marginLeft: 5, color: "blue" }}>
            {data}
          </Text>
        </View>
    );
  });

  const newAsso = {
    name: "test frontend",
    description: "test frontend",
    nationalities: ["test frontend"],
    categories: ["test frontend"],
    address: {
      street: "test",
      zipcode: 12,
      city: "test",
      region: "test",
      country: "test",
    },
    phone: ["test frontend"],
    email: "test",
    members: [
      {
        name: "67c5986fc92f26da214b7ec3",
        role: "test",
      },
    ],
    socialNetworks: [
      {
        name: "test",
        url: "test",
      },
    ],
    languages: ["test frontend"],
    interventionZone: ["test frontend"],
    lastDeclarationDate: null,
    creationDate: null,
    legalNumber: "test frontend",
    gallery: ["test frontend"],
    history: ["test frontend"],
    missions: ["test frontend"],
  };

  const handleRegistrationSubmit = () => {
    fetch(`${BACKEND_ADDRESS}/associations/creation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAsso),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // à modifier
      });
  };

  fetch("http://localhost:3000/weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAsso),
  }).then((response) => response.json());

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainHeaderContainer}>
        <Text style={styles.mainHeader}>Enregistrer votre association</Text>
        <View style={styles.bottomBorder} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.safeAreaContainer}>
          <View style={styles.firstSubSectionContainer}>
            <Text style={styles.subSectionHeader}>
              Identification de l'association
            </Text>
            <Input
              title="Nom de l'association"
              placeholder="Nom de l'association"
              value={name}
              onChangeText={(value) => setName(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            {/* <View style={styles.inputContainer}>
                  <Text style={styles.title}>DESCRIPTION</Text>
                  <View style={styles.input}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Objet de l'association"
                      value={description}
                      onChangeText={(value) => setDescription(value)}
                      secureTextEntry={false}
                    />
                    <FontAwesome name={"pencil"} size={16} color="#bbbbbb" style={styles.icon} />
                  </View>
                </View> */}
            <Input
              title="Description"
              placeholder="Objet de l'association"
              value={description}
              onChangeText={(value) => setDescription(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Pays de résidence de l'asso"
                placeholder="Choisir un pays"
                onSelectCountry={selectResidenceCountry}
                selectedCountry={residenceCountry}
              />
            </View>
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Pays d'origine des membres"
                placeholder="Choisir un ou plusieurs pays"
                onSelectCountry={selectNationalities}
                selectedCountry={nationalities}
              />
            </View>
            <View style={styles.dataSelected}>
              {textNationalitiesSeleted}
              {nationalitiesSelected}
            </View>
            <AutocompleteDropdownContextProvider>
              <View style={styles.container}>
                {/* Affichage du titre si fourni */}
                <Text style={styles.title}>SECTEURS D'ACTIVITE</Text>

                {/* Composant AutocompleteDropdown */}
                <AutocompleteDropdown
                  clearOnFocus={false} // Garde le texte saisi quand on clique sur le champ
                  closeOnBlur={true} // Ferme la liste quand on clique ailleurs
                  closeOnSubmit={false} // Ne ferme pas la liste après sélection
                  onSelectItem={(item) => {
                    selectCategories(item?.title); // Met à jour la liste des catégories
                    console.log("catégories sélectionnées: ", categories);
                  }}
                  dataSet={categoriesDataSet} // Passe la liste des suggestions
                  textInputProps={{
                    placeholder: "Sélection un ou plusieurs secteurs", // Affichage du placeholder
                    style: styles.input,
                    value: categories, // Texte affiché dans le champ
                    //onChangeText: setSearchText,  Met à jour searchText à chaque frappe
                  }}
                  inputContainerStyle={styles.inputContainer}
                  suggestionsListContainerStyle={styles.suggestionsList}
                />
              </View>
            </AutocompleteDropdownContextProvider>
            <View style={styles.dataSelected}>
              {textCategoriesSeleted}
              {categoriesSelected}
            </View>
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Informations de contact</Text>
            <View style={styles.dropdown}>
              <AddressDropdown
                title="Numéro et libellé de la voie"
                placeholder="Ex: 35 Avenue des Champs Elysées"
                onSelectAddress={selectAddress}
                selectedAddress={streetNumberAndLabel}
              />
            </View>
            <Input
              title="Numéro et libellé de la voie"
              placeholder="Exemple: 35 Avenue des Champs Elysées"
              value={streetNumberAndLabel}
              onChangeText={(value) => setStreetNumberAndLabel(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Code postal"
              placeholder="Exemple: 75008"
              value={zipcode}
              onChangeText={(value) => setZipcode(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Ville"
              placeholder="Exemple: Paris"
              value={city}
              onChangeText={(value) => setCity(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="N° de département"
              placeholder="Exemple: 75"
              value={department}
              onChangeText={(value) => setDepartment(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Pays"
              placeholder="Exemple: France"
              value={country}
              onChangeText={(value) => setCountry(value)}
              secureTextEntry={false}
              icon="pencil"
            />
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Informations légale</Text>
            <Input
              title="Date de création"
              placeholder="JJ/MM/AAAA"
              value={creationDate}
              onChangeText={(value) => setCreationDate(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Numéro d'identification"
              placeholder="Exemple: W111000000"
              value={legalNumber}
              onChangeText={(value) => setLegalNumber(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Date dernière déclaration"
              placeholder="Exemple: JJ/MM/AAAA"
              value={lastDeclarationDate}
              onChangeText={(value) => setlastDeclarationDate(value)}
              secureTextEntry={false}
              icon="pencil"
            />
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Autres informations</Text>
            <Input
              title="Langues parlées"
              placeholder="Sélectionner une ou plusieurs langues"
              value={languages}
              onChangeText={(value) => setLanguages(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Zone d'intervention"
              placeholder="Sélectionner un ou plusieurs pays"
              value={interventionZone}
              onChangeText={(value) => setInterventionZone(value)}
              secureTextEntry={false}
              icon="pencil"
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleRegistrationSubmit()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  safeAreaContainer: {
    paddingTop: 15,
    width: "90%",
    alignItems: "center",
  },
  mainHeaderContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  bottomBorder: {
    //Trait en bas du titre
    position: "absolute",
    bottom: 0,
    width: "90%",
    height: 2, // Épaisseur de la bordure
    backgroundColor: "black",
  },
  mainHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    position: "absolute",
    top: 0,
    width: "100%",
    height: 50,
    textAlign: "center",
  },
  firstSubSectionContainer: {
    width: "100%",
  },
  subSectionContainer: {
    borderTopWidth: 1.5,
    width: "100%",
  },
  subSectionHeader: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  button: {
    position: "absolute",
    top: 0,
    backgroundColor: "#FF6C02",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 5,
    height: "60%",
    // Ombre pour **Android**
    elevation: 5,
    // Ombre pour **iOS**
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  title: {
    color: "#FF6C02",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 100,
  },
  inputText: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 8,
  },
  dataSelected: {
    fontSize: 5,
    color: "red",
    flexDirection: "row",
    marginBottom: 4,
  },
  //début mise en forme dropdown secteur d'activité
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
  // fin mise en forme dropdown secteur d'activité
});
