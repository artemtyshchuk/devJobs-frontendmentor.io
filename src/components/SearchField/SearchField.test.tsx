/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SearchField } from "./SearchField";
import { SearchFieldModal } from "./SearchFieldModal";
import { Provider } from "react-redux";
import { store } from "store";

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

describe("SearchField Component", () => {
  beforeEach(() => {
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "search-field-modal");
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    const portalRoot = document.getElementById("search-field-modal");
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  beforeEach(() => {
    window.matchMedia = mockMatchMedia(false);
  });

  it("should render SearchField with 3 input elements and button to search", () => {
    render(
      <Provider store={store}>
        <SearchField />
      </Provider>
    );

    const searchField = screen.getByTestId("searchField");
    const searchFieldTitleInput = screen.getByTestId("titleInput");
    const searchFieldLocationInput = screen.getByTestId("locationInput");
    const searchFieldCheckbox = screen.getByTestId("fullTimeCheckbox");
    const searchButton = screen.getByTestId("searchButton");

    expect(searchField).toBeInTheDocument();
    expect(searchFieldTitleInput).toBeInTheDocument();
    expect(searchFieldLocationInput).toBeInTheDocument();
    expect(searchFieldCheckbox).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it("should toggle contract type checkbox when clicked", () => {
    render(
      <Provider store={store}>
        <SearchField />
      </Provider>
    );

    const searchFieldCheckbox = screen.getByTestId("fullTimeCheckbox");
    fireEvent.click(searchFieldCheckbox);

    const state = store.getState().searchField.contractType;
    expect(state).toEqual("checked");
  });

  it("should dispatch form data on submit", () => {
    render(
      <Provider store={store}>
        <SearchField />
      </Provider>
    );

    fireEvent.submit(screen.getByTestId("searchField"));

    const stateContractType = store.getState().searchField.contractType;
    const stateFilteredVacancies =
      store.getState().searchField.filteredVacancies;
    const stateModalVacancies = store.getState().searchField.modalVacancies;
    const state = store.getState().filtersModal;

    expect(stateContractType).toBeDefined();
    expect(stateFilteredVacancies).toBeDefined();
    expect(stateModalVacancies).toBeDefined();
    expect(state).toEqual("close");
  });
  it("should update the input values", () => {
    render(
      <Provider store={store}>
        <SearchField />
      </Provider>
    );

    const searchFieldTitleInput = screen.getByTestId("titleInput");
    const searchFieldLocationInput = screen.getByTestId("locationInput");

    fireEvent.change(searchFieldTitleInput, { target: { value: "test" } });
    fireEvent.change(searchFieldLocationInput, { target: { value: "test" } });
    expect(searchFieldTitleInput).toHaveValue("test");
    expect(searchFieldLocationInput).toHaveValue("test");
  });
  it("should render appropriate placeholder text based on screen size", () => {
    window.matchMedia = mockMatchMedia(true);
    render(
      <Provider store={store}>
        <SearchField />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Filter by title...");
    expect(input).toBeInTheDocument();

    window.matchMedia = mockMatchMedia(false); 
    render(
      <Provider store={store}>
        <SearchField />
      </Provider>
    );

    const inputFull = screen.getByPlaceholderText(
      "Filter by title, companies, expertise or benefits"
    );
    expect(inputFull).toBeInTheDocument();
  });
  it("should open filters modal on filter icon click in mobile view", async () => {
    window.matchMedia = mockMatchMedia(true);

    render(
      <Provider store={store}>
        <SearchField />
      </Provider>
    );

    const stateModal = store.getState().filtersModal;
    expect(stateModal).toEqual("close");

    const filterIcon = screen.getByTestId("filterIcon");
    fireEvent.click(filterIcon);

    await waitFor(() => {
      const stateModal2 = store.getState().filtersModal;
      expect(stateModal2).toEqual("open");
    });
  });
  it("should render modal and verify its contents", () => {
    const portalElement = document.getElementById("search-field-modal");

    if (!portalElement) {
      throw new Error("Portal element not found");
    }

    render(
      <Provider store={store}>
        <SearchFieldModal />
      </Provider>,
      { container: portalElement }
    );

    const modalForm = screen.getByTestId("modal");
    expect(modalForm).toBeInTheDocument();

    const modalLocationInput = screen.getByTestId("modal_searchByLocation");
    expect(modalLocationInput).toBeInTheDocument();

    const modalCheckbox = screen.getByTestId("modal_checkboxInput");
    expect(modalCheckbox).toBeInTheDocument();

    fireEvent.click(modalCheckbox);

    const stateContractType = store.getState().searchField.contractType;
    expect(stateContractType).toEqual("non-checked");

    const state = store.getState().filtersModal;
    expect(state).toEqual("open");

    const submitButton = screen.getByTestId("modal_searchButton");
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    const stateFiltersModal = store.getState().filtersModal;
    expect(stateFiltersModal).toEqual("close");
  });
});
