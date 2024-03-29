import React, { useCallback, useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import { HOMESCREEN, PUBLIC_HOME_SCREEN } from './constants/screens'
import { AppRoutes } from './config/routes/AppRoutes'
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
      dispatch(setLoading(false))
      if (_user) {
        dispatch(setGlobalUser({ id: _user.uid }))
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
      initialRouteName={isLoggedIn ? HOMESCREEN : PUBLIC_HOME_SCREEN}
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
