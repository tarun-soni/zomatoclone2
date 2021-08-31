import React, { useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HOMESCREEN, LOGINSCREEN } from './constants/screens'
import { AppRoutes, HomeTabRoutes } from './config/AppRoutes'
import { setGlobalUser, setLoading } from './redux/slices/appReducer'
import Loader from './components/Loader'
import OrderScreen from './screens/PrivateScreens/OrderScreen'
import ProScreen from './screens/PrivateScreens/ProScreen'

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

  const TabStack = createBottomTabNavigator()
  if (initializing) return <Loader />

  if (user) {
    return (
      <TabStack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'OrderScreen') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline'
            } else if (route.name === 'ProScreen') {
              iconName = focused ? 'ios-list-box' : 'ios-list'
            }

            // You can return any component that you like here!
            return <Text>ICON</Text>
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {HomeTabRoutes.map(tab => (
          <TabStack.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={tab.options}
          />
        ))}
      </TabStack.Navigator>
    )
  }

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
