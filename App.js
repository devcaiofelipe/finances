import 'react-native-gesture-handler';
import React from 'react';
import  { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth.js';
import Routes from './src/routes';

export default function App() {
    return(
        <NavigationContainer>
            <AuthProvider>
                <StatusBar backgroundColor="#131313" barStyle="light-content"/>
                <Routes/>
            </AuthProvider>
        </NavigationContainer>
    )
};