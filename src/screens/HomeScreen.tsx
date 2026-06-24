import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Header from '@components/Header';
import Loader from '@components/Loader';
import EmptyState from '@components/EmptyState';
import ProductCard from '@components/ProductCard';
import { useAuth } from '@hooks/useAuth';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { MOCK_PRODUCTS } from '@constants/mockProducts';
import { Product } from '@/types/product';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@navigation/types';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const fetchFeed = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return MOCK_PRODUCTS;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['feed'],
    queryFn: fetchFeed,
  });

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetails', {
        product,
      });
    },
    [navigation],
  );

  const handleAddToCart = useCallback((product: Product) => {
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.title} has been added to your cart.`,
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} onPress={handleProductPress} onAddToCart={handleAddToCart} />
    ),
    [handleProductPress, handleAddToCart],
  );

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load"
        message="Something went wrong"
        onAction={refetch}
        actionLabel="Retry"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title={`Hello, ${user?.name ?? 'User'}`} subtitle="Featured Products" />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        refreshing={isFetching}
        onRefresh={refetch}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<EmptyState title="No items" message="Your feed is empty" />}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  list: { padding: spacing.md, paddingBottom: spacing.lg },
  row: { justifyContent: 'space-between' },
});

export default HomeScreen;
