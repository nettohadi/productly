import { render, screen } from "@testing-library/react";
import FirstTask from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

let mockUseQueryValue = {};

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(() => mockUseQueryValue),
}));

const WrappedFirstTask = () => (
  <QueryClientProvider client={queryClient}>
    <FirstTask />
  </QueryClientProvider>
);

describe("FirstTask component", () => {
  it("displays loading component when data is being fetched", () => {
    mockUseQueryValue = {
      isLoading: true,
      isError: false,
      data: null,
      error: null,
    };
    render(<WrappedFirstTask />);
    expect(screen.getByText("Loading Data ...")).toBeTruthy();
  });

  it("displays error message when there is an error fetching data", () => {
    mockUseQueryValue = {
      isLoading: false,
      isError: true,
      data: null,
      error: { message: "Network error" },
    };
    render(<WrappedFirstTask />);
    expect(screen.getByText("Error: Network error")).toBeTruthy();
  });

  it("displays products after successful data fetch", () => {
    mockUseQueryValue = {
      isLoading: false,
      isError: false,
      data: {
        products: [
          { id: "1", name: "Product Name", description: "Product description" },
        ],
      },
      error: null,
    };
    render(<WrappedFirstTask />);
    expect(screen.getByText("Product Name")).toBeTruthy();
  });
});
