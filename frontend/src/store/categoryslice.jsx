import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
  name: "category",
  initialState: "All",
  reducers: {
    chngeInitialState: (state, action) => {

      return action.payload;
    },
  },
});

export default categorySlice;
export const categorySliceActions = categorySlice.actions;
