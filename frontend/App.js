import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import WelcomeScreen from "./Components/WelcomeScreen";
import ProfileScreen from "./Components/ProfileScreen";
import LoginScreen from "./Components/LoginScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize as null
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

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
          <Tab.Screen name="Home" component={WelcomeScreen}  setIsLoggedIn={setIsLoggedIn}/>
          <Tab.Screen name="Profile" component={ProfileScreen} />
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
