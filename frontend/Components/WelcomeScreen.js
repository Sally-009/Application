import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import AddItemModal from "../Components/AddItemModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditItemModal from "../Components/EditItemModal";
import styles from "./Styles/styles";

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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
      const response = await fetch("http://localhost:5000/items", {
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
        const response = await fetch("http://localhost:5000/items", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Server Error:", errorResponse);
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

  // Function to handle edit button press
  const handleEditPress = (item) => {
    setSelectedItem(item);
    setIsEditModalVisible(true);
  };

  // Function to handle delete button press
  const handleDeletePress = async (item) => {
    const itemId = item._id;

    try {
      const token = await AsyncStorage.getItem("token");

      console.log("itemId:", itemId);

      const response = await fetch(`http://localhost:5000/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("server error", errorResponse);
        throw new Error(errorResponse.message || "Failed to delete item");
      }

      setData((prevData) => prevData.filter((item) => item._id !== itemId));
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item", error);
      alert("Failed to delete item");
    }
  };

  // save edited item
  const saveEditedItem = async (editedItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/items/${editedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editedItem.title,
            description: editedItem.description,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("server error", errorResponse);
        throw new Error(errorResponse.message || "Failed to update item");
      }

      const savedItem = await response.json();
      setData((prevData) =>
        prevData.map((item) => (item._id === editedItem._id ? savedItem : item))
      );
    } catch (error) {
      console.error("Error updating item", error);
      alert("Failed to update item");
    }
  };

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
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => handleEditPress(item)}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeletePress(item)}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <AddItemModal onAddItem={addItem} />
          {selectedItem && (
            <EditItemModal
              item={selectedItem}
              isVisible={isEditModalVisible}
              onClose={() => setIsEditModalVisible(false)}
              onSave={saveEditedItem}
            />
            )}
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
