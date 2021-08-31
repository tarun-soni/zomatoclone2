import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appReducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
})
