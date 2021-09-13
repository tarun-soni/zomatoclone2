import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  user: {
    id: null,
  },
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
    updateGlobalUser: (state, action) => {
      const _user = { ...state.user, ...action.payload }
      state.user = _user
    },
    resetGlobalUser: state => {
      state.user = { id: null }
      state.isLoggedIn = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

// actions
export const {
  setIsLoggedIn,
  setGlobalUser,
  setLoading,
  updateGlobalUser,
  resetGlobalUser,
} = appSlice.actions

// selector
export const selectIsLoggedIn = state => state.app.isLoggedIn
export const selectGlobalUser = state => state.app.user
export const selectLoading = state => state.app.loading

export default appSlice.reducer
