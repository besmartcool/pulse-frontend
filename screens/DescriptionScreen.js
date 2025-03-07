import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import CategorieRound from "../components/categorieRound";

export default function DescriptionScreen({ route }) {
  const { association } = route.params;
  const navigation = useNavigation();

  const [countryCode, setCountryCode] = useState("");

  const [showFullDescription, setShowFullDescription] = useState(false);

  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const address = `${association.address.street}, ${association.address.city}, ${association.address.country}`;

  // FONCTION QUI NOUS PERMET DE RETROUVER LE CODE DU PAYS
  const getCountryCode = (countryName) => {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          return data[0].cca2;
        }
        return null;
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du code pays :", error);
        return null;
      });
  };

  // PERMET DE RÉCUPÉRER LES DRAPEAUX POUR CHAQUE ASSOCIATION
  useEffect(() => {
    if (association.nationality) {
      getCountryCode(association.nationality).then((code) => {
        if (code) {
          setCountryCode(code);
        }
      });
    }
  }, [association.nationality]);

  useEffect(() => {
    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
        address
      )}&limit=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const [longitude, latitude] = data.features[0].geometry.coordinates;
          setCoordinates({ latitude, longitude });
        } else {
          console.error(
            "Aucune donnée de géocodage trouvée pour cette adresse."
          );
        }
      })
      .catch((error) => {
        console.error("Erreur de requête API :", error);
      });
  }, [association.address]);

  return (
    <ScrollView>
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
            {association.name.length > 20
              ? association.name.slice(0, 20) + "..."
              : association.name}
          </Text>

          <View style={styles.button}>
            {/* AFFICHAGE DU DRAPEAU SI LA NATIONALITÉ DE L'ASSO EXISTE */}
            {countryCode ? (
              <View style={styles.rightRound}>
                <Image
                  source={{
                    uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
                  }}
                  style={styles.drapeau}
                />
                <Text style={styles.categoryText}>
                  {association.nationality}
                </Text>
              </View>
            ) : (
              <Text></Text>
            )}
          </View>
        </View>

        <View style={styles.containerMap}>
          <MapView
            region={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            <Marker
              coordinate={coordinates}
              title={association.name}
              pinColor="#FF6C02"
            />
          </MapView>
          <Text style={styles.address}>
            <FontAwesome name="map-pin" size={14} color="#000000" />
            {"  "}
            {address.toUpperCase()}
          </Text>

          {/* TRONCAGE DE LA DESCRIPTION DE L'ASSO */}
          <Text style={styles.title}>Description</Text>
          <Text>
            {showFullDescription
              ? association.description
              : association.description.slice(0, 300) + "..."}
          </Text>
          {association.description.length > 300 && (
            <Pressable
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.readMore}>
                {showFullDescription ? "Voir moins" : "En savoir plus"}
              </Text>
            </Pressable>
          )}

          <Text style={styles.title}>Secteurs d'activités</Text>
          <CategorieRound categorie={association.categorie} />
          <Text style={styles.title}>Informations légales</Text>
          <View style={styles.legalInfos}>
            <Text style={styles.bold}>Numéro légal : </Text>
            <Text>{association.legalNumber}</Text>
          </View>
          <View style={styles.legalInfos}>
            <Text style={styles.bold}>Dernière date de déclaration : </Text>
            <Text>
              {association.lastDeclarationDate
                ? association.lastDeclarationDate
                : "Non renseignée"}
            </Text>
          </View>
          <View style={styles.legalInfos}>
            <Text style={styles.bold}>Date de création : </Text>
            <Text>
              {association.creationDate
                ? association.creationDate
                : "Non renseignée"}
            </Text>
          </View>
          <Text style={styles.title}>Membres</Text>
{association.members.length > 0 ? (
  association.members
    .filter(member => member.name.trim() !== "") // Filtrer les membres avec un nom vide
    .map((member, index) => {
      // Vérification et extraction des initiales
      const initials = member.name
        ? member.name
            .split(" ") // Séparer prénom et nom
            .map(word => word.charAt(0).toUpperCase()) // Prendre la première lettre en majuscule
            .join("") // Joindre les lettres ensemble
        : "??"; // Valeur par défaut si le nom est vide

      return (
        <View key={index} style={styles.oneLineMember}>
          <View style={styles.round}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
          <Text style={styles.memberText}>
            {member.role ? `${member.role}: ` : ""} {member.name}
          </Text>
        </View>
      );
    })
) : (
  <Text>Aucun membre enregistré</Text>
)}

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fakeModal: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  rightRound: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "auto",
    width: "auto",
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
  containerMap: {
    width: "90%",
    height: "auto",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
  },
  map: {
    width: "100%",
    height: 90,
    borderRadius: 8,
  },
  address: {
    fontSize: 13,
    color: "#666",
    marginVertical: 6,
    marginLeft: 4,
  },
  content: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#222",
  },
  readMore: {
    color: "#FF6C02",
    fontWeight: "bold",
    marginTop: 5,
  },
  drapeau: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  legalInfos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bold: {
    color: "#FF6C02",
    fontWeight: "light",
  },
  categoryText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#666",
    marginTop: 4,
  },
  memberText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 2,
  },
  round: {
    backgroundColor: '#3BC3FF',
    borderRadius: 180,
    width: 'auto'
  },
  oneLineMember: {
    justifyContent: 'flex-start',
    flexDirection:'row',
    alignItems:'center',
    gap: 10,
    marginBottom: 10
  },
  initials: {
    fontSize: 16,
    margin: 10
  }
});
