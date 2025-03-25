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

// Initialisation de la connexion à Pusher (WebSockets temps réel)
const pusher = new Pusher("55d828cade0571956384", {
  cluster: "eu",
  forceTLS: true, // Connexion sécurisée via TLS
  enabledTransports: ["ws", "wss"], // Utilisation des WebSockets uniquement
});

export default function ConversationListScreen({ navigation, route }) {
  const [rooms, setRooms] = useState([]); // Liste des rooms de chat
  const [users, setUsers] = useState([]); // Liste des utilisateurs disponibles pour discuter

  const user = useSelector((state) => state.user.value); // Utilisateur connecté via Redux
  const email = user?.email || "default@email.com"; // Fallback si non connecté

  // 1. Récupération des rooms de l'utilisateur
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/rooms/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data); // Stocke les rooms récupérées
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des rooms :", error)
      );
  }, []);

  // 2. Récupération de tous les utilisateurs sauf soi-même
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/allUsers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result !== false) {
          const uniqueUsers = Array.from(
            new Map(data.map((user) => [user.email, user])).values()
          );
          setUsers(uniqueUsers.filter((user) => user.email !== email));
        } else {
          setUsers([]);
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des utilisateurs :", error)
      );
  }, []);

  // 3. Synchronisation temps réel avec Pusher
  useEffect(() => {
    const fetchRooms = () => {
      fetch(`${BACKEND_ADDRESS}/rooms/${email}`)
        .then((response) => response.json())
        .then((data) => setRooms(data))
        .catch((error) =>
          console.error("Erreur lors de la récupération des rooms :", error)
        );
    };

    fetchRooms(); // Chargement initial

    // Abonnement à un canal Pusher personnalisé (par email)
    const channel = pusher.subscribe(`rooms-${email}`);

    // Gestion d'un événement personnalisé "room-updated"
    channel.bind("room-updated", (updatedRoom) => {
      // Mise à jour des rooms dans le state
      setRooms((prevRooms) => {
        const index = prevRooms.findIndex(
          (room) => room._id === updatedRoom._id
        );

        if (index !== -1) {
          // Si la room existe, on met à jour le dernier message
          const updatedRooms = [...prevRooms];
          updatedRooms[index] = {
            ...updatedRooms[index],
            lastMessage: updatedRoom.lastMessage,
            lastMessageAt: updatedRoom.lastMessageAt,
          };
          return updatedRooms;
        } else {
          // Sinon, c'est une nouvelle room qu'on ajoute à la liste
          return [...prevRooms, updatedRoom];
        }
      });
    });

    // Nettoyage à la désactivation du composant
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [email]);

  // Fonction appelée quand on clique sur un utilisateur
  const openChat = (otherUser) => {
    if (!otherUser || !otherUser.email) {
      console.error("Erreur : utilisateur invalide", otherUser);
      return;
    }

    // Vérifie si une room existe déjà entre les 2 utilisateurs
    const existingRoom = rooms.find(
      (room) =>
        room.users.includes(email) && room.users.includes(otherUser.email)
    );

    if (existingRoom) {
      // Si elle existe : on navigue vers l'écran de chat
      navigation.navigate("ChatScreen", {
        email,
        roomId: existingRoom._id,
        user: otherUser,
      });
    } else {
      // Sinon, on en crée une
      fetch(`${BACKEND_ADDRESS}/rooms/private`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1: email, user2: otherUser.email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result && data.room && data.room._id) {
            // Ajout de la room au front
            setRooms((prevRooms) => [...prevRooms, data.room]);

            // Navigation vers la nouvelle room
            navigation.navigate("ChatScreen", {
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

  // Navigation vers une room existante (quand on clique sur une room dans la liste)
  const navigateToChat = (room) => {
    const otherUserEmail = room.users.find((u) => u !== email);
    const otherUser = users.find((u) => u.email === otherUserEmail);

    if (!room._id || !otherUser) {
      console.error("Données manquantes :", { room, otherUser });
      return;
    }

    navigation.navigate("ChatScreen", {
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
