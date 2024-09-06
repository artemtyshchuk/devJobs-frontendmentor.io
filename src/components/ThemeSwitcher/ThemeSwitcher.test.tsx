import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const mockGetItem = jest.spyOn(Storage.prototype, "getItem");

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    mockGetItem.mockClear();
  });

  it("should render", () => {
    render(<ThemeSwitcher />);

    const themeSwitcher = screen.getByTestId("themeSwitcher");
    expect(themeSwitcher).toBeInTheDocument();
  });
  it("should apply the dark theme if theme in localStorage is dark", () => {
    mockGetItem.mockReturnValue("dark");

    render(<ThemeSwitcher />);

    expect(document.body.getAttribute("data-theme")).toBe("dark");
  });
  it("should apply the light theme if theme in localStorage is light", () => {
    mockGetItem.mockReturnValue("light");

    render(<ThemeSwitcher />);

    expect(document.body.getAttribute("data-theme")).toBe("light");
  });
  it("should toggle theme on checkbox click", () => {
    mockGetItem.mockReturnValue("light");
    render(<ThemeSwitcher />);

    const themeSwitcher = screen.getByTestId("checkbox");
    expect(document.body.getAttribute("data-theme")).toBe("light");

    fireEvent.click(themeSwitcher);
    expect(document.body.getAttribute("data-theme")).toBe("dark");

    fireEvent.click(themeSwitcher);
    expect(document.body.getAttribute("data-theme")).toBe("light");
  });
});
