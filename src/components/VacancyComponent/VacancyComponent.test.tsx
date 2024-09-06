import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { VacancyComponent } from "./VacancyComponent";
import { VacancyType } from "types";
import { MemoryRouter } from "react-router";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("VacancyComponent", () => {
  const vacancy: VacancyType = {
    id: 1,
    company: "Company A",
    logo: "/path/to/logo.png",
    logoBackground: "#000000",
    position: "Test position",
    postedAt: "2d ago",
    contract: "Full Time",
    location: "New York",
    website: "testing.com",
    apply: "testing.com/apply",
    description: "Test description",
    requirements: {
      content: "Test content",
      items: [],
    },
    role: {
      content: "Test content",
      items: [],
    },
  };

  it("should render VacancyComponent", () => {
    render(
      <MemoryRouter>
        <VacancyComponent {...vacancy} />
      </MemoryRouter>
    );

    const vacancyCard = screen.getByTestId("vacancyCard");
    expect(vacancyCard).toBeInTheDocument();
  });
  it("should render vacancy details correctly", () => {
    render(
      <MemoryRouter>
        <VacancyComponent {...vacancy} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test position")).toBeInTheDocument();
    expect(screen.getByText("Company A")).toBeInTheDocument();
    expect(screen.getByText("2d ago")).toBeInTheDocument();
    expect(screen.getByText("Full Time")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByAltText("company logo")).toHaveAttribute(
      "src",
      "/path/to/logo.png"
    );
  });
  it("should trigger exit animation on card click", async () => {
    render(
      <MemoryRouter>
        <VacancyComponent {...vacancy} />
      </MemoryRouter>
    );

    const card = screen.getByTestId("vacancyCard");
    fireEvent.click(card);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/section/1");
    });
  });
});
