import { LimitedProductData } from "../interfaces/response";

export const isLimitedProductData = (
  data: LimitedProductData,
): data is LimitedProductData => {
  return (
    data &&
    Array.isArray(data.products) &&
    typeof data.limit === "number" &&
    typeof data.skip === "number" &&
    typeof data.total === "number"
  );
};
