import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type filtersModal = "open" | "close";

const filtersModalSlice = createSlice({
  name: "@@filtersModal",
  initialState: "close" as filtersModal,
  reducers: {
    openFiltersModal: (state, action: PayloadAction<filtersModal>) => {
      return action.payload;
    },
    closeFiltersModal: (state, action: PayloadAction<filtersModal>) => {
      return action.payload;
    },
  },
});

export const { openFiltersModal, closeFiltersModal } =
  filtersModalSlice.actions;

export const filtersModalReducer = filtersModalSlice.reducer;

