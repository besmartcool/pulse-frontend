import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SearchResult({
  handleBackToDefault,
  handleBackToSearch,
  originCountry,
  destinationCountry,
}) {
  return (
    <View style={styles.fakeModal}>
      <View style={styles.newResearch}>
        <Pressable onPress={handleBackToDefault} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#FF6C02" />
        </Pressable>

        {originCountry && destinationCountry ? (
          <View style={styles.resultatContainer}>
            <View style={styles.resultat}>
              <Text style={styles.result}>{originCountry}</Text>
              <FontAwesome name="arrow-right" size={12} color="#bbbbbb" />
              <Text style={styles.result}>{destinationCountry}</Text>
            </View>
          </View>
        ) : null}

        <Pressable onPress={handleBackToSearch} style={styles.angleDown}>
          <FontAwesome name="angle-down" size={30} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    fakeModal: {
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "white",
      paddingVertical: 20,
      borderBottomRightRadius: 36,
      borderBottomLeftRadius: 36,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    newResearch: {
      width: "90%",
      height: "auto",
      marginTop: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 10,
    },
    backButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#FFF5E6",
        shadowColor: "#FF6C02",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        width: 'auto',
        height: 'auto'
      },
    resultatContainer: {
      flex: 1,
      alignItems: "center",
    },
    resultat: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#E0E0E0",
      backgroundColor: "#F9F9F9",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    result: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#FF6C02",
      textAlign: "center",
    },
    angleDown: {
      height: 55,
      width: 55,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FF6C02",
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 2,
      borderColor: "#FFFFFF",
    },
  });
