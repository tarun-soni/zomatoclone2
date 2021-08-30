import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
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

  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomSection: {
    width: '100%',
    height: '70%',
    backgroundColor: colors.zomatoLogoRed,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
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
      <Logo ScrollView />
      <View>
        <View style={styles.inputs_container}>
          <Text style={{ fontFamily: 'Nunito-Regular' }}>Email</Text>
          <CustomTextInput value={email} setInputValue={setEmail} />
          <Text style={{ fontFamily: 'Nunito-Regular' }}>Password</Text>
          <CustomTextInput value={password} setInputValue={setPassword} />
        </View>
        <CustomButton text="LOGIN" onPress={onLoginPress} />
      </View>

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
    </SafeAreaView>
  )
}

export default LoginScreen
