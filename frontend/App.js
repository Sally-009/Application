import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

// Import screens
import LoginScreen from "./Components/LoginScreen";
import WelcomeScreen from "./Components/WelcomeScreen";
import ProfileScreen from "./Components/ProfileScreen";

// Navigation setup (Global)
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize as null

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error fetching token:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Optional: Show a loading indicator while checking login status
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Home: focused ? "home" : "home-outline",
                Profile: focused ? "person" : "person-outline",
              };
              return (
                <Ionicons name={icons[route.name]} size={size} color={color} />
              );
            },
            TabBarActiveTintColor: "tomato",
            TabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home">
            {(props) => (
              <WelcomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Tab.Screen>
          <Tab.Screen name="Profile">
            {(props) => (
              <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
