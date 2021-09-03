import React, { useCallback, useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import { HOMESCREEN, LOGINSCREEN } from './constants/screens'
import { AppRoutes } from './config/AppRoutes'
import {
  selectIsLoggedIn,
  setGlobalUser,
  setIsLoggedIn,
  setLoading,
} from './redux/slices/appReducer'
import Loader from './components/Loader'

const Main = () => {
  const [initializing, setInitializing] = useState(true)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onAuthStateChanged = useCallback(
    (_user = {}) => {
      // setUser(_user)
      dispatch(setLoading(false))
      if (_user) {
        dispatch(setGlobalUser(JSON.stringify(_user)))
        dispatch(setIsLoggedIn(true))
      }
      if (initializing) {
        setInitializing(false)
        dispatch(setLoading(false))
      }
    },
    [dispatch, initializing],
  )

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    return subscriber
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAuthStateChanged])

  const MainStack = createNativeStackNavigator()

  if (initializing) return <Loader />

  return (
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
  )
}

export default Main
