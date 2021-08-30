import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native'
import colors from '../../constants/colors'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'

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
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [mobile, setMobile] = useState('')

  const onSignUpPress = () => {
    alert('test')
  }
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
                value={fullName}
                setInputValue={setFullName}
                placeholderText="Full Name"
              />
              <CustomTextInput
                value={email}
                setInputValue={setEmail}
                placeholderText="Email"
              />
              <CustomTextInput
                value={mobile}
                setInputValue={setMobile}
                placeholderText="Mobile Number"
              />
              <CustomTextInput
                value={password}
                setInputValue={setPassword}
                placeholderText="Password"
              />
              <CustomTextInput
                value={confirmPassword}
                setInputValue={setConfirmPassword}
                placeholderText="Confirm Password"
              />
            </View>
          </View>
        </ScrollView>
        <CustomButton text="SIGN IN" onPress={onSignUpPress} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUpScreen
