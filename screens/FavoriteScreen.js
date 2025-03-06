import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSelector } from 'react-redux';
import AssociationCard from "../components/associationCard";


export default function FavoriteScreen({ navigation }) {
  
  const user = useSelector((state) => state.user.value);


  const favorites = user.favorites.map((data, i) => {
    return (
      <View key={i} style={styles.favoriteContainer}>
        <AssociationCard/>
      </View>
    );
  });


  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
      <Image style={styles.logo} source={require("../assets/Logo_Letter.png")} />
      </View>
      <Text style={styles.title}>Favoris</Text>
      <View style={styles.line}></View>
      {favorites}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
    },
    containerLogo: {
        width: "90%",
        alignItems: "start-left",

    },
    logo: {
        position: "absolute",
        width: 50,
        height: 50,
    },
    title: {
        alignItems: "center",
        fontWeight: 900,
        fontSize: 20,
        paddingTop: 10,
        
    },
    line: {
      width: "90%",
      height: 2,
      backgroundColor: "black",
      marginBottom: 20,
      marginTop: 20,
    },
});
