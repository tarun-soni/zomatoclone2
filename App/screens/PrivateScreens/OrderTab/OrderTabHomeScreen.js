import React from 'react'
import { View } from 'react-native'
import CustomButton2 from '../../../components/CustomButton2'
import CustomButton from '../../../components/CustomButton'
import GradientButton from '../../../components/GradientButton'

const OrderTabHomeScreen = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 2,
        flex: 1,
      }}
    >
      <CustomButton2
        // bgColor="#fae9ea"
        bgColor="#fcd7d9"
        fgColor="#dd4d44"
        onPress={() => console.log('btn2')}
        text="Yo0000000"
        // type="SECONDARY"
        isDisabled={false}
      />
      <CustomButton
        bgColor="yellow"
        fgColor="red"
        onPress={() => console.log('btn2')}
        text="hello"
        size="sm"
      />

      <GradientButton
        text="LOGIN"
        propColors={['red', 'yellow']}
        onPress={() => {}}
        buttonContainerStyles={{
          paddingVertical: 10,
          borderRadius: 8,
          width: 120,
        }}
      />
    </View>
  )
}

export default OrderTabHomeScreen
