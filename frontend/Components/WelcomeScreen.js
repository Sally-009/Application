import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import AddItemModal from "../Components/AddItemModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const imageSource = require("../assets/greeting.png");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    // navigate to login screen
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  // Function to add item to the backend
  const addItem = async (newItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://192.168.1.145/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to add item");
      }

      const savedItem = await response.json();
      setData((prevData) => [savedItem, ...prevData]);
    } catch (error) {
      console.error("Error adding item:", error);
      alert(error.message);
    }
  };

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.1.145/items", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Server Error:", errorResponse);
          console.log("Server Error:", errorResponse);
          throw new Error(errorResponse.message || "Failed to fetch items");
        }

        const items = await response.json();
        setData(items);
      } catch (error) {
        console.error("Error fetching items:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={imageSource}
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
      <Text style={styles.headerText}>Welcome!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length ? (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>
                  {item.description || "No description"}
                </Text>
              </View>
            )}
          />
          <AddItemModal onAddItem={addItem} />
        </View>
      ) : (
        <View>
          <Text>No Items, press '+' to add items</Text>
          <AddItemModal onAddItem={addItem} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
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
  buttonContainer: {
    maxWidth: 300,
    width: "50%",
    marginVertical: 15,
    alignSelf: "center",
  },
});
