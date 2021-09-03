import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  restoToEdit: {
    id: null,
    data: null,
  },
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
    setStoreRestoToEdit: (state, action) => {
      state.restoToEdit = action.payload
    },
  },
})

// actions
export const { setIsLoggedIn, setGlobalUser, setLoading, setStoreRestoToEdit } =
  appSlice.actions
// selector

export const selectIsLoggedIn = state => state.app.isLoggedIn
export const selectGlobalUser = state => state.app.user
export const selectLoading = state => state.app.loading
export const selectRestoToEdit = state => state.app.restoToEdit

export default appSlice.reducer
