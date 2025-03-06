import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePickerInput = ({title, selectDate}) => {
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
    <View style={styles.inputContainer}>
      {title && <Text style={styles.title}>{title.toUpperCase()}</Text>}

      <View style={styles.input}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.inputText}
          value={formattedDate}
          placeholder="Choisir une date"
          placeholderTextColor="#aaa"
          editable={false} // Empêche la saisie manuelle
        />
      </TouchableOpacity>
      </View>

      {/* Android: Utilise le DateTimePicker natif */}
      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              handleConfirm(selectedDate);
              selectDate(selectedDate);
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
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setShowPicker(false)}
        />
      )}
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
      borderWidth: 1,
      borderColor: "#bbbbbb",
      paddingHorizontal: 10,
      borderRadius: 8,
      fontSize: 12,
      color: "#333",
      backgroundColor: "#f9f9f9",
    },
    inputText: {
        flex: 1,
        paddingVertical: 10,
  },
});

export default DatePickerInput;
