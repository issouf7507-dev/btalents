export const getCategoriesService = async () => {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

export const createCategoryService = async (category: {
  name: string;
  slug?: string;
}) => {
  const response = await fetch("/api/categories", {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create category");
  }
  return response.json();
};

export const updateCategoryService = async (category: {
  id: string;
  name: string;
  slug?: string;
}) => {
  const response = await fetch(`/api/categories/${category.id}`, {
    method: "PATCH",
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error("Failed to update category");
  }
  return response.json();
};

export const getCategoryByIdService = async (id: string) => {
  const response = await fetch(`/api/categories/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
};

export const deleteCategoryService = async (id: string) => {
  const response = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
  return response.json();
};
