import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, TextStyle, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../api/books';
import { getAuthors } from '../../api/authors';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Fiction', bg: 'rgba(99,102,241,0.1)', color: '#6366F1' },
  { id: '2', name: 'Mystery', bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
  { id: '3', name: 'Sci-Fi', bg: 'rgba(236,72,153,0.1)', color: '#EC4899' },
  { id: '4', name: 'Romance', bg: '#ffe4e6', color: '#db2777' },
  { id: '5', name: 'Biography', bg: '#dbeafe', color: '#2563eb' },
  { id: '6', name: 'Self-Help', bg: '#bbf7d0', color: '#16a34a' },
  { id: '7', name: 'Fantasy', bg: '#ede9fe', color: '#7c3aed' },
];

export default function HomeScreen() {
  const { data: books, isLoading: booksLoading, isError: booksError } = useQuery({ queryKey: ['books'], queryFn: getBooks });
  const { data: authors, isLoading: authorsLoading, isError: authorsError } = useQuery({ queryKey: ['authors'], queryFn: getAuthors });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome5 name="bars" size={22} color="#334155" />
        </TouchableOpacity>
        <View style={styles.logoRow}>
          <FontAwesome5 name="book-open" size={24} color="#6366F1" style={{ marginRight: 8 }} />
          <Text style={styles.logoText}>BookShare</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <FontAwesome5 name="search" size={20} color="#334155" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <FontAwesome5 name="bell" size={20} color="#334155" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <LinearGradient
          colors={["#6366F1", "#EC4899"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroIconsBg}>
            <FontAwesome5 name="book" size={32} color="white" style={styles.heroIcon} />
            <FontAwesome5 name="bookmark" size={28} color="white" style={styles.heroIcon} />
            <FontAwesome5 name="glasses" size={28} color="white" style={styles.heroIcon} />
            <FontAwesome5 name="pen" size={22} color="white" style={styles.heroIcon} />
            <FontAwesome5 name="book-open" size={32} color="white" style={styles.heroIcon} />
          </View>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Discover & Share Books</Text>
            <Text style={styles.heroSubtitle}>Connect with readers and find your next favorite book</Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Featured Books */}
        <SectionHeader title="Featured Books" actionLabel="See All" />
        {booksLoading ? (
          <ActivityIndicator size="large" color="#6366F1" style={{ marginVertical: 24 }} />
        ) : booksError ? (
          <Text style={{ color: 'red', textAlign: 'center', marginVertical: 24 }}>Failed to load books.</Text>
        ) : (
          <FlatList
            data={books?.slice(0, 4) || []}
            keyExtractor={item => item._id || item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            style={{ marginBottom: 24 }}
            renderItem={({ item }) => (
              <View style={styles.bookCard}>
                <View style={styles.bookImageWrapper}>
                <Image
                      source={{ uri: `http://localhost:8080/${item.image}` }} // ✅ Use your actual IP!
                      style={styles.bookImage}
                      resizeMode="cover"
                    />
                  {item.badge && (
                    <View style={[styles.bookBadge, { backgroundColor: item.badgeColor || '#6366F1' }] }>
                      <Text style={styles.bookBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.bookAuthor} numberOfLines={1}>{item.author?.name || item.author}</Text>
                </View>
              </View>
            )}
          />
        )}

        {/* New Authors */}
        <SectionHeader title="New Authors" actionLabel="See All" />
        {authorsLoading ? (
          <ActivityIndicator size="large" color="#6366F1" style={{ marginVertical: 24 }} />
        ) : authorsError ? (
          <Text style={{ color: 'red', textAlign: 'center', marginVertical: 24 }}>Failed to load authors.</Text>
        ) : (
          <FlatList
            data={authors?.slice(0, 5) || []}
            keyExtractor={item => item._id || item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            style={{ marginBottom: 24 }}
            renderItem={({ item }) => (
              <View style={styles.authorCard}>
                <View style={[styles.authorAvatarWrapper, { borderColor: item.borderColor || '#6366F1' }] }>
                  <Image source={{ uri: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' }} style={styles.authorAvatar} />
                </View>
                <Text style={styles.authorName}>{item.name}</Text>
                <Text style={styles.authorCountry}>{item.country}</Text>
              </View>
            )}
          />
        )}

        {/* Popular Categories */}
        <SectionHeader title="Popular Categories" actionLabel="All" />
        <View style={styles.categoriesRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryButton, { backgroundColor: cat.bg }]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  cat.color ? { color: cat.color } : {},
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <View style={{ marginBottom: 12 }}>
            <FontAwesome5 name="book-open-reader" size={32} color="#6366F1" />
          </View>
          <Text style={styles.ctaTitle}>Have a great book to share?</Text>
          <Text style={styles.ctaSubtitle}>Help grow our community by adding your favorite books</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <FontAwesome5 name="plus" size={16} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.ctaButtonText}>Add Your Book</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({ title, actionLabel }: { title: string; actionLabel: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
    fontFamily: 'Inter',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#EC4899',
    borderRadius: 8,
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroBanner: {
    height: 180,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroIconsBg: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.18,
  },
  heroIcon: {
    marginHorizontal: 8,
  },
  heroContent: {
    position: 'relative',
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  heroTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: 'white',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  heroButtonText: {
    color: '#6366F1',
    fontWeight: '500',
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  sectionAction: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '500',
  },
  bookCard: {
    width: 128,
    borderRadius: 12,
    backgroundColor: 'white',
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  bookImageWrapper: {
    height: 160,
    backgroundColor: '#e5e7eb',
    position: 'relative',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  bookBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bookInfo: {
    padding: 8,
  },
  bookTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1e293b',
  },
  bookAuthor: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  authorCard: {
    width: 96,
    alignItems: 'center',
    marginRight: 16,
  },
  authorAvatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 2,
    marginBottom: 8,
  },
  authorAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  authorName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1e293b',
    textAlign: 'center',
  },
  authorCountry: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontWeight: '500',
    fontSize: 14,
  } as TextStyle,
  ctaSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
}); 