import { render, screen } from "@testing-library/react";
import AccountArea from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

const queryClient = new QueryClient();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

let mockUseQueryValue = {};

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(() => mockUseQueryValue),
}));

const WrappedAccountArea = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <AccountArea />
    </Router>
  </QueryClientProvider>
);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

beforeEach(() => {
  mockNavigate.mockClear();
  jest.clearAllMocks();
  localStorage.setItem("productly", token);
});

describe("AccountArea component", () => {
  it("displays loading component when data is being fetched", async () => {
    mockUseQueryValue = {
      isLoading: true,
      isError: false,
      data: null,
      error: null,
    };

    render(<WrappedAccountArea />);

    expect(screen.getByText("Loading Data ...")).toBeTruthy();
  });

  it("displays error message when there is an error fetching data", () => {
    mockUseQueryValue = {
      isLoading: false,
      isError: true,
      data: null,
      error: { message: "error" },
    };

    render(<WrappedAccountArea />);

    expect(screen.getByText("Error: error")).toBeTruthy();
  });

  it("displays products after successful data fetch", () => {
    mockUseQueryValue = {
      isLoading: false,
      isError: false,
      data: {
        products: [
          {
            id: "1",
            name: "Product Name",
            description: "Product description",
          },
        ],
      },
      error: null,
    };

    render(<WrappedAccountArea />);

    expect(screen.getByText("Product Name")).toBeTruthy();
  });

  it("redirects to login if no JWT token is present", () => {
    // Clear local storage or mock useValidJwt to return no token
    localStorage.removeItem("productly"); // or mock useValidJwt accordingly

    render(<WrappedAccountArea />);
    expect(mockNavigate).toHaveBeenCalledWith("login");
  });

  it("progress bar shows correct width based on number of products", () => {
    mockUseQueryValue = {
      isLoading: false,
      isError: false,
      data: { products: new Array(30) }, // Mock 30 products
      error: null,
    };

    render(<WrappedAccountArea />);

    const progressBar = screen.getByText("Progress Bar");
    expect(progressBar).toHaveStyle("width: 50%"); // 30 out of 60 products is 50%
  });
});
