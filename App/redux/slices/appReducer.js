import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGlobalUser: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

// actions
export const { setGlobalUser, setLoading } = appSlice.actions
// selector
export const selectGlobalUser = state => state.app.user
export const selectLoading = state => state.app.loading

export default appSlice.reducer
