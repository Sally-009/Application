import React from "react";
import { SafeAreaView, Text, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Styles/styles";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
    
    // show some text
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>This is Profile Page</Text>
        </SafeAreaView>
    );
}

