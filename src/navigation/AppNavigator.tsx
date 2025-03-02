import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import * as SplashScreen from 'expo-splash-screen';
import { TaskProvider } from '../context/TaskContext';
import TaskDetails from '../screens/TaskDetails';

type RootStackParamList = {
  Login: undefined;
  Home: HomeStackParamList;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  TaskDetails: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <TaskProvider>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="TaskDetails" component={TaskDetails} />
      </HomeStack.Navigator>
    </TaskProvider>
  );
};


const AppNavigator: React.FC = () => {
  const { userToken } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen name="Home" component={HomeStackNavigator} />
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
