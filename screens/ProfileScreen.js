import React, { useState } from "react";
import Input from "../components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  Image,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const [inputs, setInputs] = useState([""]);
  const [inputs2, setInputs2] = useState([""]);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [residenceCountry, setResidenceCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");

  const handleChangeNationality = (text, index) => {
    const newInputs = [...nationality];
    newInputs[index] = text;
    setNationality(newInputs);

    // Ajoute un nouvel input s'il n'est pas vide et si c'est le dernier
    if (text !== "" && index === inputs.length - 1) {
      setInputs([...newInputs, ""]);
    }
  };
  const removeInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs.length ? newInputs : [""]); // S'assure qu'il y a toujours au moins un input
  };

  const handleChangeDestination = (text, index) => {
    const newInputs = [...destinationCountry];
    newInputs[index] = text;
    setDestinationCountry(newInputs);

    // Ajoute un nouvel input s'il n'est pas vide et si c'est le dernier
    if (text !== "" && index === inputs2.length - 1) {
      setInputs2([...newInputs, ""]);
    }
  };
  const removeInput2 = (index) => {
    const newInputs = inputs2.filter((_, i) => i !== index);
    setInputs2(newInputs.length ? newInputs : [""]); // S'assure qu'il y a toujours au moins un input
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={require("../assets/Logo_Letter.png")}
          />
          <Image
            style={styles.placeholderImage}
            source={require("../assets/placeholderImage.png")}
          />
        </View>
        <Text style={styles.title}>Mon compte</Text>
        <View style={styles.line}></View>
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
        <View style={styles.input}>
          <Input
            style={styles.inputLastname}
            placeholder="Nom..."
            value={lastname}
            onChangeText={(value) => setLastname(value)}
            secureTextEntry={true}
            icon="pencil"
          />
          <Input
            style={styles.inputFirstname}
            placeholder="Prénom..."
            value={firstname}
            onChangeText={(value) => setFirstname(value)}
            secureTextEntry={true}
            icon="pencil"
          />
          <Input
            style={styles.inputUsername}
            placeholder="Pseudo..."
            value={username}
            onChangeText={(value) => setUsername(value)}
            secureTextEntry={true}
            icon="pencil"
          />
          <Input
            style={styles.inputEmail}
            placeholder="Email..."
            value={email}
            onChangeText={(value) => setEmail(value)}
            secureTextEntry={true}
            icon="pencil"
          />
          <Input
            style={styles.inputPassword}
            placeholder="Password..."
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
            icon="pencil"
          />
          <View style={styles.seperateLine}></View>
          <Text style={styles.titleInput}>NATIONALITE</Text>
          {inputs.map((value, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 8,
                  borderColor: "#bbbbbb",
                  fontSize: 12,
                }}
                value={nationality}
                onChangeText={(text) => handleChangeNationality(text, index)}
                placeholder={`Nationalité ${index + 1}`}
              />
              {value === "" && inputs.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeInput(index)}
                  style={{
                    width: 40,
                    height: 40,
                    marginLeft: 10,
                    padding: 10,
                    backgroundColor: "#FF6C02",
                    borderRadius: 180,
                  }}
                >
                  <FontAwesome name={"minus"} size={20} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          {/* <Input
        style={styles.inputNationality}
        placeholder="..."
        value={nationality}
        onChangeText={(value) => setNationality(value)}
        secureTextEntry={true}
        icon="pencil"
      /> */}
          <Text style={styles.titleInput}>PAYS DE RESIDENCE</Text>
          <Input
            style={styles.inputResidenceCountry}
            placeholder="..."
            value={residenceCountry}
            onChangeText={(value) => setResidenceCountry(value)}
            secureTextEntry={true}
            icon="pencil"
          />
          <Text style={styles.titleInput}>PAYS DE DESTINATION</Text>
          {inputs2.map((value, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 8,
                  borderColor: "#bbbbbb",
                  fontSize: 12,
                }}
                value={destinationCountry}
                onChangeText={(text) => handleChangeDestination(text, index)}
                placeholder={`Destination ${index + 1}`}
              />
              {value === "" && inputs2.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeInput2(index)}
                  style={{
                    width: 40,
                    height: 40,
                    marginLeft: 10,
                    padding: 10,
                    backgroundColor: "#FF6C02",
                    borderRadius: 180,
                  }}
                >
                  <FontAwesome name={"minus"} size={20} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          {/* <Input
        style={styles.inputDestinationCountry}
        placeholder="..."
        value={destinationCountry}
        onChangeText={(value) => setDestinationCountry(value)}
        secureTextEntry={true}
        icon="pencil"
      /> */}
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  containerLogo: {
    width: "90%",
    alignItems: "space-between",
  },
  logo: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  title: {
    alignItems: "center",
    fontWeight: 900,
    fontSize: 20,
    paddingTop: 10,
  },
  placeholderImage: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 180,
  },
  line: {
    width: "90%",
    height: 2,
    backgroundColor: "black",
    marginBottom: 20,
    marginTop: 20,
  },
  seperateLine: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    width: "90%",
  },
  titleInput: {
    color: "#FF6C02",
    fontSize: 12,
    fontWeight: "600",
  },
  icon: {
    alignSelf: "center",
  },
  scrollContainer: {
    width: "100%",
  },
});
