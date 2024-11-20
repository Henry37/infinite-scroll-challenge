import { useState } from "react";
import "./App.css";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";
import { Product } from "./interfaces/product";
import { PaginatedDataFetcher } from "./data/PaginatedDataFetcher";
import { BASE_URL, PRODUCT_PATH, SELECT_PARAMS } from "./contants/urls";
import { INITIAL_SCROLL_LIMIT } from "./contants/infinitScroll";
import { LimitedProductData } from "./interfaces/response";
import { isLimitedProductData } from "./guards/responseGuard";

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
        SELECT_PARAMS
      );

      if (!isLimitedProductData(data)) {
        throw new Error('Data is not of type LimitedProductData');
      }

      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setHasMore(data.products.length >= limit);
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <nav className="absolute top-0 left-0 flex items-center justify-between w-full px-20 pt-4">
        <a className="text-white font-normal">Function</a>
        <a className="text-white font-normal">Collection</a>
        <a className="text-white font-normal">Configuration</a>
        <a className="text-white font-normal">About</a>
      </nav>
      <main className="flex flex-col grow">
        <section
          style={{
            backgroundImage: "url('/hero-image.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="h-screen pt-32 pl-20"
        >
          <h1>
            <span className="block">Your workspace.</span>
            <span className="block">Reinvented.</span>
          </h1>
        </section>
        <section className="px-20 py-12 bg-gray-100">
          <h2 className="text-3xl font-semibold text-black">Our products.</h2>
          <div className="pt-8 flex gap-4 flex-wrap">
            <InfiniteScroll
              limit={INITIAL_SCROLL_LIMIT}
              items={products}
              isLoading={isLoading}
              loadMore={loadMore}
              hasMore={hasMore}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
