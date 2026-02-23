export type CategoryDTO = {
  id: string;
  name: string;
  slug: string;
  _count?: {
    articles: number;
  };
  createdAt: Date;
  updatedAt: Date;
};
