/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Для тестирования Link компонента
import { Header } from "./Header";

const renderWithRouter = (ui: JSX.Element) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Header Component", () => {
  test("renders Header component", () => {
    renderWithRouter(<Header />);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders LogoIcon", () => {
    renderWithRouter(<Header />);
    const logo = screen.getByTestId("header").querySelector("svg");
    expect(logo).toBeInTheDocument();
  });

  test("renders ThemeSwitcher component", () => {
    renderWithRouter(<Header />);
    const themeSwitcher = screen
      .getByTestId("header")
      .querySelector("div[class*='themeSwitcherWrapper']");
    expect(themeSwitcher).toBeInTheDocument();
  });

  test("contains a link to the home page", () => {
    renderWithRouter(<Header />);
    const linkElement = screen.getByRole("link", { name: /logo/i });
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
