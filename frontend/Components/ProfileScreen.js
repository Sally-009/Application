import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
  const url = "http://192.168.1.145:5000/users/username";

  const [username, setUsername] = useState(null); // state to store username

  // fetch username from DB
  const getUsername = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      console.log("token in ProfileScreen", token);

      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      console.log("response in ProfileScreen", response);
        
      const result = await response.json();
      console.log("result in ProfileScreen", result);
        if (response.ok) {
            setUsername(result.username);
      } else {
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  // Call getUsername when the component mounts
  useEffect(() => {
    getUsername();
  }, []); // empty dependency array to run only once

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>This is Profile Page</Text>
      <Text style={styles.headerText}>
        Username: {username ? username : "Loading..."}
      </Text>
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
});
