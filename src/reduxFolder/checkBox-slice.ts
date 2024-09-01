import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ContractType = "checked" | "non-checked";

export interface Vacancy {
  searchByTitle?: string;
  searchByLocation?: string;
}

interface SearchFieldState {
  contractType: ContractType;
  filteredVacancies: Vacancy;
  modalVacancies?: Vacancy;
}

const initialState: SearchFieldState = {
  contractType: "non-checked",
  filteredVacancies: {},
  modalVacancies: {},
};

const searchFieldSlice = createSlice({
  name: "searchField",
  initialState,
  reducers: {
    setContractTypeCheckbox: (state, action: PayloadAction<ContractType>) => {
      state.contractType = action.payload;
      console.log("state.contractType", state.contractType);
    },
    setFilteredVacancies: (state, action: PayloadAction<Vacancy>) => {
      state.filteredVacancies = action.payload;
      console.log("state.filteredVacancies", state.filteredVacancies);
    },
    setModalData: (state, action: PayloadAction<Vacancy>) => {
      state.modalVacancies = action.payload;
      console.log("state.modalVacancies", state.modalVacancies);
    },
  },
});

export const { setContractTypeCheckbox, setFilteredVacancies, setModalData } =
  searchFieldSlice.actions;
export const searchFieldReducer = searchFieldSlice.reducer;
