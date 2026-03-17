import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./slices/emailSlice";
import commentSlice from "./slices/commentSlice";
import searchSlice from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    email: emailSlice,
    comment: commentSlice,
    search: searchSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
