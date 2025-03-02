import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { TextInput } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AuthScreen: React.FC = () => {
  const { login, signup, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setErrors({ email: "", password: "", username: "" }); // Reset errors on toggle
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputs = () => {
    let isValid = true;
    let newErrors = { email: "", password: "", username: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(email.trim())) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    if (isSignup) {
      if (!username.trim()) {
        newErrors.username = "Username is required.";
        isValid = false;
      } else if (username.trim().length < 3) {
        newErrors.username = "Username must be at least 3 characters.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAuth = () => {
    if (!validateInputs()) return;
    if (isSignup) {
      signup(username.trim(), email.trim(), password.trim());
    } else {
      login(email.trim(), password.trim());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Username Input (Signup Only) */}
          {isSignup && (
            <>
              <TextInput
                style={styles.input}
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setErrors((prev) => ({ ...prev, username: "" })); // Clear error
                }}
                maxLength={30}
                mode="outlined"
                theme={{ colors: { primary: "#6200ee", background: "white" } }}
                left={<TextInput.Icon icon={() => <FontAwesome name="user" size={20} color="gray" />} />}
              />
              {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
            </>
          )}

          {/* Email Input */}
          <>
            <TextInput
              style={styles.input}
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: "" })); // Clear error
              }}
              maxLength={30}
              mode="outlined"
              theme={{ colors: { primary: "#6200ee", background: "white" } }}
              left={<TextInput.Icon icon={() => <FontAwesome name="envelope" size={20} color="gray" />} />}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </>

          <>
            <TextInput
              style={styles.input}
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({ ...prev, password: "" })); // Clear error
              }}
              secureTextEntry={secureTextEntry}
              mode="outlined"
              theme={{ colors: { primary: "#6200ee", background: "white" } }}
              left={<TextInput.Icon icon={() => <FontAwesome6 name="key" size={20} color="gray" />} />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye-off" : "eye"}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  forceTextInputFocus={false}
                />
              }
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </>

          <View style={styles.buttonContainer}>
            <Button title={isSignup ? "Sign Up" : "Login"} onPress={handleAuth} color="#6200ee" disabled={loading} />
          </View>

          <TouchableOpacity onPress={toggleAuthMode} style={styles.switchButton}>
            <Text style={styles.switchText}>
              {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  inner: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  switchButton: {
    marginTop: 15,
    alignItems: "center",
  },
  switchText: {
    color: "#6200ee",
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
  },
});

export default AuthScreen;
