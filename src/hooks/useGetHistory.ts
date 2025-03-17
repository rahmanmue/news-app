import { Article } from "@/types/Article";
import { useEffect, useState } from "react";

export default function useGetHistory() {
  const [dataHistory, setClickedHistory] = useState<Article[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("newsHistory") as string) || [];
    setClickedHistory(storedHistory);
  }, [triggerFetch]);

  const handleNewsClick = (article: Article) => {
    const check = dataHistory.find((h) => h.title == article.title);
    if (!check) {
      const newHistory = [...dataHistory, article];
      setClickedHistory(newHistory);
      localStorage.setItem("newsHistory", JSON.stringify(newHistory));
    }
    window.open(article.url, "_blank");
  };

  const deleteNewsHistory = (article: Article) => {
    setTriggerFetch(!triggerFetch);
    const newsHistory = dataHistory.filter(
      ({ title }) => article.title !== title
    );
    localStorage.setItem("newsHistory", JSON.stringify(newsHistory));
  };

  return { dataHistory, handleNewsClick, deleteNewsHistory };
}
