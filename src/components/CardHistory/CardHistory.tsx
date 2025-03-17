import { Article } from "@/types/Article";
import { formattedDate } from "@/utils/formattedDate";

type CardHistoryProps = {
  article: Article;
  index: number;
  deleteHistory: (article: Article) => void;
};
const CardHistory = ({ deleteHistory, article, index }: CardHistoryProps) => {
  return (
    <div
      key={index}
      className="flex items-center justify-between bg-gray-50 rounded-md "
    >
      <div className="flex gap-8">
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
      <div className="flex justify-center w-1/3 ">
        <button
          onClick={() => deleteHistory(article)}
          className="cursor-pointer text-2xl text-red-800 "
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CardHistory;
