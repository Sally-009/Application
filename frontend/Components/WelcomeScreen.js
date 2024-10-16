// WelcomeScreen.js
import React from "react";
import { SafeAreaView, Text, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {

  const imageSource = require("../assets/greeting.png");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      <Image source={imageSource} style={{ width: 200, height: 200, alignSelf: "center" }} />
      <Text style={styles.headerText}>Welcome!</Text>
      <Button style={styles.button} title="Logout" onPress={handleLogout} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginVertical: 15,
  },
});

