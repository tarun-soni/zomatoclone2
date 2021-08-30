import React, { useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import { HOMESCREEN, LOGINSCREEN } from './constants/screens'
import AppRoutes from './config/AppRoutes'

const Main = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  // Handle user state changes
  useEffect(() => {
    function onAuthStateChanged(_user = {}) {
      console.log(`_user`, _user)
      setUser(_user)
      // if (_user) dispatch(setGlobalUser(_user))
      if (initializing) setInitializing(false)
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    return subscriber // unsubscribe on unmount
  }, [])

  const MainStack = createNativeStackNavigator()

  if (initializing) return null

  return (
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
  )
}

export default Main
