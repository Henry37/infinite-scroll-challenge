import { useState, useRef, useCallback, useEffect } from "react";
import { InfiniteScrollProps } from "./InfiniteScroll";

export const useInfiniteScroll = (props: InfiniteScrollProps) => {
  const { autoLoad, limit, isLoading, hasMore, items, loadMore } = props;
  const [loadTimes, setLoadTimes] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const showButton = loadTimes >= autoLoad && !isLoading && hasMore;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        loadTimes < autoLoad &&
        target.isIntersecting &&
        !isLoading &&
        hasMore
      ) {
        loadMore(items.length, limit);
        setLoadTimes(loadTimes + 1);
      }
    },
    [loadTimes, autoLoad, isLoading, hasMore, loadMore, items.length, limit],
  );

  const handleButtonClick = () => {
    setLoadTimes(loadTimes + 1);
    loadMore(items.length, limit);
  };

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

  return {
    showButton,
    loadMoreRef,
    handleButtonClick,
  };
};
