import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants/theme'

const styles = StyleSheet.create({
  btn_text: {
    textAlign: 'center',
    color: COLORS.zomatoWhite,
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  btn_container: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: COLORS.buttonRed,
    margin: 40,
  },
  disabled: {
    backgroundColor: 'gray',
  },
  small_button: {
    width: 150,
  },
  medium_button: {
    width: 220,
  },
  large_button: {
    width: 400,
  },
})

const CustomButton = ({ text, onPress, isDisabled, size }) => {
  const buttonStyles = [styles.btn_container]
  if (isDisabled) buttonStyles.push(styles.disabled)
  if (size === 'sm') buttonStyles.push(styles.small_button)
  if (size === 'md') buttonStyles.push(styles.medium_button)
  if (size === 'lg') buttonStyles.push(styles.large_button)

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
