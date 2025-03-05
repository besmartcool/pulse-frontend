import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePickerInput = () => {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormattedDate(selectedDate.toLocaleDateString("fr-FR")); // Format français : jj/mm/aaaa
    }
    setShowPicker(false); // Fermer le modal après la sélection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sélectionner une date :</Text>

      {/* Champ d'Input Cliquable */}
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={formattedDate}
          placeholder="Choisir une date"
          placeholderTextColor="#aaa"
          editable={false} // Empêche la saisie manuelle
        />
      </TouchableOpacity>

      {/* Android: Utilise le DateTimePicker natif */}
      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              handleConfirm(selectedDate);
            } else {
              setShowPicker(false); // Ferme si l'utilisateur annule
            }
          }}
        />
      )}

      {/* iOS: Utilise le DateTimePickerModal */}
      {Platform.OS === "ios" && (
        <DateTimePickerModal
          isVisible={showPicker}
          mode="date"
          display="inline"
          onConfirm={handleConfirm}
          onCancel={() => setShowPicker(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
});

export default DatePickerInput;
