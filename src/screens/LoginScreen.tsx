import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { TextInput } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Email Input */}
          <TextInput
            style={styles.input}
            label="Email"
            placeholder="Enter your email"
            value={username}
            onChangeText={setUsername}
            maxLength={30}
            mode="outlined"
            theme={{ colors: { primary: '#6200ee', background: 'white' } }}
            left={<TextInput.Icon icon={() => <FontAwesome name="user" size={20} color="gray" />} />}
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

          {/* Login Button */}
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={() => login(username, password)} color="#6200ee" />
          </View>
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
});

export default LoginScreen;
