import { render, screen } from "@testing-library/react";
import App from "./App";
import { useApp } from "./useApp";

jest.mock("./useApp");
jest.mock("./data/PaginatedDataFetcher");

const mockUseApp = useApp as jest.MockedFunction<typeof useApp>;

describe("App", () => {
  beforeEach(() => {
    mockUseApp.mockReturnValue({
      products: [],
      isLoading: false,
      hasMore: true,
      loadMore: jest.fn(),
    });
  });

  it("should render Nav component", () => {
    render(<App />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render HeroBanner component", () => {
    render(<App />);
    expect(screen.getByText("Your workspace.")).toBeInTheDocument();
  });

  it("should render Our products text", () => {
    render(<App />);
    expect(screen.getByText("Our products.")).toBeInTheDocument();
  });

  it("should render InfiniteScroll component with products when available", () => {
    const products = [
      { id: 1, title: "Title 1", price: 10, thumbnail: "thumb1.jpg" },
      { id: 2, title: "Title 2", price: 20, thumbnail: "thumb2.jpg" },
    ];
    mockUseApp.mockReturnValueOnce({
      products,
      isLoading: false,
      hasMore: true,
      loadMore: jest.fn(),
    });
    render(<App />);
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
  });
});

