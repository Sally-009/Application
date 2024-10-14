import React from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';

export default function TestScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Test Screen</Text>
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