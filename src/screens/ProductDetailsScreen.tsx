import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { HomeStackParamList } from '@navigation/types';

type RouteProps = RouteProp<HomeStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const route = useRoute<RouteProps>();

  type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>

      <Text>{product.description}</Text>

      <Text style={styles.price}>{product.price}</Text>

      <Button
        title="Buy Now"
        onPress={() =>
          navigation.navigate('Checkout', {
            product,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  image: {
    height: 250,
    width: '100%',
  },

  price: {
    fontSize: 20,
    marginVertical: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 10,
  },
});

export default ProductDetailsScreen;
