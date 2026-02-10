import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = { email: "" };

const emailSlice = createSlice({
  name: "Email Slice",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = emailSlice.actions;
export default emailSlice.reducer;
