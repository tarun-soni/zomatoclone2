import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectRestoToEdit } from '../../redux/slices/appReducer'

const EditRestoScreen = () => {
  const restoToEditFromStore = useSelector(selectRestoToEdit)
  return (
    <View>
      <Text>{console.log(`restoToEditFromStore`, restoToEditFromStore)}</Text>
      {/*  <View style={{ width: '90%' }}>
       <CustomTextInput
          inputValue={}
          setInputValue={setRestoToEdit}
          placeholderText="Add a new Resto"
        /> 
        <CustomButton
          text="Add Resto"
          onPress={onAddRestoPress}
          isDisabled={restoToEditFromStore.length <= 0}
        />
      </View> */}
    </View>
  )
}

export default EditRestoScreen
