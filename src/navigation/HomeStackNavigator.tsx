import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import ProductDetailsScreen from '@screens/ProductDetailsScreen';
import CheckoutScreen from '@screens/CheckoutScreen';
import OrderSuccessScreen from '@screens/OrderSuccessScreen';
import { HomeStackParamList } from './types';

import { ROUTES } from '@constants/routes';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />

      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />

      <Stack.Screen name="Checkout" component={CheckoutScreen} />

      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
