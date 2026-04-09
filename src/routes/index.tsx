import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Book } from '../@types/type';

import { InicialScreen } from '../screens/InicialScreen';
import { LoginScreen } from '../screens/LoginScreen';
import  { HomeScreen } from '../screens/HomeScreen';
import { BookDetailScreen } from '../screens/BookDetailScreen';

export type RootStackParamList = {
  Inicial : undefined 
  Home: undefined;
  Login: undefined;
  Register: undefined;
  BookDetail: { book: Book };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicial" component={InicialScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}