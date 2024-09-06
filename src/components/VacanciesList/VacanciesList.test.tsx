import { fireEvent, render, screen } from "@testing-library/react";
import { VacanciesList } from "./VacanciesList";
import { useFilter } from "hooks/useFilter";
import { MemoryRouter } from "react-router-dom";

jest.mock("hooks/useFilter");

describe("VacanciesList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render VacanciesList", () => {
    (useFilter as jest.Mock).mockReturnValue({
      vacanciesList: [],
    });

    render(<VacanciesList />);
    const vacanciesList = screen.getByTestId("vacanciesList");
    expect(vacanciesList).toBeInTheDocument();
  });
  it("should render no vacancies found if vacanciesList is empty", () => {
    (useFilter as jest.Mock).mockReturnValue({
      vacanciesList: [],
    });

    render(<VacanciesList />);

    const noVacanciesFound = screen.getByTestId("noVacanciesFound");
    expect(noVacanciesFound).toBeInTheDocument();
  });
  it("should render vacancies if vacanciesList is not empty", () => {
    const mockVacancies = [
      { id: 1, title: "vacancy1", company: "Company A" },
      { id: 2, title: "vacancy2", company: "Company B" },
    ];

    (useFilter as jest.Mock).mockReturnValue({
      vacanciesList: mockVacancies,
    });

    render(
      <MemoryRouter>
        <VacanciesList />
      </MemoryRouter>
    );

    const vacancyComponents = screen.getAllByTestId("vacancyComponent");
    expect(vacancyComponents.length).toBe(mockVacancies.length);
  });
  it("should hide 'Load more' button when all vacancies are loaded", () => {
    const mockVacancies = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Vacancy ${i + 1}`,
      company: `Company ${i + 1}`,
    }));

    (useFilter as jest.Mock).mockReturnValue({
      vacanciesList: mockVacancies,
    });

    render(
      <MemoryRouter>
        <VacanciesList />
      </MemoryRouter>
    );
    
    const loadMoreButton = screen.getByText("Load more");

    fireEvent.click(loadMoreButton);
    expect(loadMoreButton).not.toBeInTheDocument();
  });
});
