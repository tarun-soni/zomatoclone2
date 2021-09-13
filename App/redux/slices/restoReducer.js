import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import storage from '@react-native-firebase/storage'
import { firestore } from '../../config/firebase'

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
    setIsPhotoUploading: (state, action) => {
      state.isPhotoUploading = action.payload
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
  setIsPhotoUploading,
  setUploadedImageUrl,
} = restoSlice.actions

// selectors
export const selectAllRestos = state => state.resto.allRestos
export const selectGetRestoStatus = state => state.resto.status
export const selectRestoToEdit = state => state.resto.restoToEdit
export const selectPHotoTransfered = state => state.resto.photoTransfered
export const selectIsPhotoUploading = state => state.resto.isPhotoUploading
export const selectploadedImageUrl = state => state.resto.uploadedImageUrl

export const updateRestoInfo = createAsyncThunk(
  'resto/updateRestoInfo',
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
          resto_image_url: state?.resto?.uploadedImageUrl,
        })
        .then(() => Alert.alert('Resto Name updated'))
    } catch (error) {
      console.log(`error`, error)
      console.log(`error.message`, error.message)
    }
  },
)

export const updateRestoPhoto = createAsyncThunk(
  'resto/updateRestoPhoto',

  async (params, { dispatch }) => {
    dispatch(setIsPhotoUploading(true))
    const { fileName, uploadUri } = params

    try {
      const reference = storage().ref(fileName)
      const task = reference.putFile(uploadUri)

      console.log(`reference`, reference)

      task.on('state_changed', taskSnapshot => {
        const { bytesTransferred, totalBytes } = taskSnapshot
        dispatch(
          setPhotoTransfered(Math.round(bytesTransferred / totalBytes + 100)),
        )
      })
      task
        .then(async () => {
          console.log(`task`, task)
          const url = await storage().ref(task?._ref.path).getDownloadURL()
          console.log(`url`, url)
          dispatch(setUploadedImageUrl(url))
        })
        .then(() => {
          Alert.alert('Image Uploaded', 'Image has been uploaded')
        })
    } catch (error) {
      console.log(`error`, error)
      Alert.alert('Error In Image Upload', 'Please try again')
    } finally {
      dispatch(setIsPhotoUploading(false))
    }
  },
)

export default restoSlice.reducer
