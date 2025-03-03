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
      {/* <LinearGradient
        // Background Linear Gradient
        colors={['transparent', '#A3E2F8']}
        style={styles.background}
      /> */}
      {/* <Image source={require('../assets/logo.png')} size={500}/> */}
      {/* <Image
              style={styles.logo}
              source={require("../assets/icon.png")}
              size={25}
            /> */}
      <Text>Vous avez déjà un compte ?</Text>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>
      <Text>Inscrivez-vous</Text>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Continuer sans compte</Text>
      </TouchableOpacity>
      <Text style={styles.textFooter}>@Pulse | 2025</Text>
      <Text style={styles.textFooter}>Besoin d'aide ? Nous contacter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 500,
    height: 500,
  },
  button: {
    backgroundColor: "red",
  },
  textButton: {
    color: "white",
  },
});
