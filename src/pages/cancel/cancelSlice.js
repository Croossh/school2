import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInsert: false,
};

const cancelSlice = createSlice({
  name: "cancel",
  initialState,
  reducers: {
    isInsertToTrue: (state, action) => {
      state.isInsert = true;
    },

    isInsertToFalse: (state, action) => {
      state.isInsert = false;
    },
  },
});

export const { isInsertToTrue, isInsertToFalse } = cancelSlice.actions;

export default cancelSlice.reducer;
