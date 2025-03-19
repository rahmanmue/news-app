import { Article } from "@/types/Article";
import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteLoading(
  loadMore: () => void,
  data: Article[],
  totalResults: number
) {
  const [isloadingInfinte, setIsLoadingInfinite] = useState(false);
  const loader = useRef(null);
  const handleObserver = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting && data.length <= totalResults) {
        loadMore();
      }
    },
    [data.length, loadMore, totalResults]
  );

  useEffect(() => {
    setIsLoadingInfinite(true);
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loader.current) {
      observer.observe(loader.current);
      setIsLoadingInfinite(false);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (loader.current) observer.unobserve(loader.current);
      observer.disconnect();
      setIsLoadingInfinite(true);
    };
  }, [handleObserver]);

  return { loader, isloadingInfinte };
}
