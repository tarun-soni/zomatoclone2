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
import colors from '../../constants/colors'
import Logo from '../../components/Logo'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import { SIGNUPSCREEN } from '../../constants/screens'

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
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('1212')
  const onLoginPress = () => {
    alert('test')
  }

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
                <CustomTextInput value={email} setInputValue={setEmail} />
                <Text style={{ fontFamily: 'Nunito-Regular' }}>Password</Text>
                <CustomTextInput value={password} setInputValue={setPassword} />
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
                  Have and Account? SIGNUP
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
