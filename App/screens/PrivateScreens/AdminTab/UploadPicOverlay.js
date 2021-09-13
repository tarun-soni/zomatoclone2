import React from 'react'
import { Button, SafeAreaView, Image, StyleSheet, View } from 'react-native'
import CustomButton from '../../../components/CustomButton'

const styles = StyleSheet.create({
  card_image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
})

const UploadPicOverlay = ({
  setUploadImageOverlay,
  takePhotoFromCamera,
  choosePhotoFromGallery,
  restoImage,
  updatePhotoHandler,
}) => {
  const onSavePressHandler = async () => {
    updatePhotoHandler()
  }
  const onClosePressHandler = () => {
    setUploadImageOverlay(false)
  }
  return (
    <>
      <SafeAreaView
        style={{
          margin: 10,
          alignItems: 'center',
        }}
      >
        <Image
          style={styles.card_image}
          source={{
            uri: restoImage,
          }}
        />
        <CustomButton
          size="md"
          text="Open Camera"
          onPress={takePhotoFromCamera}
        />
        <CustomButton
          size="md"
          text="Upload from gallery"
          onPress={choosePhotoFromGallery}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button title="Save" onPress={onSavePressHandler} />
          <Button title="Close" onPress={onClosePressHandler} />
        </View>
      </SafeAreaView>
    </>
  )
}

export default UploadPicOverlay
