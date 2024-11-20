import { renderHook, act, waitFor } from "@testing-library/react";
import { useApp } from "./useApp";
import { PaginatedDataFetcher } from "./data/PaginatedDataFetcher";
import { LimitedProductData } from "./interfaces/response";

jest.mock("./data/PaginatedDataFetcher");

describe("useApp", () => {
  let dataFetcher: PaginatedDataFetcher;
  const mockData: LimitedProductData = {
    products: [{
      id: 1, title: "Product 1",
      price: 0,
      thumbnail: ""
    }],
    limit: 0,
    skip: 0,
    total: 0
  };

  beforeEach(() => {
    dataFetcher = new PaginatedDataFetcher('https://api.example.com');
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useApp(dataFetcher));
    expect(result.current.products).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasMore).toBe(true);
  });

  it("should fetch and append products", async () => {
    dataFetcher.fetchPaginatedData = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useApp(dataFetcher));

    act(() => {
      result.current.loadMore(0, 1);
    });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.products).toEqual(mockData.products);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasMore).toBe(true);
  });

  it("should handle fetch errors", async () => {
    dataFetcher.fetchPaginatedData = jest.fn().mockRejectedValue(new Error("Fetch error"));
    const { result } = renderHook(() => useApp(dataFetcher));

    act(() => {
      result.current.loadMore(0, 1);
    });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.products).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasMore).toBe(false);
  });

  it("should set hasMore to false if fetched products are less than limit", async () => {
    dataFetcher.fetchPaginatedData = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useApp(dataFetcher));

    act(() => {
      result.current.loadMore(0, 2);
    });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.products).toEqual(mockData.products);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasMore).toBe(false);
  });

  it("should throw an error if data is not of type LimitedProductData", async () => {
    const invalidData = { invalid: "data" };
    dataFetcher.fetchPaginatedData = jest.fn().mockResolvedValue(invalidData);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useApp(dataFetcher));

    act(() => {
      result.current.loadMore(0, 2);
    });

    await waitFor(() => !result.current.isLoading);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));
    expect(result.current.hasMore).toBe(false);

    consoleErrorSpy.mockRestore();
  });
});