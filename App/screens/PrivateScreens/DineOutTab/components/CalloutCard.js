import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { FONTS, COLORS, SIZES } from '../../../../constants/theme'

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: SIZES.radius,
    width: 150,
  },
  name: {
    ...FONTS.h4,
    lineHeight: 16,
    marginBottom: 5,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: COLORS.white,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    marginBottom: -15,
  },
  // Character image
  callout_image: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  callout_desc: {
    ...FONTS.body5,
    color: COLORS.gray,
    lineHeight: 16,
  },
})

const CalloutCard = ({ marker }) => {
  return (
    <>
      <View style={styles.bubble}>
        <Text style={styles.name}>{marker.title}</Text>
        <Text style={styles.callout_desc}>{marker.description}</Text>
        <Animated.Image style={styles.callout_image} source={marker.image} />
      </View>
      <View style={styles.arrowBorder} />
      <View style={styles.arrow} />
    </>
  )
}

export default CalloutCard
