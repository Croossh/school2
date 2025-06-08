import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "pages/home/homeSilce.js";
import cancelReducer from "pages/cancel/cancelSlice.js";

const store = configureStore({
  reducer: {
    homeReducer,
    cancelReducer,
    // paymentsReducer,
  },
});
export default store;
