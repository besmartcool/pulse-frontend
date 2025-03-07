import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
import {Dimensions} from 'react-native';

export default function DescriptionScreen({ route }) {
  const { association } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.fakeModal}>
      <View style={styles.newResearch}>
        <View style={styles.button}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome name="arrow-left" size={24} color="#FF6C02" />
          </Pressable>
        </View>

        <Text style={styles.assoName}>
          {/* TRONCAGE DU NOM DE L'ASSO */}
          {association.name.length > 30
            ? association.name.slice(0, 30) + "..."
            : association.name}
        </Text>

        <View style={styles.button}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome name="phone" size={24} color="#FF6C02" />
          </Pressable>
        </View>
      </View>

      <View style={styles.littleMenu}>
        <Pressable>
          <Text>Résumé</Text>
        </Pressable>
        <Text>|</Text>
        <Pressable>
          <Text>Missions</Text>
        </Pressable>
        <Text>|</Text>
        <Pressable>
          <Text>Histoire</Text>
        </Pressable>
        <Text>|</Text>
        <Pressable>
          <Text>Phototèque</Text>
        </Pressable>
      </View>

      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      ></MapView>
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
    alignItems: "center",
    justifyContent: "space-between",
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
    width: "auto",
    height: "auto",
  },
  assoName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },
  littleMenu: {
    width: "90%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  map: {
    width: '90%',
    height: '40%',
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    marginTop: 20
},
});
