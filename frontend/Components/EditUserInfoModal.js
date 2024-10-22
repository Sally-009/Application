import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function EditUserInfoModal({ userInfo, isVisible, onClose, onSave}){
    // State to hold the user information
    const [fname, setFname] = useState(userInfo.firstname);
    const [lname, setLname] = useState(userInfo.lastname);
    const [email, setEmail] = useState(userInfo.username);

    // Update the state when the user information changes
    useEffect(() => {
        setFname(userInfo.firstname);
        setLname(userInfo.lastname);
        setEmail(userInfo.username);
    }, [userInfo]);

    // Function to handle the save button
    const handleSave = () => {
        if (fname.trim() && lname.trim() && email.trim()) {
            onSave({ ...userInfo, firstname: fname.trim(), lastname: lname.trim(), username: email.trim() });
            onClose();
        } else {
            alert("Please fill in all fields");
        }
    };

    return(
    <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit User Information</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={fname}
                    onChangeText={(text) => setFname(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lname}
                    onChangeText={(text) => setLname(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.successButton]}
                        onPress={handleSave}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({
  addButton: {
    width: 60,
    padding: 15,
    backgroundColor: "#0fff12",
    borderRadius: 50,
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 24,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    height: 250,
    display: "flex",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  successButton: {
    backgroundColor: "#0fff12",
  },
  cancelButton: {
    backgroundColor: "#ff5c5c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
