export interface BookCategory {
  name: string;
  bg: string;
  color: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  categories: BookCategory[];
  rating: number;
  reviews: number;
  bookmarked: boolean;
} 