/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit'
import { getRestos } from '../asyncThunks/restoAsyncThunks'

const initialState = {
  allRestos: [],
  status: null,
  restoToEdit: {
    id: null,
    data: null,
  },
  isPhotoUploading: false,
  photoTransfered: 0,
  uploadedImageUrl: 'https://links.papareact.com/28w',
}

const restoSlice = createSlice({
  name: 'resto',
  initialState,
  reducers: {
    setStoreRestoToEdit: (state, action) => {
      state.restoToEdit = action.payload
    },
    setPhotoTransfered: (state, action) => {
      state.photoTransfered = action.payload
    },
    setIsRestoImageUploading: (state, action) => {
      console.log(
        '🚀 ~ file: restoReducer.js ~ line 30 ~ action',
        action.payload,
      )

      //  state.isPhotoUploading = action.payload
      return {
        ...state,
        isPhotoUploading: action.payload,
      }
    },
    setUploadedImageUrl: (state, action) => {
      state.uploadedImageUrl = action.payload
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
export const {
  setStoreRestoToEdit,
  setPhotoTransfered,
  setIsRestoImageUploading,
  setUploadedImageUrl,
} = restoSlice.actions

// selectors
export const selectAllRestos = state => state.resto.allRestos
export const selectGetRestoStatus = state => state.resto.status
export const selectRestoToEdit = state => state.resto.restoToEdit
export const selectPhotoTransfered = state => state.resto.photoTransfered
export const selectIsPhotoUploading = state => state.resto.isPhotoUploading
export const selectploadedImageUrl = state => state.resto.uploadedImageUrl

export default restoSlice.reducer
