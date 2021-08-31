import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import CustomButton from '../../components/CustomButton'
import colors from '../../constants/colors'
import { LOGINSCREEN } from '../../constants/screens'
import { auth } from '../../config/firebase'
import { selectGlobalUser, selectLoading } from '../../redux/slices/appReducer'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
  },
})

const HomeScreen = () => {
  const globalUser = useSelector(selectGlobalUser)
  const isLoading = useSelector(selectLoading)
  const [userInfo, setUserInfo] = useState({})
  const navigation = useNavigation()
  const logoutHandler = async () => {
    auth.signOut().then(() => {
      navigation.navigate(LOGINSCREEN)
      console.log('User signed out!')
    })
  }

  useEffect(() => {
    setUserInfo(JSON.parse(globalUser))
  }, [globalUser])

  if (isLoading) return <Loader />

  return (
    <SafeAreaView>
      <Text>
        hello
        {'\t'}
        {userInfo.email}
      </Text>
      <Text style={styles.text}>Home SCREEN</Text>
      <CustomButton text="LOGOUT" onPress={logoutHandler} />
    </SafeAreaView>
  )
}

export default HomeScreen
