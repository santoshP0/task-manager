import 'react-native-gesture-handler';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/context/AuthContext';
import NavigationWrapper from './src/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationWrapper />
    </AuthProvider>
  );
};

export default App;
