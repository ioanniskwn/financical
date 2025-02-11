export interface News {
  title: string;
  description?: string;
  url: string;
  urlToImage: string | null;
  author: string; // ✅ Ensure author is always a string
  content: string; // ✅ Ensure content exists
  publishedAt: string; // ✅ Ensure published date is present
}
