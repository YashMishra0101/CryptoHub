import { configureStore } from "@reduxjs/toolkit";
import { cryptoSlice } from "./slice/cryptoSlice"; // Correct import

export const store = configureStore({
  reducer: cryptoSlice.reducer, // Access the reducer from cryptoSlice
});
