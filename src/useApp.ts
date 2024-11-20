import { useState } from "react";
import { PRODUCT_PATH, SELECT_PARAMS } from "./constants/urls";
import { isLimitedProductData } from "./guards/responseGuard";
import { Product } from "./interfaces/product";
import { LimitedProductData } from "./interfaces/response";
import { PaginatedDataFetcher } from "./data/PaginatedDataFetcher";

export const useApp = (dataFetcher: PaginatedDataFetcher) => {
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
  return { products, isLoading, hasMore, loadMore };
};
