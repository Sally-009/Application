import React, {useState, useEffect } from "react";
import { SafeAreaView, Text, Button, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Styles/styles";
import { View } from "react-native-web";
import EditUserInfoModal from "./EditUserInfoModal";
import fetchUserInfo from "./Functions/FetchUserInfo";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
    
    const imageSource = require("../assets/person.png");

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user information
    useEffect(() => {
        fetchUserInfo(setLoading, setUserInfo);
    }, []);

    // Function to handle edit button
    const handleEdit = () => {
        setIsEditModalVisible(true);
    }

    // Save the updated user information
    const saveUserInfo = async (updatedUserInfo) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/users/user/${userInfo._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUserInfo),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Server Error:", errorResponse);
                throw new Error(errorResponse.message || "Failed to update user information");
            }

            const user = await response.json();
            setUserInfo(user);
        } catch (error) {
            console.error("Error updating user information:", error);
            alert(error.message);
        }
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Your Information</Text>
        <Image source={imageSource} style={styles.profileImage} />
        <Text style={styles.profileText}>
          Name: {userInfo.firstname} {userInfo.lastname}
        </Text>
        <Text style={styles.profileText}>
            Email: {userInfo.username}
        </Text>
        <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Edit" onPress={handleEdit} />
        </View>
        {/* Modal to edit user information */}
        <EditUserInfoModal
            userInfo={userInfo}
            isVisible={isEditModalVisible}
            onClose={() => setIsEditModalVisible(false)}
            onSave={saveUserInfo}
        />
      </SafeAreaView>
    );
}

