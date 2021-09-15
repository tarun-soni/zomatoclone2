import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import { COLORS, FONTS } from '../constants/theme'

const BasicButton = ({ text, onPress, isDisabled, propColors }) => {
  if (propColors.length > 0) {
    return (
      <TouchableOpacity
        style={{
          textAlign: 'center',
          color: COLORS.white,
          ...FONTS.h2,
        }}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      style={{
        textAlign: 'center',
        backgroundColor: colors.buttonRed,
        ...FONTS.h2,
        borderWidth: 4,
        borderColor: 'white',
      }}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={{ color: 'white' }}>{text}</Text>
    </TouchableOpacity>
  )
}

BasicButton.defaultProps = {
  isDisabled: false,
}

export default BasicButton
