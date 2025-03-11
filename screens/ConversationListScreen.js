import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_ADDRESS } from "../assets/url";
import { useSelector } from "react-redux";

export default function ConversationListScreen({ navigation, route }) {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.user.value);
  const email = user?.email || "default@email.com";

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/rooms/${email}`)
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des rooms :", error)
      );
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/allUsers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result !== false) {
          setUsers(data.filter((user) => user.email !== email)); // Exclure l'utilisateur actuel
        } else {
          setUsers([]);
        }
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        )
      );
  }, []);

  const openChat = (otherUser) => {
    if (!otherUser || !otherUser.email) {
      console.error("⚠️ Erreur : utilisateur invalide", otherUser);
      return;
    }
  
    console.log(`📨 Envoi d'une requête pour ouvrir un chat avec ${otherUser.email}`);
  
    fetch(`${BACKEND_ADDRESS}/rooms/private`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user1: email, user2: otherUser.email }),
    })
      .then((response) => {
        console.log("✅ Réponse reçue du serveur");
        return response.text(); // 🔥 Lire la réponse brute pour debug
      })
      .then((text) => {
        console.log("📄 Réponse brute du serveur :", text);
  
        try {
          const data = JSON.parse(text); // 🔥 Essayer de parser en JSON
  
          if (data.result && data.room && data.room._id) {
            console.log(`🚀 Navigation vers ChatScreen avec la room ${data.room._id}`);
            navigation.navigate("ChatScreen", {
              email,
              roomId: data.room._id,
              user: otherUser,
            });
          } else {
            console.warn("⚠️ Erreur dans la réponse du serveur :", data);
          }
        } catch (error) {
          console.error("❌ Erreur de parsing JSON :", error);
        }
      })
      .catch((error) => {
        console.error("❌ Erreur lors de l'ouverture du chat :", error);
      });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.fakeModal}>
        <View style={styles.newResearch}>
          <Text style={styles.title}>
            {user.firstname ? user.firstname : ""}{" "}
            {user.lastname ? user.lastname : ""}
          </Text>
        </View>

        {/* Liste des utilisateurs en horizontal */}
        <ScrollView horizontal style={styles.scrollViewUsers}>
          {users.map((item) => (
            <TouchableOpacity
              key={item.email}
              style={styles.userItem}
              onPress={() => openChat(item)}
            >
              <FontAwesome name="user-circle" size={40} color="#FF6C02" />
              <Text style={styles.userText}>
                {item.firstname} {item.lastname}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Liste des rooms */}
      <ScrollView contentContainerStyle={styles.roomList}>
        {rooms.map((item) => {
          const otherUserEmail =
            item.users.find((u) => u !== email) || "Inconnu";
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => openChat(otherUserEmail)}
              style={styles.roomItem}
            >
              <Text style={styles.roomText}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
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
  title: {
    fontWeight: 600,
    fontSize: 20,
    marginTop: 10,
  },
  newResearch: {
    width: "90%",
    height: "auto",
    marginTop: 30,
    alignItems: "flex-start",
    marginTop: 40,
  },
  userList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    width: "100%",
    height: "auto",
    backgroundColor: "red",
  },
  scrollViewUsers: {
    marginTop: 10,
    width: "90%",
  },
  userItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  userText: {
    fontSize: 12,
    marginTop: 5,
    color: "#222",
    textAlign: "center",
  },
  roomItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  roomText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
