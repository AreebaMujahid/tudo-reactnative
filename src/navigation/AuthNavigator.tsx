import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '@constants/routes';
import RegisterScreen from '@screens/RegisterScreen';
import { AuthStackParamList } from './types';
import LoginScreen from '@/screens/LoginScreen';
import PasswordScreen from '@/screens/PasswordScreen';
import OtpScreen from '@/screens/OtpScreen';
const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
    <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
    <Stack.Screen name={ROUTES.PASSWORD} component={PasswordScreen} />
    <Stack.Screen name={ROUTES.OTP} component={OtpScreen} />
  </Stack.Navigator>
);
export default AuthNavigator;
