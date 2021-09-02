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
  disabled: {
    backgroundColor: 'gray',
  },
})

const CustomButton = ({ text, onPress, isDisabled }) => {
  const buttonStyles = [styles.btn_container]
  if (isDisabled) buttonStyles.push(styles.disabled)

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.btn_text}>{text}</Text>
    </TouchableOpacity>
  )
}

CustomButton.defaultProps = {
  isDisabled: false,
}

export default CustomButton
