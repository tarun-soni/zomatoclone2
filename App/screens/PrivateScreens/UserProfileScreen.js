import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { selectGlobalUser, selectLoading } from '../../redux/slices/appReducer'
import Loader from '../../components/Loader'
import { auth } from '../../config/firebase'
import CustomButton from '../../components/CustomButton'

const styles = StyleSheet.create({})

const UserProfileScreen = () => {
  const globalUser = useSelector(selectGlobalUser)
  const isLoading = useSelector(selectLoading)
  const [userInfo, setUserInfo] = useState({})

  const logoutHandler = async () => {
    auth.signOut().then(() => {
      // navigation.navigate(LOGINSCREEN)
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

export default UserProfileScreen
