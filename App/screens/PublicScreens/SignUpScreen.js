import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import colors from '../../constants/colors'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import { LOGINSCREEN } from '../../constants/screens'
import { auth, firestore } from '../../config/firebase'
import { selectLoading, setLoading } from '../../redux/slices/appReducer'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    // backgroundColor: colors.zomatoWhite,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
    textAlign: 'center',
  },
  inputs_container: {
    marginHorizontal: 15,
  },
})

const SignUpScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [fullName, setFullName] = useState('User 1')
  const [email, setEmail] = useState('u1@example.com')
  const [password, setPassword] = useState('789456789456')
  const [confirmPassword, setConfirmPassword] = useState('789456789456')
  const [mobile, setMobile] = useState('9999999999')

  const isLoading = useSelector(selectLoading)
  const onSignUpPress = async () => {
    try {
      dispatch(setLoading(true))
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          return firestore().collection('users').doc(cred.user.uid).set({
            displayName: fullName,
            email,
            phoneNumber: mobile,
          })
        })
        .then(() => console.log('User account created & signed in!'))
    } catch (error) {
      console.log(`error`, error)
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  if (isLoading) return <Loader />

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <View style={{ width: '80%', marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                fontSize: 30,
                marginTop: 10,
                marginBottom: 30,
              }}
            >
              Create Account
            </Text>

            <View style={styles.inputs_container}>
              <CustomTextInput
                inputValue={fullName}
                setInputValue={setFullName}
                placeholderText="Full Name"
              />
              <CustomTextInput
                inputValue={email}
                setInputValue={setEmail}
                placeholderText="Email"
              />
              <CustomTextInput
                inputValue={mobile}
                setInputValue={setMobile}
                placeholderText="Mobile Number"
              />
              <CustomTextInput
                inputValue={password}
                setInputValue={setPassword}
                placeholderText="Password"
              />
              <CustomTextInput
                inputValue={confirmPassword}
                setInputValue={setConfirmPassword}
                placeholderText="Confirm Password"
              />
            </View>
          </View>
        </ScrollView>
        <CustomButton text="CREATE ACCOUNT" onPress={onSignUpPress} />
        <TouchableOpacity
          onPress={() => navigation.navigate(LOGINSCREEN)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#242424',
              textDecorationLine: 'underline',
            }}
          >
            Have and Account? LOGIN
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUpScreen
