// api.js

const API_KEY = import.meta.env.VITE_NEWS_API;
const BASE_URL = "https://newsapi.org/v2";

export async function fetchCategoryNews(query: string) {
  const response = await fetch(
    `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
