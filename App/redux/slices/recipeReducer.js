import { createSlice } from '@reduxjs/toolkit'
import { getRecipes } from '../asyncThunks/recipeAsyncThunk'

const initialState = {
  allRecipes: [],
  status: null,
}

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipes.fulfilled]: (state, action) => {
      state.status = 'success'
      state.allRecipes = action.payload
    },
    [getRecipes.rejected]: state => {
      state.status = 'failed'
    },
    [getRecipes.pending]: state => {
      state.status = 'loading'
    },
  },
})

// actions
// export const {} = recipeSlice.actions

// selectors
export const selectAllRecipes = state => state.recipe.allRecipes
export const selectGetAllRecipesStatus = state => state.recipe.status

export default recipeSlice.reducer
