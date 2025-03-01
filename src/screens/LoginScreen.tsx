import React, { useState } from 'react';
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
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { TextInput } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const AuthScreen: React.FC = () => {
  const { login, signup, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  const handleAuth = () => {
    if (isSignup) {
      signup(username, email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Username Input (Signup Only) */}
          {isSignup && (
            <TextInput
              style={styles.input}
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              maxLength={30}
              mode="outlined"
              theme={{ colors: { primary: '#6200ee', background: 'white' } }}
              left={<TextInput.Icon icon={() => <FontAwesome name="user" size={20} color="gray" />} />}
            />
          )}

          {/* Email Input */}
          <TextInput
            style={styles.input}
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            maxLength={30}
            mode="outlined"
            theme={{ colors: { primary: '#6200ee', background: 'white' } }}
            left={<TextInput.Icon icon={() => <FontAwesome name="envelope" size={20} color="gray" />} />}
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            theme={{ colors: { primary: '#6200ee', background: 'white' } }}
            left={<TextInput.Icon icon={() => <FontAwesome6 name="key" size={20} color="gray" />} />}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? 'eye-off' : 'eye'}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                forceTextInputFocus={false}
              />
            }
          />

          {/* Login / Signup Button */}
          <View style={styles.buttonContainer}>
            <Button title={isSignup ? "Sign Up" : "Login"} onPress={handleAuth} color="#6200ee" />
          </View>

          {/* Switch Auth Mode */}
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
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  inner: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  switchButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  switchText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AuthScreen;
