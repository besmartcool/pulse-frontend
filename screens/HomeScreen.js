import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Input from '../components/input';

export default function HomeScreen({ navigation }) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        navigation.navigate("TabNavigator");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Go to screen</Text>
      </TouchableOpacity>
      <View>
            <Input 
                placeholder="Entrez votre texte"
                value={text}
                onChangeText={setText}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: 'red'
  },
  textButton: {
    color: 'white'
  }
});
