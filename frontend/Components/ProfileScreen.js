import React from "react";
import { SafeAreaView, Text, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
    
    // show some text
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>This is Profile Page</Text>
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
