import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import colors from './constants/colors'

const App = () => {
  return (
    <SafeAreaView>
      <Text
        style={{ fontFamily: 'Nunito-Regular', color: colors.zomatoLogoRed }}>
        Zomato
      </Text>
    </SafeAreaView>
  )
}

export default App
