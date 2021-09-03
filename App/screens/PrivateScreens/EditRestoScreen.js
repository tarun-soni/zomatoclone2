import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker'
import { Text, SafeAreaView, Image, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectRestoToEdit } from '../../redux/slices/appReducer'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import { firestore } from '../../config/firebase'

const styles = StyleSheet.create({
  card_image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
})

const EditRestoScreen = () => {
  const restoToEditFromStore = useSelector(selectRestoToEdit)
  const [restoName, setRestoName] = useState(
    () => restoToEditFromStore?.data?.resto_name,
  )

  const [restoImage, setRestoImage] = useState(
    () => restoToEditFromStore?.data?.resto_image_url,
  )

  const onAddRestoPress = async () => {
    firestore()
      .collection('restos')
      .doc(restoToEditFromStore.id)
      .update({
        resto_name: restoName,
        // resto_image_url:
      })
      .then(() => console.log('updated'))
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
      setRestoImage(image.path)
      console.log(image)
    })
  }

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Text style={styles.text}>
        Editing
        {restoToEditFromStore.data.resto_name}
      </Text>
      <Text>{console.log(`restoToEditFromStore`, restoToEditFromStore)}</Text>

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
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default EditRestoScreen
