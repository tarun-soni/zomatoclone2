import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'

import AppRoutes from './config/AppRoutes'
import { HOMESCREEN, LOGINSCREEN } from './constants/screens'

const MainStack = createNativeStackNavigator()

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  // Handle user state changes

  useEffect(() => {
    function onAuthStateChanged(_user) {
      setUser(_user)
      if (initializing) setInitializing(false)
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    return subscriber // unsubscribe on unmount
  }, [initializing])

  if (initializing) return null

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={user ? HOMESCREEN : LOGINSCREEN}>
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
