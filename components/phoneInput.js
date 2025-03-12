import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const PhoneInput = ({ title, placeholder, onChangeText }) => {
  const [inputValue, setInputValue] = useState(""); // État local pour gérer l'affichage
  const [error, setError] = useState("");

  const handleTextChange = (text) => {
    let formattedText = text.replace(/\D/g, "");

    if (!formattedText.startsWith("0") && !formattedText.startsWith("33")) {
      formattedText = "0" + formattedText;
    }

    if (formattedText.startsWith("+33")) {
      formattedText = "+33" + formattedText.slice(3, 12);
    } else {
      formattedText = formattedText.slice(0, 10);
    }

    setInputValue(formattedText); // Met à jour l'affichage

    if (formattedText.length === 10 || (formattedText.startsWith("+33") && formattedText.length === 12)) {
      setError("");
    } else {
      setError("Numéro incomplet ou erroné");
    }
  };

   // Réinitialisation automatique après ajout
   useEffect(() => {
    if (inputValue.length === 10 || (inputValue.startsWith("+33") && inputValue.length === 12)) {
      onChangeText(inputValue); // Envoie le numéro valide au parent
      setInputValue(""); // Réinitialise l'affichage de l'input
    }
  }, [inputValue]);

  return (
    <View style={styles.inputContainer}>
      {title && <Text style={styles.title}>{title.toUpperCase()}</Text>}
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          value={inputValue}
          onChangeText={handleTextChange}
          keyboardType="phone-pad"
        />
        <FontAwesome name="phone" size={16} color="#bbbbbb" style={styles.icon} />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  title: {
    color: "#FF6C02",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputText: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default PhoneInput;
