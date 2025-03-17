import { Article } from "@/types/Article";
import { useEffect, useState } from "react";

export default function useGetNews({
  query = "",
  sortBy = "publishedAt",
  category = "general",
  page = 0,
  pageSize = 20,
  triggerFetch = false,
}) {
  const dataHistory = JSON.parse(localStorage.getItem("newsHistory") as string);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const baseAPI = `${API_URL}/top-headlines?q=${query}&country=us&sortBy=${sortBy}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(baseAPI);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result.articles);

        setData(result.articles || []);
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, triggerFetch]);

  const newData = data.map(
    ({ title, author, description, url, urlToImage, publishedAt }) => {
      if (dataHistory.some((el: Article) => el.title == title)) {
        return {
          title,
          author,
          description,
          url,
          urlToImage,
          publishedAt,
          isOpen: true,
        };
      }
      return {
        title,
        author,
        description,
        url,
        urlToImage,
        publishedAt,
        isOpen: false,
      };
    }
  );

  return { data: newData, loading, error };
}
