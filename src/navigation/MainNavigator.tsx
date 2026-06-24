import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ROUTES } from '@constants/routes';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileScreen from '@screens/ProfileScreen';
import SettingsScreen from '@screens/SettingsScreen';
import { MainTabParamList } from './types';
import { colors } from '@theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<string, string> = {
  [ROUTES.HOME]: 'home-outline',
  [ROUTES.PROFILE]: 'person-outline',
  [ROUTES.SETTINGS]: 'settings-outline',
};

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarIcon: ({ color, size }) => (
        <Icon name={tabIcons[route.name] ?? 'ellipse'} size={size} color={color} />
      ),
    })}
  >
    <Tab.Screen name={ROUTES.HOME} component={HomeStackNavigator} />
    <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    <Tab.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
  </Tab.Navigator>
);

export default MainNavigator;
