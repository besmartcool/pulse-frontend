import React, { useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/input";

export default function HomeScreen({ navigation }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    navigation.navigate("TabNavigator");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImageSign}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#FFFFFF", "#A3E2F8"]}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 0.9 }}
          style={styles.background}
        >
          <Image style={styles.logo} source={require("../assets/Logo.png")} />
          <View style={styles.containerSign}>
            <Text style={styles.text}>Vous avez déjà un compte ?</Text>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.buttonSignin}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <Text style={styles.text}>Inscrivez-vous</Text>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.buttonSignup}
              activeOpacity={0.8}
            >
              <Text style={styles.textButtonSignup}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.buttonContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Continuer sans compte</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.containerTextFooter}>
        <Text style={styles.textFooter}>@Pulse | 2025</Text>
        <Text style={styles.textFooter}>Besoin d'aide ? Nous contacter</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
    paddingBottom: 50,
    

    // Ombre sur iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    

    // Ombre sur Android
    elevation: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerImageSign: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
  },
  containerSign: {
    alignItems: "center",
    width: "80%",
  },
  logo: {
    resizeMode: "contain",
    width: 400,
    height: 200,
    marginTop: 150,
  },
  buttonSignup: {
    alignItems: "center",
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
  line: {
    marginTop: 20,
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  buttonSignin: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 43,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    backgroundColor: "white",
    borderRadius: 8,
  },
  buttonContinue: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 43,
    marginTop: 80,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    backgroundColor: "white",
    borderRadius: 8,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
  textButton: {
    fontWeight: 900,
    color: "black",
  },
  textButtonSignup: {
    fontWeight: 900,
    color: "white",
  },
  containerTextFooter: {
    alignItems: "center",
    marginBottom: 25,
  },
  textFooter: {
    fontSize: 10,
    fontWeight: 900,
  },
});
