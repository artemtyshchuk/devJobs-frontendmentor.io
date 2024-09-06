import { configureStore } from "@reduxjs/toolkit";
import { filtersModalReducer } from "reduxFolder/searchField-slice";
import { searchFieldReducer } from "reduxFolder/checkBox-slice";

export const store = configureStore({
  reducer: {
    filtersModal: filtersModalReducer,
    searchField: searchFieldReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
