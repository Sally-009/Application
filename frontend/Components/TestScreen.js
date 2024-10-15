import React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';

export default function TestScreen({ navigation }) {

    const  navigateToWelcomeScreen = () => {
        navigation.navigate('Welcome');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Test Screen</Text>
            <Button style={styles.button} title="Go to Welcome Screen" onPress={navigateToWelcomeScreen} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});