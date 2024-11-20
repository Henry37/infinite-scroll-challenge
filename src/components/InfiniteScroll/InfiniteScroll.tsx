import { useEffect, useRef, useCallback, useState } from "react";
import { Product } from "../../interfaces/product";
import { Card } from "../Card/Card";
import styles from "./InfiniteScroll.module.css";

interface InfiniteScrollProps {
  autoLoad: number;
  limit: number;
  items: Product[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: (skip: number, limit: number) => void;
}

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const { autoLoad, limit, isLoading, hasMore, items, loadMore } = props;
  const [loadTimes, setLoadTimes] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const showButton = loadTimes >= autoLoad && !isLoading && hasMore;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (loadTimes < autoLoad && target.isIntersecting && !isLoading && hasMore) {
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

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
        {items.map((item) => (
          <Card
            src={item.thumbnail}
            alt={item.title}
            name={item.title}
            price={item.price}
            key={item.id}
          />
        ))}
      </div>
      <div ref={loadMoreRef} />
      {isLoading && (
        <div className="my-8 flex items-center justify-center">
          <div className={styles.loader} />
        </div>
      )}
      {!hasMore && (
        <div className="my-8 flex items-center justify-center">
          <p className="text-gray-500">End of the product list</p>
        </div>
      )}
      { showButton && (
        <div className="my-8 flex items-center justify-center">
          <button
            onClick={handleButtonClick}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
