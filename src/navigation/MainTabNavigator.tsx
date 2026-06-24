import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import SettingsScreen from '@screens/SettingsScreen';

import { ROUTES } from '@constants/routes';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,

        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          if (route.name === ROUTES.HOME) {
            iconName = 'home-outline';
          }

          if (route.name === ROUTES.PROFILE) {
            iconName = 'person-outline';
          }

          if (route.name === ROUTES.SETTINGS) {
            iconName = 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />

      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />

      <Tab.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
