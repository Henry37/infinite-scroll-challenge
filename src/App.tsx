import { useState } from "react";
import "./App.css";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";
import { Product } from "./interfaces/product";
import { PaginatedDataFetcher } from "./data/PaginatedDataFetcher";
import { BASE_URL, PRODUCT_PATH, SELECT_PARAMS } from "./constants/urls";
import {
  DEFAULT_SCROLL_AUTOLOAD,
  DEFAULT_SCROLL_LIMIT,
} from "./constants/infinitScroll";
import { LimitedProductData } from "./interfaces/response";
import { isLimitedProductData } from "./guards/responseGuard";
import Nav from "./components/Nav/Nav";
import HeroBanner from "./components/HeroBanner/HeroBanner";

const dataFetcher = new PaginatedDataFetcher(BASE_URL);

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMore = async (skip: number, limit: number) => {
    setIsLoading(true);
    try {
      const data = await dataFetcher.fetchPaginatedData<LimitedProductData>(
        PRODUCT_PATH,
        limit,
        skip,
        SELECT_PARAMS,
      );

      if (!isLimitedProductData(data)) {
        throw new Error("Data is not of type LimitedProductData");
      }

      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setHasMore(data.products.length >= limit);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <main className="flex flex-col grow">
        <HeroBanner />
        <section className="px-20 py-12 bg-gray-100">
          <h2 className="text-3xl font-semibold text-black">Our products.</h2>
          <InfiniteScroll
            autoLoad={DEFAULT_SCROLL_AUTOLOAD}
            limit={DEFAULT_SCROLL_LIMIT}
            items={products}
            isLoading={isLoading}
            loadMore={loadMore}
            hasMore={hasMore}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
