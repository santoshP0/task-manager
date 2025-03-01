import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import * as SplashScreen from 'expo-splash-screen';
import { TaskProvider } from '../context/TaskContext';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { userToken } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen name="Home">
          {() => (
            <TaskProvider>
              <HomeScreen />
            </TaskProvider>
          )}
        </Stack.Screen>

      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

const NavigationWrapper: React.FC = () => {
    const onLayoutRootView = useCallback(async () => {
        await SplashScreen.hideAsync();
      }, []);
      
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
