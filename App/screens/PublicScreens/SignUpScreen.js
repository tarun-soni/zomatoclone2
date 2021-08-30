import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import colors from '../../constants/colors'
import CustomButton from '../../components/CustomButton'

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: colors.zomatoWhite,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
    textAlign: 'center',
  },
})
const SignUpScreen = () => {
  const onLoginPress = () => {
    alert('test')
  }
  return (
    <SafeAreaView style={styles.contanier}>
      <Text style={styles.text}>SignUp SCREEN</Text>
      <CustomButton text="LOGIN" onPress={onLoginPress} />
    </SafeAreaView>
  )
}

export default SignUpScreen
