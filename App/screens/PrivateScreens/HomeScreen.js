import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'
import colors from '../../constants/colors'
import { LOGINSCREEN } from '../../constants/screens'
import { auth } from '../../config/firebase'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
  },
})
const HomeScreen = () => {
  const navigation = useNavigation()
  const logoutHandler = async () => {
    auth.signOut().then(() => {
      navigation.navigate(LOGINSCREEN)
      console.log('User signed out!')
    })
  }
  return (
    <SafeAreaView>
      <Text style={styles.text}>Home SCREEN</Text>
      <CustomButton text="LOGOUT" onPress={logoutHandler} />
    </SafeAreaView>
  )
}

export default HomeScreen
