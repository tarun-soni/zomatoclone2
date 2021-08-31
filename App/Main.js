import React, { useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { HOMESCREEN, LOGINSCREEN } from './constants/screens'
import AppRoutes from './config/AppRoutes'
import { setGlobalUser, setLoading } from './redux/slices/appReducer'

const Main = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  // Handle user state changes
  useEffect(() => {
    function onAuthStateChanged(_user = {}) {
      setUser(_user)
      dispatch(setLoading(false))
      if (_user) dispatch(setGlobalUser(JSON.stringify(_user)))
      if (initializing) {
        setInitializing(false)
        dispatch(setLoading(false))
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    return subscriber
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
