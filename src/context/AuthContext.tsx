import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { LoginAuth, SignupAuth } from '../services/authService';
import Loader from '../components/Loader';

interface AuthContextType {
  userToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      await SplashScreen.preventAutoHideAsync();
      const token = await AsyncStorage.getItem('userToken');
      if (token) setUserToken(token);
      setLoading(false);
      await SplashScreen.hideAsync();
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await LoginAuth(username, password);
      if(response.status === 200) {
          await AsyncStorage.setItem('userToken', response.token);
          setUserToken(response.token);
        }
    } catch (error: any) {
      alert('Login Failed: ' + error.message);
    }finally {
      setLoading(false);
    }
  };
  const signup = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await SignupAuth(username, email, password);
      console.log(response)
      if(response.status === 200) {
          alert(response.message);
        }
    } catch (error: any) {
      alert('signup Failed: ' + error.message);
    }finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  };

  if (loading) {
    return <Loader />;
  }

  return <AuthContext.Provider value={{ userToken, login, signup, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
