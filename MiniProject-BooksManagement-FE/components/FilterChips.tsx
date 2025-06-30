import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface Chip {
  label: string;
  active?: boolean;
  icon?: string;
  onPress?: () => void;
}

interface FilterChipsProps {
  chips: Chip[];
}

export const FilterChips = ({ chips }: FilterChipsProps) => (
  <View style={styles.chipsRow}>
    {chips.map((chip, idx) => (
      <TouchableOpacity
        key={chip.label + idx}
        style={[styles.chip, chip.active && styles.chipActive]}
        onPress={chip.onPress}
      >
        <Text style={chip.active ? styles.chipActiveText : styles.chipText}>
          {chip.label}
          {chip.icon && (
            <FontAwesome5 name={chip.icon} size={10} style={{ marginLeft: 6 }} />
          )}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 4,
  },
  chip: {
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '500',
  },
  chipActive: {
    backgroundColor: '#6366F1',
  },
  chipActiveText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
}); 