import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CategorieRound from "./categorieRound";
import { useDispatch, useSelector } from "react-redux";
import { liked } from "../reducers/user";
import { BACKEND_ADDRESS } from "../assets/url";

const AssociationCard = ({ association }) => {
  const [countryCode, setCountryCode] = useState("");

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.value.favorites);
  const isLiked = favorites.some((fav) => fav.name === association.name);

  const handleLike = () => {
    dispatch(liked(association));
  };

  const countryOverrides = {
    Chine: "China", // Pour éviter "Taiwan"
  };

  // Récupération du code pays
  useEffect(() => {
    if (association.nationality) {
      // Vérifie si le pays est dans countryOverrides, sinon garde le même nom
      const countryName =
        countryOverrides[association.nationality] || association.nationality;

      fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(
          countryName
        )}?fullText=true`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setCountryCode(data[0].cca2); // Récupère le code alpha2 internationale
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération du code pays :", error)
        );
    }
  }, [association.nationality]);

  const handleContact = () => {
    let secretary = null;
    let existingRoom = null;

    // 1️⃣ Récupérer le secrétaire de l'association
    fetch(`${BACKEND_ADDRESS}/rooms/${association._id}/secretary`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.result || !data.secretary) {
          alert("Aucun secrétaire trouvé pour cette association.");
          throw new Error("Secrétaire introuvable");
        }
        secretary = data.secretary;

        // 2️⃣ Vérifier si une room existe déjà entre l'utilisateur connecté et le secrétaire
        return fetch(`${BACKEND_ADDRESS}/rooms/${user.email}`);
      })
      .then((response) => response.json())
      .then((existingRooms) => {
        existingRoom = existingRooms.find(
          (room) =>
            room.users.includes(user.email) &&
            room.users.includes(secretary.email)
        );

        if (existingRoom) {
          // 3️⃣ Si la room existe déjà, ouvrir le chat existant
          navigation.navigate("ChatScreen", {
            email: user.email,
            roomId: existingRoom._id,
            user: secretary,
          });
        } else {
          // 4️⃣ Sinon, créer une nouvelle room
          return fetch(`${BACKEND_ADDRESS}/rooms/private`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user1: user.email, user2: secretary.email }),
          });
        }
      })
      .then((response) => response.json())
      .then((newRoomData) => {
        if (newRoomData.result && newRoomData.room) {
          // 5️⃣ Ouvrir le chat avec la nouvelle room
          navigation.navigate("ChatScreen", {
            email: user.email,
            roomId: newRoomData.room._id,
            user: secretary,
          });
        } else {
          alert("Erreur lors de la création de la conversation.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'ouverture du chat :", error);
      });
  };

  return (
    <View style={styles.associationCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Description", { association })}
      >
        <View style={styles.topAssoContent}>
          <View style={styles.textTitle}>
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
            <Text style={styles.assoName}>
              {association.name.length > 30
                ? association.name.slice(0, 30) + "..."
                : association.name}
            </Text>
          </View>
          <View style={styles.textCategorie}>
            <CategorieRound categorie={association.category} />
          </View>
        </View>
        <Text style={styles.address}>
          <FontAwesome name="map-pin" size={14} color="#000000" />{" "}
          {association.address.city.toUpperCase()} {association.address.zipCode}
          , {association.address.country}
        </Text>
        <Text style={styles.description}>
          {association.description.length > 150
            ? association.description.slice(0, 150) + "..."
            : association.description}
        </Text>
      </TouchableOpacity>
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
