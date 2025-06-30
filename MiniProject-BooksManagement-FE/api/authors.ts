import instance from ".";
import { Author } from '../types/author';

const getAuthors = async (): Promise<Author[]> => {
  const { data } = await instance.get("/authors");
  return data;
};

const getAuthor = async (id: string): Promise<Author> => {
  const { data } = await instance.get(`/authors/${id}`);
  return data;
};

const createAuthor = async (author: Partial<Author>): Promise<Author> => {
  const { data } = await instance.post("/authors", author);
  return data;
};

const updateAuthor = async (id: string, author: Partial<Author>): Promise<Author> => {
  const { data } = await instance.put(`/authors/${id}`, author);
  return data;
};

const deleteAuthor = async (id: string): Promise<void> => {
  const { data } = await instance.delete(`/authors/${id}`);
  return data;
};

export { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor }; 