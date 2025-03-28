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
import { addInfoProfile, logout } from "../reducers/user";
import { BACKEND_ADDRESS } from "../assets/url";
import CountryDropdown from "../components/countryDropdown";

export default function ProfileScreen({ navigation }) {
  const [inputs, setInputs] = useState([""]);
  const [inputs2, setInputs2] = useState([""]);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newNationality, setNewNationality] = useState([]);
  const [residenceCountry, setResidenceCountry] = useState("");
  const [newDestinationCountry, setNewDestinationCountry] = useState([""]);

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
        console.log("data.data.nationality", data.data.nationality);
        if (data.result) {
          setLastname(data.data.lastname || "");
          setFirstname(data.data.firstname || "");
          setUsername(data.data.username || "");
          setEmail(data.data.email || "");
          setNewNationality(data.data.nationality || []);
          setResidenceCountry(data.data.residenceCountry || "");
          setNewDestinationCountry(data.data.destinationCountry || [""]);
          setInfos(data.data); // Stockez les informations initiales

          setInputs2(data.data.destinationCountry || [""]); // Initialisez les inputs2 avec les valeurs initiales

          // Ajoutez un champ vide si les tableaux sont vides

          if (
            !data.data.destinationCountry ||
            data.data.destinationCountry.length === 0
          ) {
            setInputs2([""]);
            setNewDestinationCountry([""]);
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    console.log(newNationality);
  }, [newNationality]);

  const resetNewNationalityInput = () => {};

  const selectNewNationality = (country) => {
    if (!country) return;
    setNewNationality((newNationality) => [...newNationality, country]);
  };

  const handleChangeNationality = (text, index) => {
    setNewNationality((prev) => {
      const updated = [...prev];
      updated[index] = text;

      return updated;
    });
  };

  const removeInput = (index) => {
    const newInputs = newNationality.filter((_, i) => i !== index);
    setNewNationality(newInputs);
  };

  const selectResidenceCountry = (country) => {
    if (!country) return;
    setResidenceCountry(residenceCountry);
  };

  const selectNewDestinationCountry = (country) => {
    if (!country) return;
    setNewDestinationCountry((newDestinationCountry) => [
      ...newDestinationCountry,
      country,
    ]);
  };

  const handleChangeDestination = (text, index) => {
    setNewDestinationCountry((prev) => {
      const updated = [...prev];
      updated[index] = text;

      return updated;
    });
    setInputs2(newDestinationCountry);
  };

  const removeInput2 = (index) => {
    const newInputs = newDestinationCountry.filter((_, i) => i !== index);
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
      destinationCountry: newDestinationCountry.length
        ? newDestinationCountry
        : infos?.destinationCountry,
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
          console.log("user", user);
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

  // Logique de déconnexion
  const handleDeconnexion = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={require("../assets/Logo_Letter.png")}
          />
          <View style={styles.placeholderContainer}>
            {infos?.firstname && infos?.lastname ? (
              <Text style={styles.initials}>
                {infos.firstname.charAt(0).toUpperCase()}
                {infos.lastname.charAt(0).toUpperCase()}
              </Text>
            ) : (
              <Text style={styles.initials}>?</Text>
            )}
          </View>
        </View>
        <Text style={styles.title}>Mon compte</Text>
        <View style={styles.line}></View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.input}>
            <Text style={styles.titleInput}>PRENOM</Text>
            <Input
              style={styles.inputFirstname}
              placeholder={infos?.firstname || "Prénom..."}
              value={firstname}
              onChangeText={handleChangeFirstname}
              secureTextEntry={false}
              icon="pencil"
            />
            <Text style={styles.titleInput}>NOM</Text>
            <Input
              style={styles.inputLastname}
              placeholder={infos?.lastname || "Nom..."}
              value={lastname}
              onChangeText={handleChangeLastname}
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
            <CountryDropdown
              title="Nationalité"
              placeholder="Sélectionner un ou plusieurs pays"
              onSelectCountry={selectNewNationality}
              resetInput={() => {}}
            />
            {newNationality.map((value, index) => (
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
                  placeholder={`Nationalité ${index + 1}`}
                />

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
              </View>
            ))}
            <CountryDropdown
              title="Pays de résidence"
              placeholder={residenceCountry || "Choisir un pays"}
              onSelectCountry={selectResidenceCountry}
              resetInput={() => {}}
            />
            {/* <Input
              style={styles.inputResidenceCountry}
              placeholder={infos?.residenceCountry || "Pays..."}
              value={residenceCountry}
              onChangeText={handleChangeResidenceCountry}
              secureTextEntry={false}
              icon="pencil"
            /> */}
            <CountryDropdown
              title="Pays de destination"
              placeholder="Sélectionner un ou plusieurs pays"
              onSelectCountry={selectNewDestinationCountry}
              selectedCountry={() => {}}
              resetInput={() => {}}
            />
            {newDestinationCountry.map((value, index) => (
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
                {newDestinationCountry.length > 1 && (
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
          </View>
        </ScrollView>
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
    width: "90%",
    height: 43,
    borderWidth: 1,
    borderColor: "#bbbbbb",
    backgroundColor: "#FF6C02",
    borderRadius: 180,
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
    width: "90%",
    height: 43,
    borderWidth: 1,
    borderColor: "#bbbbbb",
    backgroundColor: "white",
    borderRadius: 180,
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
  placeholderContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF6C02",
    justifyContent: "center",
    alignItems: "center",
  },

  initials: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
