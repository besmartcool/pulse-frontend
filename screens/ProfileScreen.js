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
import { useSelector, useDispatch } from "react-redux";
import { addInfoProfile } from "../reducers/user";
import { BACKEND_ADDRESS } from "../assets/url";

export default function ProfileScreen({ navigation }) {
  const [inputs, setInputs] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newNationality, setNewNationality] = useState([]);
  const [residenceCountry, setResidenceCountry] = useState("");
  const [newDestinationCountry, setNewDestinationCountry] = useState([]);
  const [infos, setInfos] = useState();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        if (data.result) {
          setLastname(data.data.lastname || "");
          setFirstname(data.data.firstname || "");
          setUsername(data.data.username || "");
          setEmail(data.data.email || "");
          setNewNationality(data.data.nationality || []);
          setResidenceCountry(data.data.residenceCountry || "");
          setNewDestinationCountry(data.data.destinationCountry || []);
          setInfos(data.data); // Stockez les informations initiales
          setInputs(data.data.nationality || []); // Initialisez les inputs avec les valeurs initiales
          setInputs2(data.data.destinationCountry || []); // Initialisez les inputs2 avec les valeurs initiales
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChangeNationality = (text, index) => {
    setNewNationality((prev) => {
      const updated = [...prev];
      updated[index] = text;
      return updated;
    });
  };

  const removeInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs.length ? newInputs : [""]);
    setNewNationality(newInputs);
  };

  const handleChangeDestination = (text, index) => {
    setNewDestinationCountry((prev) => {
      const updated = [...prev];
      updated[index] = text;
      return updated;
    });
  };

  const removeInput2 = (index) => {
    const newInputs = inputs2.filter((_, i) => i !== index);
    setInputs2(newInputs.length ? newInputs : [""]);
    setNewDestinationCountry(newInputs);
  };

  const handleRegistrationSubmit = () => {
    const updatedData = {
      token: user.token,
      lastname: lastname || infos?.lastname,
      firstname: firstname || infos?.firstname,
      username: username || infos?.username,
      nationality: newNationality.length ? newNationality : infos?.nationality,
      residenceCountry: residenceCountry || infos?.residenceCountry,
      destinationCountry: newDestinationCountry.length ? newDestinationCountry : infos?.destinationCountry,
    };

    fetch(`${BACKEND_ADDRESS}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addInfoProfile(updatedData));
          console.log("user", user)
          setMessage("Mise à jour réussie !");
        } else {
          setErrorMessage("Erreur lors de la mise à jour.");
        }
      })
      .catch((error) => console.error("Erreur lors de la mise à jour:", error));
  };

  const handleChangeLastname = (text) => {
    setLastname(text);
  };

  const handleChangeFirstname = (text) => {
    setFirstname(text);
  };

  const handleChangeUsername = (text) => {
    setUsername(text);
  };

  const handleChangeResidenceCountry = (text) => {
    setResidenceCountry(text);
  };

  const handleDeconnexion = () => {

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
              placeholder={infos?.lastname || "Nom..."}
              value={lastname}
              onChangeText={handleChangeLastname}
              secureTextEntry={false}
              icon="pencil"
            />
            <Text style={styles.titleInput}>PRENOM</Text>
            <Input
              style={styles.inputFirstname}
              placeholder={infos?.firstname || "Prénom..."}
              value={firstname}
              onChangeText={handleChangeFirstname}
              secureTextEntry={false}
              icon="pencil"
            />
            <Text style={styles.titleInput}>PSEUDO</Text>
            <Input
              style={styles.inputUsername}
              placeholder={infos?.username || "Pseudo..."}
              value={username}
              onChangeText={handleChangeUsername}
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
                    marginVertical: 10,
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    borderColor: "#bbbbbb",
                    fontSize: 12,
                  }}
                  value={newNationality[index] || ""}
                  onChangeText={(text) => handleChangeNationality(text, index)}
                  placeholder={`Nationality ${index + 1}`}
                />
                {inputs.length > 1 && (
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
              placeholder={infos?.residenceCountry || "..."}
              value={residenceCountry}
              onChangeText={handleChangeResidenceCountry}
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
                    backgroundColor: "#ffffff",
                    fontSize: 12,
                  }}
                  value={newDestinationCountry[index] || ""}
                  onChangeText={(text) => handleChangeDestination(text, index)}
                  placeholder={`Destination ${index + 1}`}
                />
                {inputs2.length > 1 && (
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
              {message && <Text style={styles.message}>{message}</Text>}
              {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <TouchableOpacity
              onPress={() => handleRegistrationSubmit()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Envoyer les modifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeconnexion()}
              style={styles.buttonDeconnexion}
              activeOpacity={0.8}
            >
              <Text style={styles.textButtonDeconnexion}>Se déconnecter</Text>
            </TouchableOpacity>
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
    marginBottom: 30,
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
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 8,
  },
  textButton: {
    alignSelf: "center",
    color: "white",
    fontWeight: 900,
  },
  buttonDeconnexion: {
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: 43,
    borderWidth: 1,
    borderColor: "#bbbbbb",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 8,
  },
  textButtonDeconnexion: {
    alignSelf: "center",
    color: "#FF6C02",
    fontWeight: 900,
  },
  scrollContainer: {
    width: "100%",
  },
  error: {
    color: "red",
    alignSelf: "center",
  },
  message: {
    color: "green",
    alignSelf: "center",
  },
});
