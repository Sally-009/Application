import React, {useState, useEffect } from "react";
import { SafeAreaView, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Styles/styles";
import { View } from "react-native-web";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
    
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user information
    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await fetch("http://localhost:5000/users/user", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error("Server Error:", errorResponse);
                    throw new Error(errorResponse.message || "Failed to fetch user information");
                }

                const user = await response.json();
                setUserInfo(user);
            } catch (error) {
                console.error("Error fetching user information:", error);
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    // Function to handle edit button
    const handleEdit = () => {
        
    }

    // show some text
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Your Information</Text>
        <Text style={styles.profileText}>
          Name: {userInfo.firstname} {userInfo.lastname}
        </Text>
        <Text style={styles.profileText}>
            Email: {userInfo.username}
        </Text>
        <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Edit" onPress={handleEdit} />
        </View>
      </SafeAreaView>
    );
}

