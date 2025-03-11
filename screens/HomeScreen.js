import React, { useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Signup from "../components/signup";
import Signin from "../components/signin";
import {
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [signinVisible, setSigninVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  const handleSubmit = () => {
    navigation.navigate("TabNavigator");
  };

  const handleClickModalSignup = () => {
    setSignupVisible(true);
  };

  const handleClickModalSignin = () => {
    setSigninVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Modal Signup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={signupVisible}
        onRequestClose={() => setSignupVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Bouton Close */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSignupVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.containerKeyboardAvoidingView}
            >
              <Signup setSignupVisible={setSignupVisible} />
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>

      {/* Modal Signin */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={signinVisible}
        onRequestClose={() => setSigninVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Bouton Close */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSigninVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.containerKeyboardAvoidingView}
            >
              <Signin setSigninVisible={setSigninVisible} />
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>

      {/* Contenu principal */}
      <View style={styles.containerImageSign}>
        <LinearGradient
          colors={["#FFFFFF", "#A3E2F8"]}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 0.9 }}
          style={styles.background}
        >
          <Image style={styles.logo} source={require("../assets/Logo.png")} />
          <View style={styles.containerSign}>
            <Text style={styles.text}>Vous avez déjà un compte ?</Text>
            <TouchableOpacity
              onPress={handleClickModalSignin}
              style={styles.buttonSignin}
              activeOpacity={0.8}
            >
              <Text style={styles.textButtonSignin}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.line}></View>

            <Text style={styles.text}>Inscrivez-vous</Text>
            <TouchableOpacity
              onPress={handleClickModalSignup}
              style={styles.buttonSignup}
              activeOpacity={0.8}
            >
              <Text style={styles.textButtonSignup}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerKeyboardAvoidingView: {
    width: "100%",
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
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
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
  },
  buttonContinue: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 43,
    marginTop: 80,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
  textButton: {
    fontWeight: "900",
    color: "black",
  },
  textButtonSignin: {
    fontWeight: "900",
    color: "#FF6C02",
  },
  textButtonSignup: {
    fontWeight: "900",
    color: "white",
  },
  containerTextFooter: {
    alignItems: "center",
    marginBottom: 25,
  },
  textFooter: {
    fontSize: 10,
    fontWeight: "900",
  },
  // CSS Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    top: 15,
    right: 15,
    position: "absolute",
    padding: 10,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 180,
    backgroundColor: "#FFF5E6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  closeButtonText: {
    color: "#FF6C02",
    fontWeight: "bold",
    fontSize: 16,
  },
});
