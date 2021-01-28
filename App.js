import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
import firebase from './src/services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Routes from './src/routes';

export default function App() {
  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" barStyle="light-content"/>
        <Routes />
      </AuthProvider>
    </NavigationContainer>

    
  )
}

