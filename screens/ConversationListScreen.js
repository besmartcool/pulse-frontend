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

const pusher = new Pusher("55d828cade0571956384", {
  cluster: "eu",
  forceTLS: true,
  enabledTransports: ["ws", "wss"],
});

export default function ConversationListScreen({ navigation, route }) {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.user.value);
  const email = user?.email || "default@email.com";

  useEffect(() => {
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
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/rooms/${email}`)
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) =>
        console.error("Erreur récupération des rooms :", error)
      );
    const channel = pusher.subscribe(`rooms-${email}`);

    channel.bind("room-updated", (newRoom) => {
      setRooms((prevRooms) => {
        const roomExists = prevRooms.some((room) => room._id === newRoom._id);
        return roomExists ? prevRooms : [...prevRooms, newRoom];
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [email]);

  const openChat = (otherUser) => {
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
      navigation.navigate("ChatScreen", {
        email,
        roomId: existingRoom._id,
        user: otherUser,
      });
    } else {
      fetch(`${BACKEND_ADDRESS}/rooms/private`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1: email, user2: otherUser.email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result && data.room && data.room._id) {
            setRooms((prevRooms) => [...prevRooms, data.room]);

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

  const navigateToChat = (room) => {
    const otherUserEmail = room.users.find((u) => u !== email);
    const otherUser = users.find((u) => u.email === otherUserEmail);

    if (!room._id || !otherUser) {
      console.error("Données manquantes :", {
        room,
        otherUser,
      });
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
            const otherUserEmail =
              item.users.find((u) => u !== email) || "Inconnu";
            return (
              <TouchableOpacity
                key={item._id}
                style={styles.roomItem}
                onPress={() => navigateToChat(item)}
              >
                <FontAwesome name="user-circle" size={40} color="#FF6C02" />
                <View>
                  <Text style={styles.roomText}>{otherUserEmail}</Text>
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
  },
  roomList: {
    width: "100%",
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