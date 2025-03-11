import { useState } from "react";
import { Image } from "expo-image";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../reducers/user";
import Input from "./input";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "../assets/url";

export default function Signup({ setSignupVisible }) {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // // Convertir en minuscule le text de l'input email
  // const handleChangeText = (text) => {
  //   setSignUpEmail(text);
  // };

  const handleSignUp = () => {
    if (!signUpPassword) {
      setErrorMessage("password required");
    } else if (signUpPassword.length < 8) {
      setErrorMessage("password must have 8 characters");
    }

    if (EMAIL_REGEX.test(signUpEmail)) {
      fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signUpEmail,
          password: signUpPassword,
          firstname: signUpFirstName,
          lastname: signUpLastName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(
              signup({
                token: data.token,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
              })
            );
            setSignUpEmail("");
            setSignUpPassword("");
            setErrorMessage("");
            setSignupVisible(false);
            navigation.navigate("TabNavigator", { screen: "Search" });
          } else {
            setErrorMessage(data.error);
          }
        });
    } else {
      setErrorMessage("password or email invalid");
    }
  };

  return (
    <View style={styles.modalSignup}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require("../assets/Logo.png")} />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Créer votre compte</Text>
      </View>
      <Input
        style={styles.input}
        placeholder="Prénom"
        value={signUpFirstName}
        onChangeText={(value) => setSignUpFirstName(value)}
        secureTextEntry={false}
        icon="pencil"
      />
      <Input
        style={styles.input}
        placeholder="Nom"
        value={signUpLastName}
        onChangeText={(value) => setSignUpLastName(value)}
        secureTextEntry={false}
        icon="pencil"
      />
      <Input
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email"
        value={signUpEmail}
        onChangeText={(value) => setSignUpEmail(value)}
        secureTextEntry={false}
        icon="pencil"
      />

      <Input
        style={styles.input}
        placeholder="Mot de passe"
        value={signUpPassword}
        onChangeText={(value) => setSignUpPassword(value)}
        secureTextEntry={true}
        icon="pencil"
      />

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <View>
        <TouchableOpacity
          onPress={() => handleSignUp()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalSignup: {
    justifyContent: "space-around",
    width: "100%",
    height: "90%",
  },
  cadre: {
    width: "100%",
  },
  title: {
    marginBottom: 20,
    fontWeight: 900,
  },
  containerTitle: {
    alignSelf: "center",
  },
  containerLogo: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    resizeMode: "contain",
    width: 100,
    height: 100,
  },
  input: {
    width: "auto",
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
  error: {
    alignSelf: "center",
    color: "red",
  },
});
