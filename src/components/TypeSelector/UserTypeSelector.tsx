import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Option = {
  label: string;
  value: number;
};

type Props = {
  options: Option[];
  selectedValue: number;
  onSelect: (value: number) => void;
};

const UserTypeSelector = ({ options, selectedValue, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select User Type</Text>

      {options.map(option => {
        const isSelected = selectedValue === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => onSelect(option.value)}
          >
            <View style={[styles.radio, isSelected && styles.selectedRadio]} />

            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default UserTypeSelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    marginBottom: 12,
  },

  selectedOption: {
    borderColor: '#4F46E5',
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
  },

  selectedRadio: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },

  optionText: {
    fontSize: 16,
  },
});
