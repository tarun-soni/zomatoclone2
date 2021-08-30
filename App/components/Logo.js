import React from 'react'
import { Image } from 'react-native'

const Logo = () => {
  return (
    <Image
      style={{
        width: '100%',
        resizeMode: 'contain',
        height: 80,
        marginVertical: 40,
      }}
      source={require('../../assets/images/logo.png')}
    />
  )
}

export default Logo
