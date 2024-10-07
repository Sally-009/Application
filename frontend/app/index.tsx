import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useState } from "react";

export default function Index() {
  // variables
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");

  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const MESSAGES = {
    FILL_FIELDS: "Please fill out all fields.",
    LOGIN_SUCCESS: "Login successful!",
    SIGNUP_SUCCESS: "Sign Up successful!",
  };

  // functions
  const validateFields = () => {
    if (isLogin) {
      return email && pswd;
    } else {
      return fname && lname && email && pswd;
    }
  };

  const handleSubmit = () => {
    // close keyboard
    Keyboard.dismiss();

    // validate
    if (!validateFields()) {
      setMessage(MESSAGES.FILL_FIELDS);
      return;
    }
    // set message
    setMessage(isLogin ? MESSAGES.LOGIN_SUCCESS : MESSAGES.SIGNUP_SUCCESS);
  };

  const handleSwitch = () => {
    setMessage(""); // clear message

    // clear fields
    setEmail("");
    setPswd("");
    setFname("");
    setLname("");

    setIsLogin(!isLogin); // switch between login and sign up
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      {isLogin ? (
        <Text style={styles.paragraph}>Login</Text>
      ) : (
        <Text style={styles.paragraph}>Sign Up</Text>
      )}

      {/* Inputs */}
      {/* Hide first name and last name if login */}
      {!isLogin && (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFname(text)}
              value={fname}
              autoCapitalize={"words"}
              placeholder="Enter your first name"
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.input}
              onChangeText={(text) => setLname(text)}
              value={lname}
              autoCapitalize={"words"}
              placeholder="Enter your last name"
            />
          </KeyboardAvoidingView>
        </>
      )}

      {/* Email and password */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize={"none"}
          placeholder="Enter your email address"
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPswd(text)}
          value={pswd}
          autoCapitalize={"none"}
          placeholder="Enter your password"
        />
      </KeyboardAvoidingView>

      {/* message */}
      {message && <Text style={styles.paragraph}>{message}</Text>}

      {/* Buttons */}
      <View style={styles.button}>
        <Button title={isLogin ? "Login" : "Sign Up"} onPress={handleSubmit} />
        <View style={{ marginVertical: 10 }} />
        <Button
          title={isLogin ? "Switch to Sign Up" : "Switch to Login"}
          onPress={handleSwitch}
        />
      </View>
    </SafeAreaView>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  button: {
    alignSelf: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "24A0ED",
    borderRadius: 5,
  },
});
