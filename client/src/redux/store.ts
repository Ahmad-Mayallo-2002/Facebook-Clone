import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./slices/emailSlice";
import commentSlice from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    email: emailSlice,
    comment: commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
