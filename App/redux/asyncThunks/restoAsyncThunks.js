/* eslint-disable import/no-cycle */
import storage from '@react-native-firebase/storage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { firestore } from '../../config/firebase'
import {
  setIsRestoImageUploading,
  setPhotoTransfered,
  setUploadedImageUrl,
} from '../slices/restoReducer'

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

  async (params, { getState, dispatch }) => {
    const state = getState()
    console.log('🚀 ~ file: restoReducer.js ~ line 101 ~ state', state.resto)

    dispatch(setIsRestoImageUploading('true'))
    const { fileName, uploadUri } = params
    console.log('🚀 ~ file: restoReducer.js ~ line 105 ~ state', state.resto)

    try {
      const reference = storage().ref(fileName)
      const task = reference.putFile(uploadUri)

      task.on('state_changed', taskSnapshot => {
        const { bytesTransferred, totalBytes } = taskSnapshot

        dispatch(
          setPhotoTransfered(Math.round(bytesTransferred / totalBytes + 100)),
        )
      })
      task
        .then(async () => {
          const url = await storage().ref(task?._ref.path).getDownloadURL()
          console.log(`url`, url)
          dispatch(setUploadedImageUrl(url))
        })
        .then(() => {
          dispatch(setIsRestoImageUploading(false))
          Alert.alert('Image Uploaded', 'Image has been uploaded')
        })
    } catch (error) {
      dispatch(setIsRestoImageUploading(false))

      console.log(`error`, error)
      Alert.alert('Error In Image Upload', 'Please try again')
    }
  },
)
