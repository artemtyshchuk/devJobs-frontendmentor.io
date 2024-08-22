import { render, screen } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
  it("should render Container with children", () => {
    render(<Container children={<p>Hello Container</p>} />);

    expect(screen.getByText("Hello Container")).toBeInTheDocument();
    expect(screen.getByTestId("headerImage")).toMatchSnapshot();
  });
});
