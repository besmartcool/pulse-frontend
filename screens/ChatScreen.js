import { useEffect, useState, useRef } from "react";
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

// Connection à Pusher
const pusher = new Pusher("55d828cade0571956384", {
  cluster: "eu",
  forceTLS: true,
  enabledTransports: ["ws", "wss"],
});

export default function ChatScreen({ navigation, route: { params } }) {
  const { email, roomId, user } = params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/chat/messages/${roomId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setMessages(data);
        } else {
          console.log("Données invalides reçues :", data);
        }
      })
      .catch((error) => console.log("Erreur chargement des messages :", error));

    // Écoute des messages en temps réel avec Pusher
    const subscription = pusher.subscribe(`chat-${roomId}`);
    subscription.bind("chat-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]); // Met à jour les messages en temps réel

  // Scroll automatique en bas quand un message est reçu
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    fetch(`${BACKEND_ADDRESS}/chat/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: messageText, email, roomId }),
    })
      .then(() => {
        setMessageText(""); // Réinitialise l'input après l'envoi
        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du message :", error);
      });
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
        <View style={styles.text}>
          <Text style={styles.greetingText}>
            {user.firstname} {user.lastname}
          </Text>
          <View>
            {user.association
              ? <Text>`${user.association}`</Text>
              : null}
          </View>
        </View>
      </View>

      <View style={styles.inset}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scroller}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }
          }}
        >
          {messages.map((message, i) => (
            <View
              key={i}
              style={[
                styles.messageWrapper,
                message.senderId === email
                  ? styles.messageRecieved
                  : styles.messageSent,
              ]}
            >
              <View
                style={[
                  styles.message,
                  message.senderId === email
                    ? styles.messageSentBg
                    : styles.messageRecievedBg,
                ]}
              >
                <Text
                  style={[
                    message.senderId === email
                      ? styles.messageText
                      : styles.messageTextRecieved,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
              <Text style={styles.timeText}>
                {message.timestamp && (
                  <Text style={styles.timeText}>
                    {new Date(message.timestamp).getHours()}:
                    {String(new Date(message.timestamp).getMinutes()).padStart(
                      2,
                      "0"
                    )}
                  </Text>
                )}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputContainer2}>
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
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
  banner: {
    width: "100%",
    height: "auto",
    marginTop: 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: "#bbbbbb",
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
  },
  inset: {
    flex: 1,
    backgroundColor: "white",
    width: "90%",
  },
  messageWrapper: {
    marginBottom: 15,
    alignItems: "flex-end",
  },
  message: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
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
    backgroundColor: "#FF6C02",
    borderRadius: 14,
    borderBottomRightRadius: 0,
    padding: 10,
  },
  messageRecievedBg: {
    backgroundColor: "#EAEAEA",
    borderRadius: 14,
    borderBottomLeftRadius: 0,
    padding: 10,
  },
  messageText: {
    color: "white",
    fontWeight: "400",
  },
  messageTextRecieved: {
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
    borderTopWidth: 0.3,
    borderTopColor: "#bbbbbb",
  },
  inputContainer2: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.3,
    borderTopColor: "#bbbbbb",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 14,
    borderRadius: 30,
    marginVertical: 14,
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
  text: {
    alignItems: "flex-start",
    marginLeft: 20,
  },
});
