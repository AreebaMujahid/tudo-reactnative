import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { HomeStackParamList } from '@navigation/types';

import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
type CheckoutRouteProp = RouteProp<HomeStackParamList, 'Checkout'>;

const CheckoutScreen = () => {
  const route = useRoute<CheckoutRouteProp>();
  const navigation = useNavigation();
  const { product } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>{product.title}</Text>
      <Text>{product.price}</Text>
      <Button title="Place Order" onPress={() => navigation.navigate('OrderSuccess' as never)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default CheckoutScreen;
