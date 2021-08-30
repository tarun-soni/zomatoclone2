import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
  input: {
    height: 52,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
    marginVertical: 8,
    borderRadius: 4,
  },
})

const CustomTextInput = ({ inputValue, setInputValue, placeholderText }) => {
  return (
    <TextInput
      value={inputValue}
      onChangeText={text => setInputValue(text)}
      placeholder={placeholderText}
      style={styles.input}
    />
  )
}
export default CustomTextInput
