export type Article = {
  source?: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string | Date | number;
  content?: string;
  isOpen?: boolean;
};
