import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Book } from '../@types/type';
import { CartItem } from '../@types/type';

import { InicialScreen } from '../screens/InicialScreen';
import { LoginScreen } from '../screens/LoginScreen';
import  { HomeScreen } from '../screens/HomeScreen';
import { BookDetailScreen } from '../screens/BookDetailScreen';
import { ConfirmOrderScreen } from '../screens/ConfirmOrderScreen';
import { OrderStatusScreen } from '../screens/OrderStatusScreen';
import { OrderReceivedScreen } from '../screens/OrderReceivedScreen';
import { CartScreen } from '../screens/CartScreen';

export type RootStackParamList = {
  Inicial : undefined 
  Home: undefined;
  Login: undefined;
  Register: undefined;
  BookDetail: { book: Book };
  ConfirmOrder: { items: { book: Book; quantity: number }[]; total: number };
  OrderStatus: { items: CartItem[]; total: number; orderId?: string };
  OrderReceived: { orderId?: string };
  Cart: undefined;
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
        <Stack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />
        <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
        <Stack.Screen name="OrderReceived" component={OrderReceivedScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}