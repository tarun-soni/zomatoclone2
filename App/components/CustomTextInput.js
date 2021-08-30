import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
  input: {
    height: 52,
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
    paddingLeft: 10,
    marginBottom: 10,
  },
})

const CustomTextInput = ({ inputValue, setInputValue, placeholderText }) => {
  return (
    <TextInput
      value={inputValue}
      onChangeText={text => setInputValue(text)}
      placeholderTextColor="black"
      placeholder={placeholderText}
      style={styles.input}
    />
  )
}
export default CustomTextInput
