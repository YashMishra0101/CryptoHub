import { configureStore } from '@reduxjs/toolkit'
import cryptoSliceReducer from './slice/cryptoSlice'
export const store = configureStore({
  reducer:cryptoSliceReducer
})