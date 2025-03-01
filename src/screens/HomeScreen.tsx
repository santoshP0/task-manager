import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const { logout } = useAuth();
  
  return (
    <View>
      <Text>Welcome to Home</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
