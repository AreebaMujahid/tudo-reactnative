import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2-column layout width with padding

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onPress, onAddToCart }) => {
  const handlePress = () => onPress?.(product);
  const handleAddToCart = () => onAddToCart?.(product);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.ratingRow}>
          <Icon name="star" size={14} color="#FBBF24" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>{product.price}</Text>
          <Pressable
            onPress={handleAddToCart}
            style={({ pressed }) => [styles.cartButton, pressed && styles.cartButtonPressed]}
          >
            <Icon name="cart-outline" size={16} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    width: cardWidth,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cartButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  cartButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
  content: {
    padding: spacing.sm + 4, // 12px
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    backgroundColor: colors.border,
    height: 120,
    width: '100%',
  },
  price: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  ratingText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
