import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Pusher from "pusher-js/react-native";
import { BACKEND_ADDRESS } from "../assets/url";

const pusher = new Pusher("PUSHER_KEY", { cluster: "PUSHER_CLUSTER" });

export default function ChatScreen({ navigation, route: { params } }) {
  const { email, roomId, user } = params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/messages/${roomId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des messages :", error)
      );

    const subscription = pusher.subscribe(`chat-${roomId}`);
    subscription.bind("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (!messageText) return;

    const payload = {
      text: messageText,
      email,
      roomId,
    };

    fetch(`${BACKEND_ADDRESS}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessageText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.banner}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" color="#FF6C02" size={25} />
        </TouchableOpacity>
        <Text style={styles.greetingText}>
          Chat avec {user.firstname} {user.lastname}
        </Text>
      </View>

      <View style={styles.inset}>
        <ScrollView style={styles.scroller}>
          {messages.map((message, i) => (
            <View
              key={i}
              style={[
                styles.messageWrapper,
                message.email === email
                  ? styles.messageSent
                  : styles.messageRecieved,
              ]}
            >
              <View
                style={[
                  styles.message,
                  message.email === email
                    ? styles.messageSentBg
                    : styles.messageRecievedBg,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
              <Text style={styles.timeText}>
                {message.timestamp
                  ? `${new Date(message.timestamp).getHours()}:${String(
                      new Date(message.timestamp).getMinutes()
                    ).padStart(2, "0")}`
                  : ""}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setMessageText}
            value={messageText}
            style={styles.input}
            autoFocus
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <FontAwesome name="arrow-right" color="#ffffff" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
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
  },
  scroller: {
    paddingHorizontal: 20,
  },
  messageWrapper: {
    marginBottom: 15,
    alignItems: "flex-end",
  },
  message: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageSent: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageRecieved: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageSentBg: {
    backgroundColor: "#FFF5E6",
  },
  messageRecievedBg: {
    backgroundColor: "#F0F0F0",
  },
  messageText: {
    color: "#222",
    fontWeight: "400",
  },
  timeText: {
    color: "#222",
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#FF6C02",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
    width: 50,
    height: 50,
  },
});
