import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { addInfoProfile } from "../reducers/user";
import { BACKEND_ADDRESS } from "../assets/url";

export default function ProfileScreen({ navigation }) {
  const [inputs, setInputs] = useState([""]);
  const [inputs2, setInputs2] = useState([""]);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newNationality, setNewNationality] = useState("");
  const [residenceCountry, setResidenceCountry] = useState("");
  const [newDestinationCountry, setNewDestinationCountry] = useState("");
  const [infos, setInfos] = useState();
  const user = useSelector((state) => state.user.value);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS
  const handleChangeNationality = (text, index) => {
    const newInputs = [...newNationality];
    newInputs[index] = text;
    setNewNationality(newInputs);

    // Ajoute un nouvel input s'il n'est pas vide et si c'est le dernier
    if (text !== "" && index === inputs.length - 1) {
      setInputs([...newInputs, ""]);
    }
  };
  const removeInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs.length ? newInputs : [""]); // S'assure qu'il y a toujours au moins un input
  };

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/getInfos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging
        setInfos(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChangeDestination = (text, index) => {
    const newInputs = [...newDestinationCountry];
    newInputs[index] = text;
    setNewDestinationCountry(newInputs);

    // Ajoute un nouvel input s'il n'est pas vide et si c'est le dernier
    if (text !== "" && index === inputs2.length - 1) {
      setInputs2([...newInputs, ""]);
    }
  };
  const removeInput2 = (index) => {
    const newInputs = inputs2.filter((_, i) => i !== index);
    setInputs2(newInputs.length ? newInputs : [""]); // S'assure qu'il y a toujours au moins un input
  };
  const handleRegistrationSubmit = () => {
    fetch(`${BACKEND_ADDRESS}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        lastname: lastname,
        firstname: firstname,
        username: username,
        nationality: newNationality,
        residenceCountry: residenceCountry,
        destinationCountry: newDestinationCountry,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data1", data);
        if (data.result) {
          console.log("data2", data.result);
          dispatch(
            addInfoProfile({
              lastname: data.lastname,
              firstname: data.firstname,
              username: data.username,
              nationality: data.newNationality,
              residenceCountry: data.residenceCountry,
              destinationCountry: data.newDestinationCountry,
            })
          );
          setMessage("validated");
          setLastname();
        } else {
          setErrorMessage("error");
        }
      });
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
            <Text style={styles.titleInput}>NOM</Text>
            <Input
              style={styles.inputLastname}
              placeholder={
                infos?.data.lastname ? infos.data.lastname : "Nom..."
              }
              value={lastname}
              onChangeText={(value) => setLastname(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Text style={styles.titleInput}>PRENOM</Text>
            <Input
              style={styles.inputFirstname}
              placeholder={
                infos?.data.firstname ? infos.data.firstname : "Prénom..."
              }
              value={firstname}
              onChangeText={(value) => setFirstname(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Text style={styles.titleInput}>PSEUDO</Text>
            <Input
              style={styles.inputUsername}
              placeholder={
                infos?.data.username ? infos.data.username : "Pseudo..."
              }
              value={username}
              onChangeText={(value) => setUsername(value)}
              secureTextEntry={false}
              icon="pencil"
            />
            <Text style={styles.titleInput}>EMAIL</Text>
            <Input
              style={styles.inputEmail}
              placeholder={user.email}
              value={email}
              onChangeText={(value) => setEmail(value)}
              secureTextEntry={false}
              // icon="pencil"
            />
            {/* <Text style={styles.titleInput}>PASSWORD</Text>
          <Input
            style={styles.inputPassword}
            placeholder="Password..."
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
            icon="pencil"
          /> */}

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
                    marginVertical: 10,
                    borderRadius: 8,
                    borderColor: "#bbbbbb",
                    fontSize: 12,
                  }}
                  value={newNationality[index]}
                  onChangeText={(text) => handleChangeNationality(text, index)}
                  placeholder={
                    infos?.data.nationality[0]
                      ? infos.nationality[index]
                      : `Nationality ${index + 1}`
                  }
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
                    <FontAwesome
                      name={"minus"}
                      size={20}
                      color="#ffffff"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <Text style={styles.titleInput}>PAYS DE RESIDENCE</Text>
            <Input
              style={styles.inputResidenceCountry}
              placeholder={
                infos?.data.residenceCountry
                  ? infos.data.residenceCountry
                  : "..."
              }
              value={residenceCountry}
              onChangeText={(value) => setResidenceCountry(value)}
              secureTextEntry={false}
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
                    marginVertical: 10,
                    borderRadius: 8,
                    borderColor: "#bbbbbb",
                    fontSize: 12,
                  }}
                  value={newDestinationCountry[index]}
                  onChangeText={(text) => handleChangeDestination(text, index)}
                  placeholder={
                    infos?.data.destinationCountry[0]
                      ? infos.data.destinationCountry[index]
                      : `Destination ${index + 1}`
                  }
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
                    <FontAwesome
                      name={"minus"}
                      size={20}
                      color="#ffffff"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity
              onPress={() => handleRegistrationSubmit()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Envoyer les modifications</Text>
            </TouchableOpacity>
            {message && <Text style={styles.message}>{message}</Text>}
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
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
  },
  containerLogo: {
    position: "absolute",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  logo: {
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
    width: 50,
    height: 50,
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
  button: {
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: 43,
    borderWidth: 1,
    borderColor: "#bbbbbb",
    backgroundColor: "#FF6C02",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // Ombre sur Android
    elevation: 8,
  },
  textButton: {
    alignSelf: "center",
    color: "white",
    fontWeight: 900,
  },
  scrollContainer: {
    width: "100%",
  },
});
