import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openUpdateDialog: false,
};

const commentSlice = createSlice({
  name: "Comment Slice",
  initialState,
  reducers: {
    setOpenUpdateDialog: (state, action) => {
      state.openUpdateDialog = action.payload;
    },
  },
});

export const { setOpenUpdateDialog } = commentSlice.actions;
export default commentSlice.reducer;
