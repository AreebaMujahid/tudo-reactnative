import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@components/Button';
import { colors } from '@theme/colors';

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, actionLabel, onAction }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {message ? <Text style={styles.message}>{message}</Text> : null}
    {actionLabel && onAction ? (
      <Button title={actionLabel} onPress={onAction} style={styles.btn} />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  btn: {
    marginTop: 16,
    minWidth: 120,
  },

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },

  message: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },

  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EmptyState;
