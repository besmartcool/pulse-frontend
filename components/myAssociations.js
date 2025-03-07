import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSelector } from "react-redux";
import AssociationCard from "../components/associationCard";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MyAssociations({ handleTypeContent }) {
  const user = useSelector((state) => state.user.value);

  const myAssociations = user.associations.map((data, i) => {
    return (
      <View key={i} style={styles.favoriteContainer}>
        <AssociationCard />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.HeaderContainer}>
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={require("../assets/Logo_Letter.png")}
          />
        </View>
        <View style = {styles.titalContainer}>
        <Text style={styles.title}>Mes associations</Text>
        </View>
        <Pressable style={styles.containerbutton} onPress={() => handleTypeContent("form")}>
          <FontAwesome name="plus" size={45} color="grey" style={styles.icon} />
        </Pressable>
      </View>
      <View style={styles.line}></View>
      {myAssociations}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  HeaderContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  containerLogo: {
  },
  logo: {
    width: 50,
    height: 50,
  },
    titalContainer: {
       textAlign: "center",
       justifyContent: "center",
       alignItems: "center",
    },
  title: {
    fontWeight: 900,
    fontSize: 20,
  },
  containerbutton: {
    width: 50,
    height: 50,
    backgroundColor: "#3BC3FF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "white",
  },
  line: {
    width: "90%",
    height: 2,
    backgroundColor: "black",
    marginBottom: 20,
    marginTop: 20,
  },
});
