import { Product } from "../../interfaces/product";
import { Card } from "../Card/Card";

interface InfiniteScrollProps {
  limit: number;
  items: Product[];
  isLoading: boolean;
  loadMore: (skip: number, limit: number) => void;
  hasMore: boolean;
}

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const { isLoading, hasMore, items } = props;

  return (
    <div>
      {items.map((item, index) => (
        <Card
          src={""}
          alt={item.title}
          name={item.title}
          price={item.price}
          key={item.id}
        />
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
