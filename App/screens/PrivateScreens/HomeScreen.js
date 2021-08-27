import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
  },
})
const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Home SCREEN</Text>
    </SafeAreaView>
  )
}

export default HomeScreen
