import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loader from '@components/Loader';
import { colors } from '@theme/colors';

const SplashScreen = () => (
  <View style={styles.container}>
    <Text style={styles.logo}>ProductionApp</Text>
    <Loader size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { fontSize: 28, fontWeight: '700', color: colors.white, marginBottom: 24 },
});

export default SplashScreen;
