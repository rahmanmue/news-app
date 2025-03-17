import { formattedDate } from "@/utils/formattedDate";
import { Article } from "@/types/Article";

type CardNewsProps = {
  article: Article;
  index: number;
  newsClick: (article: Article) => void;
};

const CardNews = ({ article, index, newsClick }: CardNewsProps) => {
  const isLarge = (index: number) => (index + 1) % 10 == 1 || index % 10 == 7;

  return (
    <div
      key={index}
      onClick={() => newsClick(article)}
      className={`rounded-lg flex flex-col gap-4 p-2
               ${isLarge(index) ? "lg:col-span-2 lg:row-span-2" : ""}
               ${article.isOpen ? "bg-yellow-400" : ""}
               ${index % 2 != 0 ? "bg-red-300" : ""}
          `}
    >
      <img
        src={article.urlToImage}
        alt={article.title}
        className={`
              w-full h-full object-cover rounded-lg cursor-pointer
               ${index % 10 == 7 ? "lg:order-last" : ""}
              `}
      ></img>

      <div
        className={`
            flex flex-col w-full gap-1  cursor-pointer  
            `}
      >
        <p
          className={`text-black 
              ${
                isLarge(index)
                  ? "lg:text-md font-semibold"
                  : "lg:text-xs font-semibold"
              }
              `}
        >
          {article.author}.
        </p>
        <h2 className={`w-full text-black lg:text-md font-bold`}>
          {article.title}
        </h2>
        <p
          className={`text-black 
              ${
                isLarge(index)
                  ? "lg:text-md font-semibold"
                  : "lg:text-xs font-semibold"
              }
              `}
        >
          {formattedDate(article.publishedAt)}
        </p>
      </div>
    </div>
  );
};

export default CardNews;
