import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./slices/emailSlice";

export const store = configureStore({
  reducer: {
    email: emailSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
