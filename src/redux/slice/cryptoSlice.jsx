import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cryptoSlice = createSlice({
  name: "cryptodata",
  initialState,
  reducers: {
    addToBookmark: (state, action) => {
      state.push(action.payload);
    },
    removeToBookmark: (state, action) => {
      return state.filter((coin) => coin.id !== action.payload);
    },
  },
});

export const { addToBookmark, removeToBookmark } = cryptoSlice.actions;
export default cryptoSlice.reducer;
