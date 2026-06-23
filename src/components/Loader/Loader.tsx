import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'small' | 'large';
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false, size = 'large' }) => (
  <View style={[styles.container, fullScreen && styles.fullScreen]}>
    <ActivityIndicator size={size} color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', justifyContent: 'center' },
  fullScreen: { flex: 1 },
});

export default Loader;
