import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_ADDRESS } from "../assets/url";
import Pusher from "pusher-js/react-native";
import { useSelector } from "react-redux";

// Connexion à Pusher
const pusher = new Pusher("55d828cade0571956384", {
  cluster: "eu",
  forceTLS: true, // Utilisation TLS pour de la sécurité
  enabledTransports: ["ws", "wss"], // Active les websockets
});

export default function ConversationListScreen({ navigation, route }) {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.user.value);
  const email = user?.email || "default@email.com";

  useEffect(() => {
    // Chargement des rooms de l'user
    fetch(`${BACKEND_ADDRESS}/rooms/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des rooms :", error)
      );
  }, []);

  useEffect(() => {
    // Chargement des utilisateurs
    fetch(`${BACKEND_ADDRESS}/users/allUsers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result !== false) {
          const uniqueUsers = Array.from(
            // On exclue l'utilisateur actuellement connecté
            new Map(data.map((user) => [user.email, user])).values()
          );
          setUsers(uniqueUsers.filter((user) => user.email !== email));
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

  useEffect(() => {
    const fetchRooms = () => {
      fetch(`${BACKEND_ADDRESS}/rooms/${email}`)
        .then((response) => response.json())
        .then((data) => setRooms(data))
        .catch((error) =>
          console.error("Erreur lors de la récupération des rooms :", error)
        );
    };

    fetchRooms(); // Charger les rooms au montage

    // Abonnement à Pusher
    const channel = pusher.subscribe(`rooms-${email}`);

    channel.bind("room-updated", (updatedRoom) => {
      setRooms((prevRooms) => {
        const index = prevRooms.findIndex(
          (room) => room._id === updatedRoom._id
        );

        if (index !== -1) {
          // Room existante, on met à jour le dernier message
          const updatedRooms = [...prevRooms];
          updatedRooms[index] = {
            ...updatedRooms[index],
            lastMessage: updatedRoom.lastMessage,
            lastMessageAt: updatedRoom.lastMessageAt,
          };
          return updatedRooms;
        } else {
          // Nouvelle room, on l'ajoute à la liste
          return [...prevRooms, updatedRoom];
        }
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [email]);

  const openChat = (otherUser) => {
    // Ouvrir un chat avec un utilisateur
    if (!otherUser || !otherUser.email) {
      console.error("Erreur : utilisateur invalide", otherUser);
      return;
    }

    // Vérifie si une room existe déjà
    const existingRoom = rooms.find(
      (room) =>
        room.users.includes(email) && room.users.includes(otherUser.email)
    );

    if (existingRoom) {
      // Si elle existe déjà, on va vers la room
      navigation.navigate("ChatScreen", {
        email,
        roomId: existingRoom._id,
        user: otherUser,
      });
    } else {
      // Sinon on la crée
      fetch(`${BACKEND_ADDRESS}/rooms/private`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1: email, user2: otherUser.email }), // avec les 2 users concercnnés
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result && data.room && data.room._id) {
            setRooms((prevRooms) => [...prevRooms, data.room]); // On ajoute la room sur le front

            navigation.navigate("ChatScreen", {
              // on navigue vers la room
              email,
              roomId: data.room._id,
              user: otherUser,
            });
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'ouverture du chat :", error);
        });
    }
  };

  const navigateToChat = (room) => {
    // Ouvrir un chat existant
    const otherUserEmail = room.users.find((u) => u !== email); // on récupère l'email de l'autre user
    const otherUser = users.find((u) => u.email === otherUserEmail); // contient toutes les infos de l'user

    // Vérification des données en amont
    if (!room._id || !otherUser) {
      console.error("Données manquantes :", {
        room,
        otherUser,
      });
      return;
    }

    navigation.navigate("ChatScreen", {
      // On va vers le chatscreen correspondant
      email,
      roomId: room._id,
      user: otherUser,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.fakeModal}>
        <View style={styles.newResearch}>
          <Text style={styles.bigTitle}>
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

      <View style={styles.content}>
        {/* Liste des rooms */}
        <Text style={styles.title}>Messages</Text>
        <ScrollView contentContainerStyle={styles.roomList}>
          {rooms.map((item) => {
            // Récupérer l'email de l'autre utilisateur dans la conversation
            const otherUserEmail = item.users.find((u) => u !== email);
            // Trouver l'objet utilisateur correspondant dans la liste des users
            const otherUser = users.find((u) => u.email === otherUserEmail);

            return (
              <TouchableOpacity
                key={item._id}
                style={styles.roomItem}
                onPress={() => navigateToChat(item)}
              >
                <FontAwesome name="user-circle" size={40} color="#FF6C02" />
                <View>
                  <Text style={styles.roomText}>
                    {otherUser
                      ? `${otherUser.firstname} ${otherUser.lastname}`
                      : "Utilisateur inconnu"}
                  </Text>
                  {item.lastMessageAt && (
                    <Text style={styles.lastMessageTime}>
                      {new Date(item.lastMessageAt).toLocaleTimeString()}
                    </Text>
                  )}
                  <Text style={styles.lastMessage}>
                    {item.lastMessage ? item.lastMessage : "Aucun message"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
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
    marginVertical: 10,
  },
  bigTitle: {
    fontWeight: 600,
    fontSize: 30,
    marginTop: 10,
  },
  newResearch: {
    width: "90%",
    height: "auto",
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
  },
  scrollViewUsers: {
    marginTop: 20,
    width: "90%",
  },
  userItem: {
    alignItems: "center",
    marginHorizontal: 10,
    width: "auto",
  },
  userText: {
    fontSize: 12,
    marginTop: 5,
    color: "#222",
    textAlign: "center",
  },
  content: {
    width: "90%",
    flex: 1,
  },
  roomList: {
    width: "100%",
    height: "auto",
  },
  roomItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  roomText: {
    fontSize: 16,
    fontWeight: "500",
  },
  lastMessage: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  lastMessageTime: {
    fontSize: 12,
    color: "#888",
  },
});
