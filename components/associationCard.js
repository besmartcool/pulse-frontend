import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CategorieRound from "./categorieRound";
import { useDispatch, useSelector } from "react-redux";
import { liked } from "../reducers/user";
import { BACKEND_ADDRESS } from "../assets/url";

// Composant qui affiche une carte d'association
const AssociationCard = ({ association }) => {
  // État local pour stocker le code pays (pour afficher le drapeau)
  const [countryCode, setCountryCode] = useState("");

  // Accès à l'utilisateur connecté via Redux
  const user = useSelector((state) => state.user.value);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Récupère les favoris de l'utilisateur
  const favorites = useSelector((state) => state.user.value.favorites);

  // Vérifie si cette association est déjà dans les favoris
  const isLiked = favorites.some((fav) => fav.name === association.name);

  // Ajoute ou retire une association des favoris
  const handleLike = () => {
    dispatch(liked(association));
  };

  const countryOverrides = {
    Chine: "China", // eviter que l'api renvoie taiwan au lieu de chine
  };

  // Récupère le code ISO du pays pour afficher le bon drapeau
  useEffect(() => {
    if (association.nationality) {
      // Vérifie si c'est chine
      const countryName =
        countryOverrides[association.nationality] || association.nationality;

      // Appel à l’API restcountries pour obtenir le code alpha2 du pays
      fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(
          countryName
        )}?fullText=true`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setCountryCode(data[0].cca2); // Code ISO alpha-2
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération du code pays :", error)
        );
    }
  }, [association.nationality]);

  // Fonction qui s'exécute lorsqu'on clique sur "Contacter"
  const handleContact = () => {
    let secretary = null;
    let roomId = null;

    // Récupérer le secrétaire de l’association
    fetch(`${BACKEND_ADDRESS}/associations/${association._id}/secretary`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.result || !data.secretary || data.secretary.length === 0) {
          console.log("Aucun secrétaire trouvé pour cette association.");
          throw new Error("Aucun secrétaire trouvé");
        }

        // On prend le premier secrétaire retourné
        secretary = data.secretary[0];

        // 2. Vérifier si une room (conversation) existe déjà entre les deux
        return fetch(`${BACKEND_ADDRESS}/rooms/${user.email}`);
      })
      .then((response) => response.json())
      .then((existingRooms) => {
        // Recherche d'une room contenant l'utilisateur et le secrétaire
        const existingRoom = existingRooms.find(
          (room) =>
            room.users.includes(user.email) &&
            room.users.includes(secretary.email)
        );

        if (existingRoom) {
          // Si elle existe, on récupère l’id
          roomId = existingRoom._id;
          return null; // On ne crée pas de nouvelle room
        } else {
          // Sinon, on crée une nouvelle room privée
          return fetch(`${BACKEND_ADDRESS}/rooms/private`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user1: user.email, user2: secretary.email }),
          });
        }
      })
      .then((response) => (response ? response.json() : null))
      .then((newRoomData) => {
        // Si on a bien une nouvelle room créée
        if (newRoomData && newRoomData.result && newRoomData.room) {
          roomId = newRoomData.room._id;
        }

        // Redirection vers l'écran de chat avec les infos nécessaires
        if (roomId) {
          navigation.navigate("ChatScreen", {
            email: user.email,
            roomId,
            user: {
              firstname: secretary.firstname,
              lastname: secretary.lastname,
              email: secretary.email,
              association: association.name,
            },
          });
        } else {
          console.log(
            "Erreur lors de la récupération ou création de la conversation."
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'ouverture du chat :", error);
      });
  };

  // Affichage de la carte d'association
  return (
    <View style={styles.associationCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Description", { association })}
      >
        <View style={styles.topAssoContent}>
          <View style={styles.textTitle}>
            {/* Affichage du drapeau si code disponible */}
            {countryCode ? (
              <Image
                source={{
                  uri: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
                }}
                style={styles.drapeau}
              />
            ) : (
              <View style={styles.drapeauDefault}></View>
            )}

            {/* Affichage du nom de l'association, on le tronque si trop long */}
            <Text style={styles.assoName}>
              {association.name.length > 30
                ? association.name.slice(0, 30) + "..."
                : association.name}
            </Text>
          </View>

          {/* Affichage de la catégorie dans un badge rond */}
          <View style={styles.textCategorie}>
            <CategorieRound categorie={association.category} />
          </View>
        </View>

        {/* Adresse de l'association */}
        <Text style={styles.address}>
          <FontAwesome name="map-pin" size={14} color="#000000" />{" "}
          {association.address.city.toUpperCase()} {association.address.zipCode}
          , {association.address.country}
        </Text>

        {/* Description de l'association, no le tronque à 150 caractères */}
        <Text style={styles.description}>
          {association.description.length > 150
            ? association.description.slice(0, 150) + "..."
            : association.description}
        </Text>
      </TouchableOpacity>

      {/* Bas de la carte : bouton like + bouton contacter */}
      <View style={styles.bottomAssoContent}>
        <TouchableOpacity onPress={handleLike}>
          <FontAwesome
            name="heart"
            size={25}
            color={isLiked ? "#FF0000" : "#000000"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contact} onPress={handleContact}>
          <Text style={styles.contactText}>Contacter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssociationCard;


const styles = StyleSheet.create({
  associationCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  topAssoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  textTitle: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    width: "75%",
  },
  drapeau: {
    width: 26,
    height: 26,
    marginRight: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#bbbbbb",
  },
  drapeauDefault: {
    width: 26,
    height: 26,
    marginRight: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#bbbbbb",
    backgroundColor: "#bbbbbb",
  },
  assoName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    flexShrink: 1,
  },
  textCategorie: {
    alignItems: "center",
    justifyContent: "center",
  },
  address: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginVertical: 8,
  },
  bottomAssoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  icon: {
    fontSize: 28,
  },
  contact: {
    backgroundColor: "#FF6C02",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  contactText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
});
