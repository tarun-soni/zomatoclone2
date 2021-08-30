import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppRoutes from './config/AppRoutes'
import { HOMESCREEN, LOGINSCREEN } from './constants/screens'

const MainStack = createNativeStackNavigator()

const App = () => {
  const [isLoggedIn] = useState(false)

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={isLoggedIn ? HOMESCREEN : LOGINSCREEN}
      >
        {AppRoutes.map(route => (
          <MainStack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))}
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default App
