import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

/* 
    How to run?
    npm start

    Troubleshooting:
    Server connection error: Check LoginScreen.js for the correct IP address.
    Currently set to the IP address of "my house"
*/

// Import your screens
import LoginScreen from "./Components/LoginScreen";
import WelcomeScreen from "./Components/WelcomeScreen";
import TestScreen from "./Components/TestScreen";

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator>
        {isLoggedIn ? (
          // If logged in, show the Welcome screen
          <React.Fragment>
            <Stack.Screen name="Welcome" options={{ headerShown: false }}>
              { props => <WelcomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>

            {/* Test screen */}
            <Stack.Screen name="TestScreen" options={{headerShown: false}}>
              { props => <TestScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </React.Fragment>

        ) : (
          // Not logged in, show the Login screen
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
