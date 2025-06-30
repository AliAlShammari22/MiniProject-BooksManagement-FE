import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
}

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesome key={i} name="star" size={14} color="#F59E0B" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesome key={i} name="star-half-full" size={14} color="#F59E0B" />);
    } else {
      stars.push(<FontAwesome key={i} name="star-o" size={14} color="#F59E0B" />);
    }
  }
  return <View style={{ flexDirection: 'row', marginRight: 6 }}>{stars}</View>;
}

export const BookCard = ({ book }: BookCardProps) => (
  <View style={styles.bookCard}>
    <View style={styles.bookImageWrapper}>
      <Image source={{ uri: book.image }} style={styles.bookImage} />
    </View>
    <View style={styles.bookInfo}>
      <View style={styles.bookTitleRow}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <TouchableOpacity>
          {book.bookmarked ? (
            <FontAwesome5 name="bookmark" solid size={18} color="#6366F1" />
          ) : (
            <FontAwesome5 name="bookmark" size={18} color="#94a3b8" />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.bookAuthor}>{book.author}</Text>
      <View style={styles.bookCategoriesRow}>
        {book.categories.map((cat, idx) => (
          <View key={idx} style={[styles.bookCategory, { backgroundColor: cat.bg }] }>
            <Text style={[styles.bookCategoryText, { color: cat.color }]}>{cat.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.bookRatingRow}>
        {renderStars(book.rating)}
        <Text style={styles.bookRatingText}>{book.rating.toFixed(1)} • {book.reviews} reviews</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
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