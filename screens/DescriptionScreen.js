import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import CategorieRound from "../components/categorieRound";
import { useDispatch, useSelector } from "react-redux";
import { liked } from "../reducers/user";
import { BACKEND_ADDRESS } from "../assets/url";

export default function DescriptionScreen({ route }) {
  const { association } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const favorites = user.favorites;
  const isLiked = favorites.some((fav) => fav.name === association.name);

  const [countryCode, setCountryCode] = useState("");

  const [showFullDescription, setShowFullDescription] = useState(false);

  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const address = `${association.address.street}, ${association.address.city}, ${association.address.country}`;

  // FONCTION QUI NOUS PERMET DE RETROUVER LE CODE DU PAYS
  const getCountryCode = (countryName) => {
    return fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=false`
    )
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

  const handleLike = () => {
    dispatch(liked(association));
  };


  //PERMET DE SAVOIR SI L'UTILISATEUR EST ADMIN DE L'ASSOCIATION

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
      fetch(
        `${BACKEND_ADDRESS}/associations/getAssociationByName/${association.name}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("réponse backend", data)
          if (data.result) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false)
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération :", error)
        );
    }, []);

    console.log("admin status ", isAdmin)
  return (
    <View style={styles.fakeModal}>
      <View style={styles.globalHeader}>
        <View style={styles.newResearch}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <FontAwesome name="arrow-left" size={24} color="#FF6C02" />
            </TouchableOpacity>
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

        {isAdmin &&
        <View style={styles.admin}>
          <FontAwesome
            style={styles.icons}
            name="comment"
            size={24}
            color="black"
          />
          <FontAwesome
            style={styles.icons}
            name="pencil"
            size={24}
            color="black"
          />
        </View>}

      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
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
            <Text style={styles.title}>Nom complet </Text>
            <Text style={styles.bold}>{association.name}</Text>
            <Text style={styles.title}>Description</Text>
            <Text>
              {showFullDescription
                ? association.description
                : association.description.slice(0, 300) + "..."}
            </Text>
            {association.description.length > 300 && (
              <TouchableOpacity
                onPress={() => setShowFullDescription(!showFullDescription)}
              >
                <Text style={styles.readMore}>
                  {showFullDescription ? "Voir moins" : "En savoir plus"}
                </Text>
              </TouchableOpacity>
            )}

            <Text style={styles.title}>Secteurs d'activités</Text>
            <CategorieRound categorie={association.category} />
            <Text style={styles.title}>Informations légales</Text>
            <View style={styles.legalInfos}>
              <Text>Numéro légal : </Text>
              <Text style={styles.bold}>{association.legalNumber}</Text>
            </View>
            <View style={styles.legalInfos}>
              <Text>Dernière date de déclaration : </Text>
              <Text style={styles.bold}>
                {association.lastDeclarationDate
                  ? association.lastDeclarationDate
                  : "Non renseignée"}
              </Text>
            </View>
            <View style={styles.legalInfos}>
              <Text>Date de création : </Text>
              <Text style={styles.bold}>
                {association.creationDate
                  ? association.creationDate
                  : "Non renseignée"}
              </Text>
            </View>
            <Text style={styles.title}>Contact</Text>
            <View style={styles.legalInfos}>
              <Text>Téléphone : </Text>
              <Text style={styles.bold}>
                {association.phone ? association.phone : "Non renseigné"}
              </Text>
            </View>
            <View style={styles.legalInfos}>
              <Text>E-mail : </Text>
              <Text style={styles.bold}>
                {association.email == "" ? association.email : "Non renseignée"}
              </Text>
            </View>
            <Text style={styles.title}>Réseaux sociaux</Text>
            <View style={styles.legalInfos}>
              <Text>Réseau social 1 : </Text>
              <Text style={styles.bold}>
                {association.email == "" ? association.email : "Non renseigné"}
              </Text>
            </View>
            <View style={styles.legalInfos}>
              <Text>Réseau social 2 : </Text>
              <Text style={styles.bold}>
                {association.email == "" ? association.email : "Non renseigné"}
              </Text>
            </View>
            <View style={styles.legalInfos}>
              <Text>Réseau social 3 : </Text>
              <Text style={styles.bold}>
                {association.email == "" ? association.email : "Non renseigné"}
              </Text>
            </View>
            <Text style={styles.title}>Membres</Text>
            {association.members.length > 0 ? (
              <>
                {/* Membres avec un rôle autre que "Membre actif" */}
                {association.members
                  .filter(
                    (member) =>
                      member.name.trim() !== "" &&
                      member.role !== "Membre actif"
                  )
                  .map((member, index) => {
                    // Extraction des initiales
                    const initials = member.name
                      ? member.name
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase())
                          .join("")
                      : "??";

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
                  })}

                <View style={styles.allMembersDiv}>
                  {/* Membres "Membre actif" affichés uniquement avec les ronds */}
                  <View style={styles.activeMembersContainer}>
                    {association.members
                      .filter(
                        (member) =>
                          member.name.trim() !== "" &&
                          member.role === "Membre actif"
                      )
                      .slice(0, 4)
                      .map((member, index) => {
                        const initials = member.name
                          ? member.name
                              .split(" ")
                              .map((word) => word.charAt(0).toUpperCase())
                              .join("")
                          : "??";

                        return (
                          <View key={index} style={styles.roundActive}>
                            <Text style={styles.initials}>{initials}</Text>
                          </View>
                        );
                      })}
                  </View>
                  {/* Affichage du compteur pour les autres membres */}
                  {association.members.filter(
                    (member) => member.role === "Membre actif"
                  ).length > 4 && (
                    <Text style={styles.othersText}>
                      +{" "}
                      {association.members.filter(
                        (member) => member.role === "Membre actif"
                      ).length - 4}{" "}
                      autres membres
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <Text>Aucun membre enregistré</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomStickyContent}>
        <TouchableOpacity onPress={handleLike}>
          <FontAwesome
            name="heart"
            size={32}
            color={isLiked ? "#FF0000" : "#000000"}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contact}>
          <Text style={styles.contactText}>Contacter</Text>
        </TouchableOpacity>
        
      </View>
      
    </View>
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
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  globalHeader: {
    width: "90%",
    height: "auto",
    marginTop: 60,
    // gap: 8,
    position: "absolute",
    backgroundColor: "white",
  },

  newResearch: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // zIndex: 10,
    backgroundColor: "white",
  },

  admin: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 20,
  },
  icons: {
    color: "#3BC3FF",
  },
  scrollView: {
    marginTop: 115,
    width: "90%",
    marginBottom: 25,
  },
  content: {
    width: "100%",
    height: "auto",
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
  containerMap: {
    width: "100%",
    height: "auto",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    textDecorationLine: "underline",
  },
  drapeau: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#bbbbbb",
  },
  legalInfos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  officialName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  bold: {
    color: "#FF6C02",
    fontWeight: "light",
    fontWeight: "bold",
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
    backgroundColor: "#3BC3FF",
    borderRadius: 180,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  roundActive: {
    backgroundColor: "#5BA1BF",
    borderRadius: 180,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -15,
  },
  oneLineMember: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  initials: {
    fontSize: 16,
    margin: 10,
  },
  allMembersDiv: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  activeMembersContainer: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  othersText: {
    fontSize: 14,
    fontWeight: "light",
    color: "black",
  },
  contact: {
    backgroundColor: "#FF6C02",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    width: "85%",
    height: 40,
  },
  contactText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  bottomStickyContent: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
