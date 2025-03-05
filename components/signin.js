import { useState } from "react";
import { Image } from "expo-image";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import Input  from '../components/input'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function Signup() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const dispatch = useDispatch();
  

  const handleSignUp = () => {
    fetch("http://10.0.1.90:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (EMAIL_REGEX.test(email)) {
          dispatch(
            login({
              token: data.token,
              email: signInEmail,
              password: signInPassword,
            })
          );

          setSignInEmail("");
          setSignInPassword("");
          setErrorMessage("");
          navigation.navigate('TabNavigator', { screen: 'SearchScreen' });
        } else {
          setErrorMessage("User already exists");
        }
      });
  };

  return (
    <View style={styles.modalSignin}>
      <View style={styles.containerLogo}>
      <Image style={styles.logo} source={require("../assets/Logo.png")} />
      </View>
      <View style={styles.containerTitle}>
      <Text style={styles.title}>Connecter votre compte</Text>
      </View>
      <Input
      style={styles.input}
      placeholder="Email"
      value={signInEmail}
      onChangeText={(value) => setSignInEmail(value)}
      secureTextEntry={false}
      icon="pencil"/>
      
      <Input
      style={styles.input}
      placeholder="Password"
      value={signInPassword}
      onChangeText={(value) => setSignInPassword(value)}
      secureTextEntry={false}
      icon="pencil"/>
      
      
      {errorMessage && <Text style={styles.error}>Email invalide</Text>}
      <View>
      <TouchableOpacity
        onPress={() => handleSignUp()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Sign-in</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    modalSignin: {
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
        backgroundColor: "white",
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
        color: "#FF6C02",
        fontWeight: 900,
    },
});


