import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native'
import { Overlay } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import { HOMESCREEN, LOGINSCREEN } from '../../constants/screens'
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

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState('User 1')
  const [email, setEmail] = useState('u1@example.com')
  const [password, setPassword] = useState('789456789456')
  const [confirmPassword, setConfirmPassword] = useState('789456789456')
  const [mobile, setMobile] = useState('9999999999')

  const [errorOverlay, setErrorOverlay] = useState(false)

  const isLoading = useSelector(selectLoading)
  const onSignUpPress = async () => {
    try {
      dispatch(setLoading(true))

      const response = await auth.createUserWithEmailAndPassword(
        email,
        password,
      )

      console.log(`response`, response)

      await firestore()
        .collection('users')
        .doc(response.user.uid)
        .set({
          displayName: fullName,
          email,
          phoneNumber: mobile,
          isAdmin: false,
        })
        .then(() => navigation.replace(HOMESCREEN))
    } catch (error) {
      console.log(`error`, error)
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
        setErrorOverlay(true)
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
        setErrorOverlay(true)
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
      {errorOverlay && (
        <Overlay isVisible={errorOverlay}>
          <Text>Some content</Text>
          <TouchableOpacity onPress={() => setErrorOverlay(false)}>
            {/*  TODO - add proper error message  */}

            <Text>ERROR in sign in Click to close</Text>
          </TouchableOpacity>
        </Overlay>
      )}
    </SafeAreaView>
  )
}

export default SignUpScreen
