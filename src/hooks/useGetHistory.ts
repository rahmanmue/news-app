import { Article } from "@/types/Article";
import { useEffect, useState } from "react";

export default function useGetHistory() {
  const [dataHistory, setClickedHistory] = useState<Article[]>([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("newsHistory") as string) || [];
    setClickedHistory(storedHistory);
  }, []);

  const handleNewsClick = (article: Article) => {
    const check = dataHistory.find((h) => h.title == article.title);
    if (!check) {
      const newHistory = [...dataHistory, article];
      setClickedHistory(newHistory);
      localStorage.setItem("newsHistory", JSON.stringify(newHistory));
    }
    window.open(article.url, "_blank");
  };

  return { dataHistory, handleNewsClick };
}
