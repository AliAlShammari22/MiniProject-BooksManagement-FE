import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Author } from '../types/author';

interface AuthorCardProps {
  author: Author;
  onPress?: () => void;
}

export const AuthorCard = ({ author, onPress }: AuthorCardProps) => (
  <TouchableOpacity style={styles.authorCard} activeOpacity={0.8} onPress={onPress}>
    <View style={[styles.avatarWrapper, { borderColor: author.borderColor }] }>
      <Image source={{ uri: author.image }} style={styles.avatar} />
    </View>
    <View style={styles.authorInfo}>
      <Text style={styles.authorName}>{author.name}</Text>
      <View style={styles.authorMetaRow}>
        <Text style={styles.authorMeta}>{author.country}</Text>
        <Text style={styles.authorMetaDot}>•</Text>
        <Text style={styles.authorMeta}>{author.books} books</Text>
      </View>
    </View>
    <FontAwesome5 name="chevron-right" size={18} color="#d1d5db" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: 'white',
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  authorInfo: {
    flex: 1,
    marginLeft: 0,
  },
  authorName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#334155',
    marginBottom: 2,
  },
  authorMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorMeta: {
    fontSize: 12,
    color: '#64748b',
  },
  authorMetaDot: {
    fontSize: 14,
    color: '#cbd5e1',
    marginHorizontal: 6,
    fontWeight: 'bold',
  },
}); 