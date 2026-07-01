import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftText?: string;
}

const Input: React.FC<InputProps> = ({ label, error, style, leftText, ...props }) => (
  <View style={styles.container}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <View style={[styles.inputContainer, error ? styles.inputError : null]}>
      {leftText && <Text style={styles.leftText}>{leftText}</Text>}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
    </View>
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: colors.text,
  },

  // NEW
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,

    paddingHorizontal: 12,
  },

  // NEW
  leftText: {
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },

  // UPDATED
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },

  inputError: {
    borderColor: colors.error,
  },

  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
