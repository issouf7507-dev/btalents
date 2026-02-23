import { ArticleStatus } from "@/generated/prisma/enums";

export interface CreateArticleDTO {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  status: ArticleStatus;
  categoryId?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags: string[];
}

export const createArticleService = async (data: CreateArticleDTO) => {
  const response = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create article");
  }
  return response.json();
};

export const getArticlesService = async () => {
  const response = await fetch("/api/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};

export const getArticleByIdService = async (id: string) => {
  const response = await fetch(`/api/articles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
  return response.json();
};

export interface UpdateArticleDTO extends CreateArticleDTO {
  id: string;
}

export const updateArticleService = async (data: UpdateArticleDTO) => {
  const { id, ...body } = data;
  const response = await fetch(`/api/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update article");
  }
  return response.json();
};
