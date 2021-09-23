import React, { useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { images } from '../constants/images'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

const ProgressiveImage = ({ source, style, ...props }) => {
  const defaultImageAnimated = useRef(new Animated.Value(0))
  const imageAnimated = useRef(new Animated.Value(0))

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }
  const handleImageLoad = () => {
    Animated.timing(imageAnimated.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        {...props}
        source={images.defaultImage}
        style={[style, { opacity: defaultImageAnimated.current }]}
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[style, { opacity: imageAnimated.current }, styles.imageOverlay]}
        onLoad={handleImageLoad}
      />
    </View>
  )
}

export default ProgressiveImage
