import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Input = ({ title, placeholder, value, onChangeText, secureTextEntry, keyboardType, icon }) => {
  return (
    <View style={styles.inputContainer}>
      {title && <Text style={styles.title}>{title.toUpperCase()}</Text>}
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {/* Vérifie si icon est défini avant d'afficher FontAwesome */}
        {icon && <FontAwesome name={icon} size={16} color="#bbbbbb" style={styles.icon} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
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
    backgroundColor: 'white',
  },
  inputText: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Input;
