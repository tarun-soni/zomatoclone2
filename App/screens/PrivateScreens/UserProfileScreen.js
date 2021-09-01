import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import {
  selectGlobalUser,
  selectLoading,
  setLoading,
} from '../../redux/slices/appReducer'
import Loader from '../../components/Loader'
import { auth } from '../../config/firebase'
import CustomButton from '../../components/CustomButton'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
  },
})
const UserProfileScreen = () => {
  const globalUser = useSelector(selectGlobalUser)
  const isLoading = useSelector(selectLoading)
  const [userInfo, setUserInfo] = useState({})
  const dispatch = useDispatch()
  const logoutHandler = async () => {
    auth
      .signOut()
      .then(() => {
        console.log('User signed out!')
      })
      .then(() => dispatch(setLoading(true)))
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

export default UserProfileScreen
