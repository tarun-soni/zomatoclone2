import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { firestore } from '../config/firebase'
import CustomButton from './CustomButton'
import CustomTextInput from './CustomTextInput'

const styles = StyleSheet.create({
  card_image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
})

const EditRestoOverlay = ({ restoToEdit, setEditRestoOverlay }) => {
  const [valueToEdit, setValueToEdit] = useState(
    () => restoToEdit._data.resto_name,
  )

  const onSavePress = async () => {
    console.log(`valueToEdit`, valueToEdit)

    firestore()
      .collection('restos')
      .doc(restoToEdit.id)
      .update({
        resto_name: valueToEdit,
      })
      .then(() => console.log('updated'))
      .then(() => setEditRestoOverlay(false))
  }
  return (
    <View>
      {console.log(`restoToEdit`, restoToEdit)}
      <Image
        style={styles.card_image}
        source={{
          uri: restoToEdit?.data.resto_image_url,
        }}
      />
      <Text style={styles.text}>
        Edit
        {restoToEdit?._data?.resto_name}
      </Text>
      <CustomTextInput
        inputValue={valueToEdit}
        setInputValue={setValueToEdit}
      />
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <CustomButton text="Save" onPress={onSavePress} />
        {/* <CustomButton text="upload image" onPress={} /> */}
        <CustomButton text="Close" onPress={() => setEditRestoOverlay(false)} />
      </View>
    </View>
  )
}

export default EditRestoOverlay
