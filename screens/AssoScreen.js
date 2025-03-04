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
        <Text style = {styles.mainHeader} >Enregistrer votre association</Text>
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
            <Input
              title="Pays de résidence de l'asso"
              placeholder="Pays de résidence de l'asso"
              value={residenceCountry}
              onChangeText={(value) => setResidenceCountry(value)}
              secureTextEntry={false}
              icon="caret-down"
            />
            <Input
              title="Pays d'origine des membres"
              placeholder="Pays d'origine"
              value={nationalities}
              onChangeText={(value) => setNationalities(value)}
              secureTextEntry={false}
              icon="caret-down"
            />
            <Input
              title="Secteur d'activité"
              placeholder="Amicales, groupements affinitaires, groupements d'entraide"
              value={categories}
              onChangeText={(value) => setCategories(value)}
              secureTextEntry={false}
              icon="caret-down"
            />
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Informations de contact</Text>
            <Input
              title="Numéro et libellé de la voie"
              placeholder="35 Avenue des Champs Elysées"
              value={streetNumberAndLabel}
              onChangeText={(value) => setStreetNumberAndLabel(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Code postal"
              placeholder="75008"
              value={zipcode}
              onChangeText={(value) => setZipcode(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Ville"
              placeholder="Paris"
              value={city}
              onChangeText={(value) => setCity(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="N° de département"
              placeholder="75"
              value={department}
              onChangeText={(value) => setDepartment(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Pays"
              placeholder="France"
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
              placeholder="W111000000"
              value={legalNumber}
              onChangeText={(value) => setLegalNumber(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Date dernière déclaration"
              placeholder="JJ/MM/AAAA"
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
              placeholder="Français, Albanais, Anglais"
              value={languages}
              onChangeText={(value) => setLanguages(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Zone d'intervention"
              placeholder="France, Vietnam, Laos"
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
    // alignItems: "center",
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
});
