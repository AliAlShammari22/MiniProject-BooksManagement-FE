import instance from ".";

const getCategories = async () => {
  const { data } = await instance.get("/categories");
  return data;
};

const getCategory = async (id: string) => {
  const { data } = await instance.get(`/categories/${id}`);
  return data;
};

const createCategory = async (category: any) => {
  const { data } = await instance.post("/categories", category);
  return data;
};

const updateCategory = async (id: string, category: any) => {
  const { data } = await instance.put(`/categories/${id}`, category);
  return data;
};

const deleteCategory = async (id: string) => {
  const { data } = await instance.delete(`/categories/${id}`);
  return data;
};

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory }; 