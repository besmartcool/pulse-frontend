import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Input = ({ title, placeholder, value, onChangeText, secureTextEntry, icon }) => { // ON RECUPERE LES INFOS VIA LES PROPS

  return (
    <View style={styles.inputContainer}>
      {title && <Text style={styles.title}>{title.toUpperCase()}</Text>} {/* SI TITLE EXISTE ALORS L'AFFICHER EN MAJUSCULE */}
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder} // PLACEHOLDER
          value={value} // AJOUTER UN ETAT POUR CHAQUE INPUT ET REMPLACER LA VALEUR {value} PAR L'ÉTAT
          onChangeText={onChangeText} // SELON L'ÉTAT CRÉE POUR CHAQUE INPUT, REMPLACER {onChangeText} PAR LE SETTER D'ÉTAT
          secureTextEntry={secureTextEntry} // TRUE OU FALSE SI C'EST UN MOT DE PASSE OU PAS
        />
        <FontAwesome name={icon} size={16} color="#bbbbbb" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: '50',
    width: "100%",
    marginVertical: 10,
  },
  title: {
    color: "#FF6C02",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
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
});

export default Input;
