import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { firestore } from '../../config/firebase'

const initialState = {
  allRestos: [],
  status: null,
}

export const getRestos = createAsyncThunk('app/getRestos', async () => {
  const dataToReturn = []

  console.log(`in resto`)
  try {
    const restosCollection = await firestore().collection('restos').get()

    if (restosCollection._docs) {
      restosCollection._docs.forEach(eachResto => {
        return dataToReturn.push({ id: eachResto.id, data: eachResto._data })
      })
    }
    return dataToReturn
  } catch (error) {
    console.log(`error`, error)
    Alert.alert(error.message)
    return error
  }
})

const restoSlice = createSlice({
  name: 'resto',
  initialState,
  reducers: {},
  extraReducers: {
    [getRestos.fulfilled]: (state, action) => {
      state.status = 'success'
      state.allRestos = action.payload
    },
    [getRestos.rejected]: state => {
      state.status = 'failed'
    },
    [getRestos.pending]: state => {
      state.status = 'loading'
    },
  },
})

export default restoSlice.reducer

export const selectAllRestos = state => state.resto.allRestos
export const selectGetRestoStatus = state => state.resto.status
