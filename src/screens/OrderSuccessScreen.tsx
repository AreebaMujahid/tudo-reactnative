import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@navigation/types';

const OrderSuccessScreen = () => {
  type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>Order Successful</Text>

      <Button title="Back To Home" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  icon: {
    fontSize: 60,
  },

  title: {
    fontSize: 24,
    marginVertical: 20,
  },
});

export default OrderSuccessScreen;
