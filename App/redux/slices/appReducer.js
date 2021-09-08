import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setGlobalUser: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

// actions
export const { setIsLoggedIn, setGlobalUser, setLoading } = appSlice.actions

// selector
export const selectIsLoggedIn = state => state.app.isLoggedIn
export const selectGlobalUser = state => state.app.user
export const selectLoading = state => state.app.loading

export default appSlice.reducer
