import { render, screen } from "@testing-library/react";
import { NotFound } from "./NotFound";

describe("NotFound", () => {
  it("should render NotFound", () => {
    render(<NotFound />);

    const notFoundComponent = screen.getByTestId("notFoundComponent");
    const notFoundImage = screen.getByTestId("notFoundImage");
    const notFoundText = screen.getByTestId("notFoundText");

    expect(notFoundComponent).toBeInTheDocument();
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundText).toBeInTheDocument();
  });
});
