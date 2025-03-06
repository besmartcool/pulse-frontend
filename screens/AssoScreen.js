import React, { useState, useEffect } from "react";
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
import CountryDropdown from "../components/countryDropdown";
import AddressDropdown from "../components/addressDropdown";
import categoriesList from "../assets/categoriesList";
import languagesListFrench from "../assets/languagesList";
import DatePickerInput from "../components/dateTimePicker";
import InternalDataSetDropdown from "../components/internalDataSetDropdown";
import  PhoneInput from "../components/phoneInput";

const BACKEND_ADDRESS = "http://10.0.1.62:3000";

export default function AssoScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [residenceCountry, setResidenceCountry] = useState("");
  const [categories, setCategories] = useState([]);
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState("");
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
  const [members, setMembers] = useState([]);

  const categoriesDataSet = categoriesList.map((category, i) => ({
    id: `${i}`,
    title: category,
  }));

  const selectResidenceCountry = (country) => {
    if (country) {
      setResidenceCountry(country);
      setCountry(country);
    }
  };

  const selectNationalities = (country) => {
    if (country) {
      setNationalities((nationalities) => [...nationalities, country]);
    }
  };

  const selectCategories = (category) => {
    if (category) {
      setCategories((categories) => [...categories, category]);
    }
  };

  const addPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      setPhone((phone) => [...phone, phoneNumber]);
    }
  };

  const formatFrenchPhoneNumber = (phoneNumber) => {
    if (!/^0\d{9}$/.test(phoneNumber)) return "Numéro invalide";
    return `+33 ${phoneNumber.slice(1, 2)} ${phoneNumber.slice(2, 4)} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
  };

  const phoneNumbers = phone?.map((data, i) => {
    return (
      <View key={i}>
        <Text style={{ marginRight: 5, marginLeft: 5, color: "blue" }}>
          Tél {i+1}: {formatFrenchPhoneNumber(data)}
        </Text>
      </View>
    );
  });

  let textNationalitiesSeleted = nationalities.length > 0 && (
    <View style={styles.dataSelected}>
      <Text>Sélection:</Text>
    </View>
  );

  const nationalitiesSelected = nationalities?.map((data, i) => {
    return (
      <View key={i}>
        <Text style={{ marginRight: 5, marginLeft: 5, color: "blue" }}>
          {data}
        </Text>
      </View>
    );
  });

  let textCategoriesSeleted = categories.length > 0 && (
    <View style={styles.dataSelected}>
      <Text>Sélection:</Text>
    </View>
  );

  const categoriesSelected = categories?.map((data, i) => {
    return (
      <View key={i}>
        <Text style={{ marginRight: 5, marginLeft: 5, color: "blue" }}>
          {data}
        </Text>
      </View>
    );
  });

  const updateAddressProperties = (data) => {
    if (
      data &&
      data.features &&
      data.features[0] &&
      data.features[0].properties
    ) {
      setStreetNumberAndLabel(data.features[0].properties.name);
      setZipcode(data.features[0].properties.postcode);
      setCity(data.features[0].properties.city);
      setDepartment(data.features[0].properties.context.slice(0, 2));
    } else {
      console.error("Invalid address data:", data);
    }
  };

  const selectCreationDate = (date) => {
    if (date) {
      setCreationDate(date);
    }
  };

  const selectLastDeclarationDate = (date) => {
    if (date) {
      setlastDeclarationDate(date);
    }
  };

  const selectInterventionZone = (country) => {
    if (country) {
      setInterventionZone((interventionZone) => [...interventionZone, country]);
    }
  };

  const interventionZoneSelected = interventionZone?.map((data, i) => {
    return (
      <View key={i}>
        <Text style={{ marginRight: 5, marginLeft: 5, color: "blue" }}>
          {data}
        </Text>
      </View>
    );
  });

  const languagesListFrenchDataSet = languagesListFrench.map(
    (language, i) => ({
      id: `${i}`,
      title: language,
    })
  );

  const selectLanguages = (language) => {
    if (language) {
      setLanguages((languages) => [...languages, language]);
    }
  };

  let textLanguagesSeleted = languages.length > 0 && (
    <View style={styles.dataSelected}>
      <Text>Sélection:</Text>
    </View>
  );

  const languagesSelected = languages?.map((data, i) => {
    return (
      <View key={i}>
        <Text style={{ marginRight: 5, marginLeft: 5, color: "blue" }}>
          {data}
        </Text>
      </View>
    );
  });

  // UseEffect pour vérifier la modification des états
  useEffect(() => {
    console.log("vérification:", phone);
  }, [phone]);

  const newAsso = {
    name,
    description,
    nationalities,
    categories,
    address: {
      street: streetNumberAndLabel,
      zipcode,
      city,
      department,
      country,
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
      .then((data) => {})
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

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
            <InternalDataSetDropdown
              title="Secteurs d'activité"
              dataSet={categoriesDataSet}
              placeholder="Choisir un ou plusieurs secteurs"
              value={categories}
              onSelectItem={(item) => {
                selectCategories(item?.title);
              }}
            />
            <View style={styles.dataSelected}>
              {textCategoriesSeleted}
              {categoriesSelected}
            </View>
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Informations de contact</Text>
            <Input
              title="Email"
              placeholder="saisir votre email"
              value={email}
              onChangeText={(value) => setEmail(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <PhoneInput
              title="Téléphone"
              placeholder="06..."
              value={phone}
              onChangeText={(value) => addPhoneNumber(value)}
              secureTextEntry={false}
              />
            {phoneNumbers}
            <View style={styles.dropdown}>
              <AddressDropdown
                title="Numéro et libellé de la voie"
                placeholder="Ex: 35 Avenue des Champs Elysées"
                onSelectAddress={setZipcode}
                selectedAddress={streetNumberAndLabel}
                updateAddressProperties={updateAddressProperties}
              />
            </View>
            <Input
              title="Code postal"
              placeholder="Exemple: 75008"
              value={zipcode}
              onChangeText={(value) => setZipcode(value)}
              secureTextEntry={false}
            />
            <Input
              title="Ville"
              placeholder="Exemple: Paris"
              value={city}
              onChangeText={(value) => setCity(value)}
              secureTextEntry={false}
            />
            <Input
              title="N° de département"
              placeholder="Exemple: 75"
              value={department}
              onChangeText={(value) => setDepartment(value)}
              secureTextEntry={false}
            />
            <Input
              title="Pays"
              placeholder="Exemple: France"
              value={country}
              onChangeText={(value) => setCountry(value)}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Informations légale</Text>
            <DatePickerInput
              title="Date de création"
              value={creationDate}
              selectDate={selectCreationDate}
            />
            <Input
              title="Numéro d'identification"
              placeholder="Exemple: W111000000"
              value={legalNumber}
              onChangeText={(value) => setLegalNumber(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <DatePickerInput
              title="Date dernière déclaration"
              value={lastDeclarationDate}
              selectDate={selectLastDeclarationDate}
            />
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Autres informations</Text>
            <InternalDataSetDropdown
              title="Langues parlées"
              dataSet={languagesListFrenchDataSet}
              placeholder="Choisir une ou plusieurs langues"
              value={languages}
              onSelectItem={(item) => {
                selectLanguages(item?.title);
              }}
            />
            <View style={styles.dataSelected}>
              {textLanguagesSeleted}
              {languagesSelected}
            </View>
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Zone d'intervention"
                placeholder="Sélectionner un ou plusieurs pays"
                onSelectCountry={selectInterventionZone}
                selectedCountry={interventionZone}
              />
            </View>
            <View style={styles.dataSelected}>
              {textNationalitiesSeleted}
              {interventionZoneSelected}
            </View>
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
