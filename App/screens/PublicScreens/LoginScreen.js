import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import Logo from '../../components/Logo'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import { HOMESCREEN, SIGNUPSCREEN } from '../../constants/screens'
import { auth } from '../../config/firebase'
import { selectLoading, setLoading } from '../../redux/slices/appReducer'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: colors.zomatoWhite,
    justifyContent: 'flex-start',
  },
  inputs_container: {
    marginHorizontal: 15,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
    textAlign: 'center',
  },

  //
})

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('u1@example.com')
  const [password, setPassword] = useState('789456789456')

  const isLoading = useSelector(selectLoading)
  const onLoginPress = async () => {
    try {
      dispatch(setLoading(true))
      const res = await auth.signInWithEmailAndPassword(email, password)
      console.log(`res`, res)

      console.log('User signed in!')
      navigation.navigate(HOMESCREEN)
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
    <SafeAreaView style={styles.contanier}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Logo />
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View style={styles.inputs_container}>
                <Text style={{ fontFamily: 'Nunito-Regular' }}>Email</Text>
                <CustomTextInput inputValue={email} setInputValue={setEmail} />
                <Text style={{ fontFamily: 'Nunito-Regular' }}>Password</Text>
                <CustomTextInput
                  inputValue={password}
                  setInputValue={setPassword}
                />
              </View>
              <CustomButton text="LOGIN" onPress={onLoginPress} />

              <TouchableOpacity
                onPress={() => navigation.navigate(SIGNUPSCREEN)}
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
                  Don&apos;t have an Account? SIGNUP
                </Text>
              </TouchableOpacity>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen
