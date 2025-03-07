import useGetHistory from "@/hooks/useGetHistory";
import CardHistory from "../CardHistory/CardHistory";

const HistoryNews = () => {
  const { dataHistory } = useGetHistory();

  return (
    <>
      <title>History News</title>
      <div className="mt-6 p-2 max-w-6xl mx-auto">
        <h3 className="text-xl font-bold mb-4">My History News:</h3>
        <div className="flex gap-2 flex-col">
          {dataHistory.length > 0 ? (
            dataHistory.map((article, index) => (
              <CardHistory article={article} index={index} />
            ))
          ) : (
            <div className="text-lg font-semibold text-center mt-8">
              Data is empty
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryNews;
