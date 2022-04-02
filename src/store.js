import { configureStore } from '@reduxjs/toolkit'
import appSliceReducer from './features/appSlice'

export const store = configureStore({
  reducer: {
    appSlice: appSliceReducer,
  },

  // To disable serializable error from Web3
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})