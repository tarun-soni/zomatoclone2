import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appReducer'
import restoReducer from './slices/restoReducer'
import recipeReducer from './slices/recipeReducer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    resto: restoReducer,
    recipe: recipeReducer,
  },
})
