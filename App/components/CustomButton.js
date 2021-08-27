import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'

const styles = StyleSheet.create({
  btn_text: {
    textAlign: 'center',
    color: colors.zomatoWhite,
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  btn_container: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: colors.buttonRed,
    margin: 40,
  },
})

const CustomButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn_container} onPress={onPress}>
      <Text style={styles.btn_text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
