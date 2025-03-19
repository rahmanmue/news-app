import useGetHistory from "@/hooks/useGetHistory";
import useGetNews from "@/hooks/useGetNews";
import { useCallback, useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import CardNews from "../CardNews/CardNews";
import { Link } from "react-router-dom";
import { useInfiniteLoading } from "@/hooks/useInfiniteLoading";

const News = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [category, setCategory] = useState("general");
  const [isFetch, setIsFetch] = useState(false);
  const [page, setPage] = useState(1);
  const { data, totalResults, loading, error } = useGetNews({
    query,
    category,
    sortBy,
    page,
    isFetch,
  });

  const { handleNewsClick } = useGetHistory();

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const { loader, isloadingInfinte } = useInfiniteLoading(
    loadMore,
    data,
    totalResults
  );

  return (
    <>
      <title>News</title>
      <div className="p-2 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 lg:grid-rows-1 grid-cols-2 grid-rows-3 gap-3 justify-items-center my-6">
          <input
            type="text"
            placeholder="Search news..."
            className="w-full col-span-2 p-2 border rounded-md"
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" selected disabled>
              Choose Category
            </option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="" selected disabled>
              Sort By
            </option>
            <option value="popularity">Popularity</option>
            <option value="publishedAt">Latest</option>
            <option value="relevancy">Relevancy</option>
          </select>
          <button
            type="button"
            onClick={() => setIsFetch(!isFetch)}
            className="block bg-black col-span-2 lg:col-span-1 text-white cursor-pointer font-semibold rounded w-full focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>

        <Link
          to="/history"
          className="block ms-auto bg-gray-300 p-2 lg:w-1/10 w-1/3 text-center rounded mb-6 font-semibold cursor-pointer"
        >
          My History
        </Link>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-4 lg:grid-rows-4 gap-4 md:grid-cols-2 grid-cols-1 grid-rows-10">
          {loading ? (
            <Skeleton />
          ) : (
            data.length > 0 && (
              <>
                {data.map((article, index) => (
                  <CardNews
                    article={article}
                    key={index}
                    index={index}
                    newsClick={handleNewsClick}
                  />
                ))}
              </>
            )
          )}
        </div>

        {error ? (
          <div className="text-lg font-semibold text-center">
            Error : {error} ...
          </div>
        ) : (
          ""
        )}

        {/* Pagination */}
        {/* <div className="flex gap-1 my-4 justify-end">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 text-white bg-black shadow-md rounded-full font-bold cursor-pointer disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="px-4 py-2 font-bold">{page}</span>
          <button
            disabled={data.length < 9}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 text-white bg-black shadow-md rounded-full font-bold cursor-pointer disabled:opacity-50"
          >
            &gt;
          </button>
        </div> */}

        <div className="flex justify-center mt-4" ref={loader}>
          {isloadingInfinte ? (
            <span className="block p-2 bg-gray-300 text-black rounded-md">
              Load More..
            </span>
          ) : (
            <span className="block p-2 bg-blue-300 text-white rounded-md">
              Data Completed!
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
