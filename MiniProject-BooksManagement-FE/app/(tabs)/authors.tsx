import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { getAuthors } from '../../api/authors';

export default function AuthorsScreen() {
  const [search, setSearch] = useState('');
  const { data: authors, isLoading, isError } = useQuery({ queryKey: ['authors'], queryFn: getAuthors });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.header}>
          <TouchableOpacity>
            <FontAwesome5 name="arrow-left" size={20} color="#334155" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Authors</Text>
          <TouchableOpacity>
            <FontAwesome5 name="search" size={20} color="#334155" />
          </TouchableOpacity>
        </View>

        {/* Search & Filter Block */}
        <View style={styles.searchFilterBlock}>
          <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={16} color="#94a3b8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search authors..."
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChipsRow} contentContainerStyle={{ paddingBottom: 4 }}>
            <TouchableOpacity style={[styles.chip, styles.chipActive]}><Text style={styles.chipActiveText}>All Authors</Text></TouchableOpacity>
            <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Country <FontAwesome5 name="chevron-down" size={12} style={{ marginLeft: 6 }} /></Text></TouchableOpacity>
            <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Sort by <FontAwesome5 name="chevron-down" size={12} style={{ marginLeft: 6 }} /></Text></TouchableOpacity>
          </ScrollView>
        </View>

        {/* Authors List */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#6366F1" style={{ marginTop: 32 }} />
        ) : isError ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>Failed to load authors.</Text>
        ) : (
          <FlatList
            data={authors}
            keyExtractor={item => item._id || item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.authorCard} activeOpacity={0.8}>
                <View style={[styles.avatarWrapper, { borderColor: item.borderColor || '#6366F1' }] }>
                  <Image source={{ uri: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" }} style={styles.avatar} />
                </View>
                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>{item.name}</Text>
                  <View style={styles.authorMetaRow}>
                    <Text style={styles.authorMeta}>{item.country}</Text>
                    <Text style={styles.authorMetaDot}>•</Text>
                    <Text style={styles.authorMeta}>{item.books?.length || item.books || 0} books</Text>
                  </View>
                </View>
                <FontAwesome5 name="chevron-right" size={18} color="#d1d5db" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
    fontFamily: 'Inter',
  },
  searchFilterBlock: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    zIndex: 5,
  },
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
  filterChipsRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  chip: {
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '500',
  },
  chipActive: {
    backgroundColor: '#6366F1',
  },
  chipActiveText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
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