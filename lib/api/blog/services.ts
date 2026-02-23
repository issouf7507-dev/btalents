export const getPublishedArticlesService = async () => {
  const response = await fetch("/api/blog/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};

export const getArticleBySlugService = async (slug: string) => {
  const response = await fetch(`/api/blog/articles/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Article not found");
    }
    throw new Error("Failed to fetch article");
  }
  return response.json();
};
