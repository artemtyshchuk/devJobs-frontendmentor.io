// SearchField.test.tsx
import "./matchMedia.mock"; // Импортируем mock перед компонентом
import { render, screen } from "@testing-library/react";
import { SearchField } from "./SearchField";

describe("SearchField", () => {
  it("should render SearchField", () => {
    render(<SearchField />);

    const searchField = screen.getByTestId("searchField");
    expect(searchField).toBeInTheDocument();
  });
});
