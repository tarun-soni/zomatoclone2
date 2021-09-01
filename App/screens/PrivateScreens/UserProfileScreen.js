import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import {
  selectGlobalUser,
  selectLoading,
  setLoading,
} from '../../redux/slices/appReducer'
import Loader from '../../components/Loader'
import { auth, firestore } from '../../config/firebase'
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

  const [userOne, setUserOne] = useState(null)
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

  useEffect(() => {
    async function getUsers() {
      const usersCollection = await firestore()
        .collection('users')
        .doc('WBjOiEHfwHJUZIM9Tplx')
        .get()
      setUserOne(usersCollection._data)
    }

    async function getRealtimeChangesOfUser() {
      const subscriber = await firestore()
        .collection('users')
        .doc('WBjOiEHfwHJUZIM9Tplx')
        .onSnapshot(doc => {
          setUserOne({ name: doc.data().name })
        })
      console.log(`subscriber`, subscriber)
    }

    // getUsers()
    // getRealtimeChangesOfUser()
  }, [])

  if (isLoading) return <Loader />

  return (
    <SafeAreaView>
      <Text>
        hello
        {'\t'}
        {userInfo.email}
      </Text>
      <Text>
        hello
        {'\t'}
        {userOne?.name}
      </Text>
      {console.log(`userOne`, userOne)}
      <Text style={styles.text}>Home SCREEN</Text>
      <CustomButton text="LOGOUT" onPress={logoutHandler} />
    </SafeAreaView>
  )
}

export default UserProfileScreen
