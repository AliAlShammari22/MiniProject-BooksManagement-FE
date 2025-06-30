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
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../api/books';

const filterChips = [
  { label: 'All Books', active: true },
  { label: 'Author', icon: 'chevron-down' },
  { label: 'Category', icon: 'chevron-down' },
  { label: 'Sort by', icon: 'chevron-down' },
];

export default function BooksScreen() {
  const [search, setSearch] = useState('');
  const { data: books, isLoading, isError } = useQuery({ queryKey: ['books'], queryFn: getBooks });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.header}>
          <TouchableOpacity>
            <FontAwesome5 name="arrow-left" size={20} color="#334155" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Books</Text>
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
              placeholder="Search by title or keyword..."
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChipsRow} contentContainerStyle={{ paddingBottom: 4 }}>
            <TouchableOpacity style={[styles.chip, styles.chipActive]}><Text style={styles.chipActiveText}>All Books</Text></TouchableOpacity>
            <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Category <FontAwesome5 name="chevron-down" size={10} /></Text></TouchableOpacity>
            <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Sort by <FontAwesome5 name="chevron-down" size={10} /></Text></TouchableOpacity>
          </ScrollView>
        </View>

        {/* Books List */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#6366F1" style={{ marginTop: 32 }} />
        ) : isError ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>Failed to load books.</Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={item => item._id || item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.bookCard}>
                <View style={styles.bookImageWrapper}>
                  <Image source={{ uri: `http://localhost:8080/${item.image}` }} style={styles.bookImage} />
                </View>
                <View style={styles.bookInfo}>
                  <View style={styles.bookTitleRow}>
                    <Text style={styles.bookTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.bookAuthor}>{item.author?.name || item.author}</Text>
                  <View style={styles.bookCategoriesRow}>
                    {item.categories?.map((cat: any, idx: number) => (
                      <View key={idx} style={[styles.bookCategory, { backgroundColor: cat.bg || '#ede9fe' }] }>
                        <Text style={[styles.bookCategoryText, { color: cat.color || '#6366F1' }]}>{cat.name || cat}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
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
    paddingTop: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
    zIndex: 5,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
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
  bookCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  bookImageWrapper: {
    width: 80,
    height: 120,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  bookTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  bookTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#334155',
    flex: 1,
    marginRight: 8,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  bookCategoriesRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  bookCategory: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  bookCategoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookRatingText: {
    fontSize: 12,
    color: '#64748b',
  },
}); 