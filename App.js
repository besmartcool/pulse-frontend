import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import AssoScreen from "./screens/AssoScreen";
import ChatScreen from "./screens/ChatScreen";
import ConversationListScreen from "./screens/ConversationListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DescriptionScreen from "./screens/DescriptionScreen";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import React, { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user },
});

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchHome" component={SearchScreen} />
      <Stack.Screen name="Description" component={DescriptionScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ConversationList"
        component={ConversationListScreen}
      />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

// const [showModal, setShowModal] = useState(false);

const TabNavigator = () => {
  //Import pour vérifier que l'utilisateur est connecté (voir propriété "component" des tabScreen)
  const userInfo = useSelector((state) => state.user.value);

  // Fonction pour gérer la navigation conditionnelle
  const handleProtectedNavigation = (screenName) => {
    if (!userInfo.token) {
      setShowModal(true); // Affiche la modale si l'utilisateur n'est pas connecté
    } else {
      navigation.navigate(screenName); // Navigation normale si l'utilisateur est connecté
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Favorite") {
            iconName = "heart";
          } else if (route.name === "Asso") {
            iconName = "users";
          } else if (route.name === "Chat") {
            iconName = "comment";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6C02",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Search" component={SearchStack} />
      {/* Provisoire, à remplacer par un listener et une modale qui affiche le message "veuilelz vous connecter" */}
      <Tab.Screen
        name="Favorite"
        component={!userInfo.token ? HomeScreen : FavoriteScreen}
      />
      <Tab.Screen
        name="Asso"
        component={!userInfo.token ? HomeScreen : AssoScreen}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        initialParams={{ email: userInfo.email }}
      />
      <Tab.Screen
        name="Profile"
        component={!userInfo.token ? HomeScreen : ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
