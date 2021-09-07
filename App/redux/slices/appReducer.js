import { createSlice } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { firestore } from '../../config/firebase'

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

export const getRestos = () => async dispatch => {
  try {
    dispatch(setLoading(true))
    const restosCollection = await firestore().collection('restos').get()
    return restosCollection
  } catch (error) {
    console.log(`error`, error)
    Alert.alert(error.message)
    return error
  } finally {
    dispatch(setLoading(false))
  }
}
