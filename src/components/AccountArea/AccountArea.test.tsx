import { render, screen } from "@testing-library/react";
import AccountArea from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

let mockUseQueryValue = {};

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(() => mockUseQueryValue),
}));

const WrappedAccountArea = () => (
  <QueryClientProvider client={queryClient}>
    <AccountArea />
  </QueryClientProvider>
);

describe("AccountArea component", () => {
  it("displays loading component when data is being fetched", () => {
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
});
