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
} from 'react-native'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../../components/CustomButton'
import CustomTextInput from '../../../components/CustomTextInput'
import {
  selectRestoToEdit,
  updateRestoInfo,
  updateRestoPhoto,
} from '../../../redux/slices/restoReducer'
import colors from '../../../constants/colors'
import UploadPicOverlay from './UploadPicOverlay'

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
  backdrop: {
    backgroundColor: '#111',
    opacity: 0.75,
  },
})

const EditRestoScreen = () => {
  const dispatch = useDispatch()

  const restoToEditFromStore = useSelector(selectRestoToEdit)
  const [uploadImageOverlay, setUploadImageOverlay] = useState(false)
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
        {restoToEditFromStore?.data?.resto_name}
      </Text>

      <View>
        <Text>Image:</Text>
        <Image
          style={styles.card_image}
          source={{
            uri: restoImage,
          }}
        />
        <Button
          title="Edit image"
          onPress={() => setUploadImageOverlay(true)}
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
          text="Add/Update Resto"
          onPress={updateRestoInfoHandler}
          isDisabled={restoToEditFromStore.length <= 0}
        />
      </SafeAreaView>

      {uploadImageOverlay && (
        <Overlay
          isVisible={uploadImageOverlay}
          onBackdropPress={() => setUploadImageOverlay(false)}
          backdropStyle={styles.backdrop}
        >
          <View style={{ margin: 30 }}>
            <UploadPicOverlay
              setUploadImageOverlay={setUploadImageOverlay}
              choosePhotoFromGallery={choosePhotoFromGallery}
              takePhotoFromCamera={takePhotoFromCamera}
              restoImage={restoImage}
              updatePhotoHandler={updatePhotoHandler}
            />
          </View>
        </Overlay>
      )}
    </SafeAreaView>
  )
}

export default EditRestoScreen
