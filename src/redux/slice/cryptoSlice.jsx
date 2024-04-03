// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];

// export const cryptoSlice = createSlice({
//   name: "cryptodata",
//   initialState,
//   reducers: {
//     addToBookmark: (state, action) => {
//       state.push(action.payload);
//     },
//     removeFromBookmark: (state, action) => {
//       return state.filter((coin) => coin.coinId !== action.payload);
//     },
//   },
// });

// export const { addToBookmark, removeFromBookmark } = cryptoSlice.actions;
// export default cryptoSlice.reducer;


// cryptoSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  bookmarks: [],
};

export const cryptoSlice = createSlice({
  name: "cryptodata",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    addToBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeFromBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter((coin) => coin.coinId !== action.payload);
    },
  },
});

export const { setUserId, addToBookmark, removeFromBookmark } = cryptoSlice.actions;
export default cryptoSlice.reducer;
