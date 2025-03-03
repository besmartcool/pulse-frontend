import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/input";

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
  const [region, setRegion] = useState("");
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
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer} >
        <Text style = {styles.mainHeader}>Enregistrement association</Text>
        <View style = {styles.subSectionContainer}>
          <Text style = {styles.subSectionHeader}>Identification de l'association</Text>
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
            placeholder="Secteur d'activité"
            value={categories}
            onChangeText={(value) => setCategories(value)}
            secureTextEntry={false}
            icon="caret-down"
          />
        </View>
        <View>
          <Text>Informations de contact</Text>
        </View>
        <View>
          <Text>Informations légale</Text>
        </View>
        <View>
          <Text>Autres informations</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleRegistrationSubmit()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeAreaContainer: {
    flex: 1,
    paddingTop: 15,
    width: '90%',
    // alignItems: "center",
    backgroundColor: 'green',
  },
  mainHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  subSectionContainer: {
    borderTopWidth: 3,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: "lightgray",
  },
  subSectionHeader: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 8,

  },
  button: {
    backgroundColor: "red",
  },
});
