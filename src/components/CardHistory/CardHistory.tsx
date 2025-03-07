import { Article } from "@/types/Article";
import { formattedDate } from "@/utils/formattedDate";

type CardHistoryProps = {
  article: Article;
  index: number;
};
const CardHistory = ({ article, index }: CardHistoryProps) => {
  return (
    <div key={index} className="flex items-center gap-5 bg-gray-50 rounded-md ">
      <img src={article.urlToImage} alt={article.title} className="w-1/4 " />
      <div className="flex flex-col gap-2 my-2">
        <p className="text-xs font-semibold">{article.author}</p>
        <h2 className="text-md font-bold">{article.title}</h2>
        <p className="text-xs font-semibold">
          {formattedDate(article.publishedAt)}
        </p>

        <a href={article.url} className="text-blue-400 text-xs font-semibold">
          Link Berita
        </a>
      </div>
    </div>
  );
};

export default CardHistory;
