import { configureStore } from "@reduxjs/toolkit";
import { filtersModalReducer } from "reduxFolder/searchField-slice";

export const store = configureStore({
  reducer: {
    filtersModal: filtersModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
