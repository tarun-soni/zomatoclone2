import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker'
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Platform,
  Button,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../../components/CustomButton'
import CustomTextInput from '../../../components/CustomTextInput'
import {
  selectIsPhotoUploading,
  selectPHotoTransfered,
  selectRestoToEdit,
  updateRestoInfo,
  updateRestoPhoto,
} from '../../../redux/slices/restoReducer'
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  card_image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
    fontSize: 20,
  },
})

const EditRestoScreen = () => {
  const dispatch = useDispatch()

  const restoToEditFromStore = useSelector(selectRestoToEdit)
  const isUploading = useSelector(selectIsPhotoUploading)
  const transferred = useSelector(selectPHotoTransfered)

  const [restoName, setRestoName] = useState(
    () => restoToEditFromStore?.data?.resto_name,
  )
  const [restoImage, setRestoImage] = useState(
    () => restoToEditFromStore?.data?.resto_image_url,
  )

  const updateRestoInfoHandler = async () => {
    dispatch(
      updateRestoInfo({
        id: restoToEditFromStore.id,
        updatedName: restoName,
      }),
    )
  }

  const updatePhotoHandler = async () => {
    const uploadUri = restoImage

    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)
    const fileExtension = fileName.split('.').pop()
    const name = fileName.split('.').slice(0, -1).join('.')
    fileName = `${name}${Date.now()}.${fileExtension}`

    dispatch(
      updateRestoPhoto({
        fileName,
        uploadUri,
      }),
    )
    // setIsUploading(true)
    // const uploadUri = restoImage

    // let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)
    // const fileExtension = fileName.split('.').pop()
    // const name = fileName.split('.').slice(0, -1).join('.')
    // fileName = `${name}${Date.now()}.${fileExtension}`

    // try {
    //   const reference = storage().ref(fileName)
    //   const task = reference.putFile(uploadUri)

    //   console.log(`reference`, reference)

    //   task.on('state_changed', taskSnapshot => {
    //     setTransfered(
    //       Math.round(
    //         taskSnapshot.bytesTransferred / taskSnapshot.totalBytes + 100,
    //       ),
    //     )
    //   })
    //   task
    //     .then(async () => {
    //       console.log(`task`, task)
    //       const url = await storage().ref(task?._ref.path).getDownloadURL()
    //       console.log(`url`, url)
    //       setUploadedImgUri(url)
    //     })
    //     .then(() => {
    //       Alert.alert('Image Uploaded', 'Image has been uploaded')
    //       setIsUploading(false)
    //     })
    // } catch (error) {
    //   console.log(`error`, error)
    // }
  }

  // upload photo functions
  const takePhotoFromCamera = async () => {
    // TODO test this on android
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image)
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
      setRestoImage(imageUri)
    })
  }

  const choosePhotoFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
      setRestoImage(imageUri)
    })
  }

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Text style={styles.text}>
        Editing
        {`\t`}
        {restoToEditFromStore.data.resto_name}
      </Text>

      <View>
        <Text>Image:</Text>
        <Image
          style={styles.card_image}
          source={{
            uri: restoImage,
          }}
        />
        <Button title="Edit image" />
        <CustomButton text="Open Camera" onPress={takePhotoFromCamera} />
        <CustomButton
          text="Upload from gallery"
          onPress={choosePhotoFromGallery}
        />
      </View>

      <SafeAreaView>
        <Text>Resto Title</Text>
        <CustomTextInput
          inputValue={restoName}
          setInputValue={setRestoName}
          placeholderText="Add a new Resto"
        />
        <CustomButton
          text="Add Resto"
          onPress={updateRestoInfoHandler}
          isDisabled={restoToEditFromStore.length <= 0}
        />
        <CustomButton text="Upload Pic" onPress={updatePhotoHandler} />

        {isUploading && (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <Text>{transferred}% completed </Text>
            <ActivityIndicator size="small" />
          </View>
        )}
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default EditRestoScreen
