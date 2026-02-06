import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categoryslice";
import loginSlice from "./loginSlice";
const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    login: loginSlice.reducer,
  },
});

export default store;
