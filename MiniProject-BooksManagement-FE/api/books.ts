import instance from ".";

const getBooks = async () => {
  const { data } = await instance.get("/books");
  return data;
};

const getBook = async (id: string) => {
  const { data } = await instance.get(`/books/${id}`);
  return data;
};

const createBook = async (book: any) => {
  const { data } = await instance.post("/books", book);
  return data;
};

const updateBook = async (id: string, book: any) => {
  const { data } = await instance.put(`/books/${id}`, book);
  return data;
};

const deleteBook = async (id: string) => {
  const { data } = await instance.delete(`/books/${id}`);
  return data;
};

export { getBooks, getBook, createBook, updateBook, deleteBook };
