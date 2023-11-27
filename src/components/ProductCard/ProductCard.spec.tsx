import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from ".";

describe("ProductCard component", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    description: "Test Description",
  };

  it("renders product information", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeTruthy();
    expect(screen.getByAltText("Test Product")).toBeTruthy();
  });

  it("toggles product description visibility", () => {
    render(<ProductCard product={mockProduct} />);

    const toggleButton = screen.getByTestId("description-toggler");
    expect(toggleButton.innerHTML.trim()).toBe("⬇️ Show Description");

    fireEvent.click(toggleButton);

    expect(screen.getByText("Test Description")).toBeTruthy();
    expect(toggleButton.innerHTML.trim()).toBe("⬆️ Hide Description");
  });
});
