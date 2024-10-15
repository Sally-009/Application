import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Button,
} from "react-native";

export default function TestScreen({ navigation }) {

    // Initialize state variables
    const [data, setData] = useState([]); // To store the fetched data
    const [loading, setLoading] = useState(true); // To manage the loading state

    // Fetch data
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
        .then((response) => response.json())
        .then((json) => {
          setData(json); // Update the data state
          setLoading(false); // Data has been loaded
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Stop loading even if there's an error
        });
    }, []);

    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.body}</Text>
              </View>
            )}
          />
        )}

        {/* Add a button to navigate to the Welcome screen */}
        <View style={styles.buttonContainer}>
          <Button
            title="Go Back to Welcome Screen"
            onPress={() => navigation.navigate("Welcome")}
          />
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
