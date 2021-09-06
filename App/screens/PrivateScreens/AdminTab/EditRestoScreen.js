import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker'
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useSelector } from 'react-redux'
import storage from '@react-native-firebase/storage'
import { selectRestoToEdit } from '../../../redux/slices/appReducer'
import CustomButton from '../../../components/CustomButton'
import CustomTextInput from '../../../components/CustomTextInput'
import { firestore } from '../../../config/firebase'

const styles = StyleSheet.create({
  card_image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
})

const EditRestoScreen = () => {
  const restoToEditFromStore = useSelector(selectRestoToEdit)
  const [isUploading, setIsUploading] = useState(false)
  const [transferred, setTransfered] = useState(0)
  const [uploadedImgUri, setUploadedImgUri] = useState('')
  const [restoName, setRestoName] = useState(
    () => restoToEditFromStore?.data?.resto_name,
  )
  const [restoImage, setRestoImage] = useState(
    () => restoToEditFromStore?.data?.resto_image_url,
  )

  const onAddRestoPress = async () => {
    setIsUploading(true)
    const uploadUri = restoImage

    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)
    const fileExtension = fileName.split('.').pop()
    const name = fileName.split('.').slice(0, -1).join('.')
    fileName = `${name}${Date.now()}.${fileExtension}`

    try {
      const reference = storage().ref(fileName)
      const task = reference.putFile(uploadUri)

      console.log(`reference`, reference)

      task.on('state_changed', taskSnapshot => {
        setTransfered(
          Math.round(
            taskSnapshot.bytesTransferred / taskSnapshot.totalBytes + 100,
          ),
        )
      })
      task
        .then(async () => {
          console.log(`task`, task)

          const url = await storage().ref(task._ref.path).getDownloadURL()

          setUploadedImgUri(url)
        })
        .then(() => {
          console.log(`uploadedImgUri`, uploadedImgUri)
          // prev on add
          firestore()
            .collection('restos')
            .doc(restoToEditFromStore.id)
            .update({
              resto_name: restoName,
              resto_image_url: uploadedImgUri,
            })
            .then(() => console.log('updated'))
        })
        .then(() => {
          Alert.alert('Image Uploaded', 'Image has been uploaded')
          setIsUploading(false)
        })
    } catch (error) {
      console.log(`error`, error)
      setIsUploading(false)
    }
  }

  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image)
    })
  }
  const choosePhotoFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
      console.log(imageUri)
      setRestoImage(imageUri)
    })
  }

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Text style={styles.text}>
        Editing
        {restoToEditFromStore.data.resto_name}
      </Text>

      <View>
        <Image
          style={styles.card_image}
          source={{
            uri: restoImage,
          }}
        />
        <CustomButton text="Open Camera" onPress={takePhotoFromCamera} />
        <CustomButton
          text="Opload from gallery"
          onPress={choosePhotoFromGallery}
        />
      </View>
      <SafeAreaView>
        <CustomTextInput
          inputValue={restoName}
          setInputValue={setRestoName}
          placeholderText="Add a new Resto"
        />
        <CustomButton
          text="Add Resto"
          onPress={onAddRestoPress}
          isDisabled={restoToEditFromStore.length <= 0}
        />

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
