import { Product } from "./product";

export interface LimitedProductData {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
}
