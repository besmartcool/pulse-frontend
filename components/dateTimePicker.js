import React, { useState } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePickerInput = ({ title, selectDate }) => {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("Choisir une date");
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormattedDate(selectedDate.toLocaleDateString("fr-FR"));
      selectDate(selectedDate);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.inputContainer}>
      {title && <Text style={styles.title}>{title.toUpperCase()}</Text>}

      <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
        <Text style={styles.inputText}>{formattedDate}</Text>
      </Pressable>

      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              handleConfirm(selectedDate);
            } else {
              setShowPicker(false);
            }
          }}
        />
      )}

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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  inputText: {
    color: "#000",
  },
});

export default DatePickerInput;
