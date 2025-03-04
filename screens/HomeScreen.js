import React, { useState } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Signup from "../components/signup";
import Signin from "../components/signin";
import {
  Modal,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import Input from "../components/input";

export default function HomeScreen({ navigation }) {
  const [text, setText] = useState("");
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const handleSubmit = () => {
    navigation.navigate("TabNavigator");
  };

  const handleClickModalSignup = () => {
    setModalVisible1(true);
  };

  // const handleClickModalSignin = () => {
  //   setModalVisible2(true);
  // };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible1(!modalVisible1);
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.containerKeyboardAvoidingView}
          >
            {/* <Signin /> */}
            <Signup />
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
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
                <Text style={styles.textButtonSignin}>Sign in</Text>
              </TouchableOpacity>
              <View style={styles.line}></View>
              <Text style={styles.text}>Inscrivez-vous</Text>
              <TouchableOpacity
                onPress={() => handleClickModalSignup()}
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
  textButtonSignin: {
    fontWeight: 900,
    color: "#FF6C02"
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
