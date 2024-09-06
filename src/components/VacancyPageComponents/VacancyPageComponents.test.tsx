/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from "@testing-library/react";
import { VacancyPage } from "../../pages/VacancyPage";
import { CompanyFooter } from "./CompanyFooter";
import { CompanyHeader } from "./CompanyHeader";
import { VacancyDescription } from "./VacancyDescription";
import userEvent from "@testing-library/user-event";

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (fn: Function) => fn,
  }),
}));

const mockMatchMedia = (matches: boolean) =>
  jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

describe("VacancyPage", () => {
  let setFooterVisibleMock: jest.Mock;

  beforeAll(() => {
    const observeMock = jest.fn();
    const unobserveMock = jest.fn();
  });

  beforeEach(() => {
    global.IntersectionObserver = jest.fn(function (
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      return {
        root: options?.root || null,
        rootMargin: options?.rootMargin || "0px",
        thresholds: Array.isArray(options?.threshold)
          ? options?.threshold
          : [options?.threshold ?? 0], // Ensure thresholds is a readonly number array
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
        takeRecords: jest.fn(),
        callback,
      };
    }) as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();

    setFooterVisibleMock = jest.fn();
  });

  const defaultProps = {
    postedAt: "3 days ago",
    contract: "Full-Time",
    location: "Remote",
    position: "Senior Developer",
    apply: "/apply",
    description: "This is the job description.",
    requirementsContent: "You must have experience in React and Node.js.",
    requirementsItems: ["React", "Node.js", "TypeScript"],
    roleContent: "You will work on our product team.",
    roleItems: ["Develop features", "Fix bugs", "Write tests"],
    setFooterVisible: jest.fn(),
  };

  it("should render Company Header correctly", () => {
    render(<CompanyHeader company="company" website="website" />);

    const companyLogo = screen.getByTestId("companyLogo");
    expect(companyLogo).toBeInTheDocument();

    const companyWebsite = screen.getByTestId("companyWebsite");
    expect(companyWebsite).toBeInTheDocument();

    const headerButton = screen.getByTestId("headerButton");
    expect(headerButton).toBeInTheDocument();

    const companyPropsName = screen.getByText("company");
    expect(companyPropsName).toBeInTheDocument();

    const companyPropsWebsite = screen.getByText("website");
    expect(companyPropsWebsite).toBeInTheDocument();

    const companyHeader = screen.getByTestId("companyHeader");
    expect(companyHeader).toMatchSnapshot();
  });
  it("should render Company Footer correctly on desktop", () => {
    window.matchMedia = mockMatchMedia(false);

    render(<CompanyFooter apply="apply" position="position" />);

    const companyFooter = screen.getByTestId("companyFooter");
    expect(companyFooter).toBeInTheDocument();

    const applyButton = screen.getByTestId("applyButton");
    expect(applyButton).toBeInTheDocument();

    const applyLink = screen.getByTestId("applyLink");
    expect(applyLink).toHaveAttribute("href", "apply");

    const positionTitle = screen.getByText("position");
    expect(positionTitle).toBeInTheDocument();
  });

  it("should hide title and description on mobile screen", () => {
    window.matchMedia = mockMatchMedia(true);

    render(<CompanyFooter apply="apply" position="position" />);

    const vacancyDescriptionTitle = screen.getByTestId(
      "vacancyDescription_title"
    );
    expect(vacancyDescriptionTitle).toHaveStyle("display: none");
  });

  test("renders all main text elements", () => {
    render(<VacancyDescription {...defaultProps} />);

    expect(screen.getByText(/3 days ago/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Senior Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Remote/i)).toBeInTheDocument();

    expect(
      screen.getByText(/This is the job description/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/You must have experience in React and Node.js./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();

    expect(
      screen.getByText(/You will work on our product team/i)
    ).toBeInTheDocument();
  });

  test("renders the apply button with correct behavior", () => {
    render(<VacancyDescription {...defaultProps} />);

    const applyButton = screen.getByText(/apply now/i);
    expect(applyButton).toBeInTheDocument();

    const applyLink = screen.getByRole("link", { name: /apply now/i });
    expect(applyLink).toHaveAttribute("href", "/apply");

    userEvent.hover(applyButton);
    userEvent.unhover(applyButton);
    userEvent.click(applyButton);
  });

  test("calls setFooterVisible when intersection changes", () => {
    const mockSetFooterVisible = jest.fn();
    render(
      <VacancyDescription
        {...defaultProps}
        setFooterVisible={mockSetFooterVisible}
      />
    );

    const observerInstance = (global.IntersectionObserver as jest.Mock).mock
      .calls[0][0];

    observerInstance([{ isIntersecting: false }]);
    expect(mockSetFooterVisible).toHaveBeenCalledWith(true);

    observerInstance([{ isIntersecting: true }]);
    expect(mockSetFooterVisible).toHaveBeenCalledWith(false);
  });
});
