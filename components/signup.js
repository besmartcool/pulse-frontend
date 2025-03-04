import { useState } from "react";
import { Image } from "expo-image";
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";
import { useRouter } from "next/router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUp = () => {
    fetch("http://10.0.1.90:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (EMAIL_REGEX.test(email)) {
          dispatch(
            login({
              token: data.token,
              email: signUpEmail,
              password: signUpPassword,
            })
          );

          setSignUpEmail("");
          setSignUpPassword("");
          setErrorMessage("");
          navigation.navigate('TabNavigator', { screen: 'SearchScreen' });
        } else {
          setErrorMessage("User already exists");
        }
      });
  };

  return (
    <View className={styles.modalSignup}>
      <Image style={styles.logo} source={require("../assets/Logo.png")} />
      <Text>Créer votre compte</Text>
      <TextInput
        onChangeText={(value) => setSignUpEmail(value)}
        value={signUpEmail}
        className={styles.input}
        placeholder="Email"
      />
      <TextInput
        onChangeText={(value) => setSignUpPassword(value)}
        value={signUpPassword}
        className={styles.input}
        placeholder="Password"
        type="password"
      />
      {emailError && <Text style={styles.error}>Email invalide</Text>}
      <TouchableOpacity
        onPress={() => handleSignUp()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Sign-up</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    modalSignup: {
        width: "80%",
        height: 500,
    }
});


