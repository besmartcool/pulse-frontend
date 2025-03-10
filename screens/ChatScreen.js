import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";

export default function ChatScreen({ navigation }) {
  const user = useSelector((state) => state.user.value); // Utilisateur connecté
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`https://ton-backend.com/chat/rooms/${user.id}`, {
      headers: { Authorization: `Bearer ${user.token}` }, // Auth avec token
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setRooms(data.rooms);
        }
      })
      .catch((error) => console.error("Erreur chargement rooms :", error))
  }, []);

  const renderRoom = ({ item }) => {
    const interlocutor = item.users.find((id) => id !== user.id); // Récupérer l'autre user

    return (
      <TouchableOpacity
        style={styles.room}
        onPress={() => navigation.navigate("ChatRoom", { roomId: item._id })}
      >
        <Text style={styles.roomTitle}>Conversation avec {interlocutor}</Text>
        <Text style={styles.lastMessage}>
          {item.lastMessage || "Aucun message"}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {rooms.length === 0 ? (
        <Text style={styles.emptyText}>Aucune conversation</Text>
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item._id}
          renderItem={renderRoom}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  room: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  lastMessage: {
    fontSize: 14,
    color: "gray",
    marginTop: 5
  },
});
