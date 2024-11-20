import "./App.css";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";
import { PaginatedDataFetcher } from "./data/PaginatedDataFetcher";
import { BASE_URL } from "./constants/urls";
import {
  DEFAULT_SCROLL_AUTOLOAD,
  DEFAULT_SCROLL_LIMIT,
} from "./constants/infinitScroll";
import Nav from "./components/Nav/Nav";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import { useApp } from "./useApp";

const dataFetcher = new PaginatedDataFetcher(BASE_URL);

function App() {
  const { products, isLoading, hasMore, loadMore } = useApp(dataFetcher);

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
