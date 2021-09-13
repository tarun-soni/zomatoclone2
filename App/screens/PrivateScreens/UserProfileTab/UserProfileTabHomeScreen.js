import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import {
  resetGlobalUser,
  selectGlobalUser,
  selectLoading,
  setLoading,
} from '../../../redux/slices/appReducer'
import Loader from '../../../components/Loader'
import { auth } from '../../../config/firebase'
import CustomButton from '../../../components/CustomButton'
import colors from '../../../constants/colors'
import { LOGINSCREEN } from '../../../constants/screens'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
  },
})

const UserProfileTabHomeScreen = ({ navigation }) => {
  const globalUser = useSelector(selectGlobalUser)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(`globalUser`, globalUser)
  }, [globalUser])

  const logoutHandler = async () => {
    auth
      .signOut()
      .then(() => dispatch(resetGlobalUser()))

      .then(() => dispatch(setLoading(false)))
      .then(() => navigation.replace(LOGINSCREEN))
      .then(() => console.log('User signed out!'))
  }

  if (isLoading) return <Loader />

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <>
        <Text>
          Email
          {'\t'}
          {globalUser?.email}
        </Text>
        <Text>
          Display Name
          {'\t'}
          {globalUser?.displayName}
        </Text>
        <Text>
          Phone Number
          {'\t'}
          {globalUser?.phoneNumber}
        </Text>
        <Text style={styles.text}>Home SCREEN</Text>
        <CustomButton text="LOGOUT" onPress={logoutHandler} />
      </>
    </SafeAreaView>
  )
}

export default UserProfileTabHomeScreen
