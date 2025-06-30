import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => (
  <View style={styles.searchContainer}>
    <FontAwesome5 name="search" size={16} color="#94a3b8" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder || 'Search...'}
      placeholderTextColor="#94a3b8"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    paddingLeft: 36,
    paddingRight: 16,
    fontSize: 15,
    color: '#334155',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 2,
  },
}); 