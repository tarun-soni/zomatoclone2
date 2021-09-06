import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import {
  selectGlobalUser,
  selectLoading,
  setIsLoggedIn,
  setLoading,
} from '../../../redux/slices/appReducer'
import Loader from '../../../components/Loader'
import { auth, firestore } from '../../../config/firebase'
import CustomButton from '../../../components/CustomButton'
import colors from '../../../constants/colors'
import { LOGINSCREEN } from '../../../constants/screens'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
  },
})
const UserProfileTab = ({ navigation }) => {
  const globalUser = useSelector(selectGlobalUser)
  const isLoading = useSelector(selectLoading)
  const [loggedInUserId, setLoggedInUserId] = useState({})
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    auth
      .signOut()

      .then(() => dispatch(setLoading(false)))
      .then(() => dispatch(setIsLoggedIn(false)))
      .then(() => navigation.replace(LOGINSCREEN))
      .then(() => {
        console.log('User signed out!')
      })
  }

  useEffect(() => {
    setLoggedInUserId(JSON.parse(globalUser))
  }, [globalUser])

  useEffect(() => {
    async function getUsers() {
      try {
        setIsUserInfoLoading(true)
        if (loggedInUserId.uid) {
          const usersCollection = await firestore()
            .collection('users')
            .doc(loggedInUserId.uid)
            .get()
          setUserInfo(usersCollection._data)
        }
      } catch (error) {
        console.log(`error`, error)
      } finally {
        setIsUserInfoLoading(false)
      }
    }

    // async function getRealtimeChangesOfUser() {
    //   const subscriber = await firestore()
    //     .collection('users')
    //     .doc(loggedInUserId.uid)
    //     .onSnapshot(doc => {
    //       setUserInfo({ name: doc.data().name })
    //     })
    //   console.log(`subscriber`, subscriber)
    // }

    getUsers()
    // getRealtimeChangesOfUser()
  }, [loggedInUserId])

  if (isLoading) return <Loader />

  return (
    <SafeAreaView style={{ margin: 10 }}>
      {isUserInfoLoading ? (
        <Loader />
      ) : (
        <>
          <Text>
            Email
            {'\t'}
            {userInfo?.email}
          </Text>
          <Text>
            Display Name
            {'\t'}
            {userInfo?.displayName}
          </Text>
          <Text>
            Phone Number
            {'\t'}
            {userInfo?.phoneNumber}
          </Text>
          <Text style={styles.text}>Home SCREEN</Text>
          <CustomButton text="LOGOUT" onPress={logoutHandler} />
        </>
      )}
    </SafeAreaView>
  )
}

export default UserProfileTab
