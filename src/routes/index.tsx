import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../context/AuthContext';
import { Book, CartItem } from '../@types/type';

import { InicialScreen }       from '../screens/HomeScreen/InicialScreen';
import { LoginScreen }         from '../screens/LoginScreen/LoginScreen';
import { RegisterScreen }      from '../screens/LoginScreen/RegisterScreen';
import { HomeScreen }          from '../screens/HomeScreen/HomeScreen';
import { BookDetailScreen }    from '../screens/BookScreen/BookDetailScreen';
import { ConfirmOrderScreen }  from '../screens/OrderScreen/ConfirmOrderScreen';
import { OrderStatusScreen }   from '../screens/OrderScreen/OrderStatusScreen';
import { OrderReceivedScreen } from '../screens/OrderScreen/OrderReceivedScreen';
import { CartScreen }          from '../screens/CartScreen/CartScreen';
import { LocationScreen }      from '../screens/LocationScreen/LocationScreen';
import { ProfileScreen }       from '../screens/ProfileScreen/ProfileScreen';

export type RootStackParamList = {
  Inicial: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  BookDetail: { book: Book };
  ConfirmOrder: { items: { book: Book; quantity: number }[]; total: number };
  OrderStatus: { items: CartItem[]; total: number; orderId?: string };
  OrderReceived: { orderId?: string };
  Cart: undefined;
  Location: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5C3D99" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Inicial"  component={InicialScreen} />
            <Stack.Screen name="Login"    component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home"          component={HomeScreen} />
            <Stack.Screen name="BookDetail"    component={BookDetailScreen} />
            <Stack.Screen name="Cart"          component={CartScreen} />
            <Stack.Screen name="ConfirmOrder"  component={ConfirmOrderScreen} />
            <Stack.Screen name="OrderStatus"   component={OrderStatusScreen} />
            <Stack.Screen name="OrderReceived" component={OrderReceivedScreen} />
            <Stack.Screen name="Location"      component={LocationScreen} />
            <Stack.Screen name="Profile"       component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}