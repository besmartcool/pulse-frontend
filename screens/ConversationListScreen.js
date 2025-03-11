import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_ADDRESS } from "../assets/url";

export default function ConversationListScreen({ navigation, route }) {
  const [rooms, setRooms] = useState([]);
  const email = route?.params?.email || "default@email.com";

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/rooms/${email}`)
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des rooms :", error)
      );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.greetingText}>Mes Conversations</Text>
      </View>
      <View style={styles.inset}>
        {rooms.length === 0 ? (
          <Text style={styles.noRoomsText}>Aucune conversation disponible</Text>
        ) : (
          <FlatList
            data={rooms}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.roomButton}
                onPress={() =>
                  navigation.navigate("ChatScreen", { email, roomId: item._id })
                }
              >
                <Text style={styles.roomName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
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
  banner: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 40,
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#FFF5E6",
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  greetingText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },
  inset: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noRoomsText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  roomButton: {
    backgroundColor: "#FFF5E6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6C02",
  },
});
