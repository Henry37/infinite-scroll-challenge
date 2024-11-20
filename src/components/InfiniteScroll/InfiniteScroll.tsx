import { useEffect, useRef, useCallback } from "react";
import { Product } from "../../interfaces/product";
import { Card } from "../Card/Card";
import styles from "./InfiniteScroll.module.css";

interface InfiniteScrollProps {
  limit: number;
  items: Product[];
  isLoading: boolean;
  loadMore: (skip: number, limit: number) => void;
  hasMore: boolean;
}

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const { limit, isLoading, hasMore, items, loadMore } = props;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && hasMore) {
        loadMore(items.length, limit);
      }
    },
    [isLoading, hasMore, items.length, limit, loadMore],
  );

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
    <div>
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
    </div>
  );
};

export default InfiniteScroll;
