import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { firestore } from '../../config/firebase'

const initialState = {
  allRestos: [],
  status: null,
  restoToEdit: {
    id: null,
    data: null,
  },
}

export const getRestos = createAsyncThunk('resto/getRestos', async () => {
  const dataToReturn = []
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

export const updateRestoName = createAsyncThunk(
  'resto/updateRestoName',
  async (paramsFromUser, { dispatch, getState }) => {
    const { id, updatedName } = paramsFromUser
    const state = getState()

    console.log(`state`, state)
    console.log(`dispatch`, dispatch)
    try {
      await firestore()
        .collection('restos')
        .doc(id)
        .update({
          resto_name: updatedName,
        })
        .then(() => console.log('updated'))
        .then(() => Alert.alert('Resto Name updated'))
    } catch (error) {
      console.log(`error`, error)
      console.log(`error.message`, error.message)
    }
  },
)

const restoSlice = createSlice({
  name: 'resto',
  initialState,
  reducers: {
    setStoreRestoToEdit: (state, action) => {
      state.restoToEdit = action.payload
    },
  },
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

// actions
export const { setStoreRestoToEdit } = restoSlice.actions

// selectors
export const selectAllRestos = state => state.resto.allRestos
export const selectGetRestoStatus = state => state.resto.status
export const selectRestoToEdit = state => state.resto.restoToEdit

export default restoSlice.reducer
