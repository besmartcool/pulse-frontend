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
import { useSelector } from "react-redux";

export default function ConversationListScreen({ navigation, route }) {
  const [rooms, setRooms] = useState([]);

  const user = useSelector((state) => state.user.value);
  console.log("User Redux State:", user);
  const email = user?.email || "default@email.com";

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
      <View style={styles.fakeModal}>
        <View style={styles.research}>
          <Text style={styles.title}>
            {user.firstname}   {user.lastname}
          </Text>
        </View>
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
  research: {
    width: "90%",
    height: "auto",
    marginTop: 30,
    alignItems: "flex-start",
    marginTop: 40,
  },
  title: {
    fontWeight: 600,
    fontSize: 20,
    marginTop: 10,
  },
});
