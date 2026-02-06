import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    signValueTrue: () => {
      return true;
    },
    signValuefalse: () => {
      return false;
    },
  },
});

export default loginSlice;
export const loginSliceActions = loginSlice.actions;
