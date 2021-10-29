import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { FONTS } from '../constants/theme'

const styles = StyleSheet.create({
  button_text: {
    textAlign: 'center',
    color: 'white',
    ...FONTS.h3,
  },
})

const GradientButton = ({
  text,
  onPress,
  isDisabled,
  propColors,
  buttonContainerStyles,
}) => {
  if (propColors.length > 0) {
    return (
      <TouchableOpacity onPress={onPress} disabled={isDisabled}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={propColors}
          style={{ ...buttonContainerStyles }}
        >
          <Text style={styles.button_text}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
    // eslint-disable-next-line no-else-return
  } else {
    return (
      <TouchableOpacity
        style={{
          ...buttonContainerStyles,
        }}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text style={styles.button_text}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

GradientButton.defaultProps = {
  isDisabled: false,
}

export default GradientButton
