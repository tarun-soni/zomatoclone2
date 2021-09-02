import React, { useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import {
  ADMIN_TAB,
  DINE_OUT_TAB,
  LOGINSCREEN,
  ORDER_TAB,
  PRO_TAB,
  USER_PROFILE_TAB,
} from './constants/screens'
import { AppRoutes } from './config/AppRoutes'
import { setGlobalUser, setLoading } from './redux/slices/appReducer'
import Loader from './components/Loader'
import OrderScreen from './screens/PrivateScreens/OrderScreen'
import ProScreen from './screens/PrivateScreens/ProScreen'
import DineOutScreen from './screens/PrivateScreens/DineOutScreen'
import UserProfileScreen from './screens/PrivateScreens/UserProfileScreen'
import colors from './constants/colors'
import AdminScreen from './screens/PrivateScreens/AdminScreen'

const Main = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  // Handle user state changes
  useEffect(() => {
    const onAuthStateChanged = (_user = {}) => {
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
  const Tab = createBottomTabNavigator()

  if (initializing) return <Loader />

  if (user) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName

            switch (route.name) {
              case ORDER_TAB:
                iconName = 'shopping-basket'
                break
              case DINE_OUT_TAB:
                iconName = 'brunch-dining'
                break
              case PRO_TAB:
                iconName = 'shield'
                break
              case USER_PROFILE_TAB:
                iconName = 'person'
                break
              case ADMIN_TAB:
                iconName = 'admin-panel-settings'
                break
              default:
                break
            }
            return <Icon name={iconName} color={color} type="MaterialIcons" />
          },
          tabBarActiveTintColor: colors.buttonRed,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name={ORDER_TAB} component={OrderScreen} />
        <Tab.Screen name={DINE_OUT_TAB} component={DineOutScreen} />
        <Tab.Screen name={PRO_TAB} component={ProScreen} />
        <Tab.Screen name={USER_PROFILE_TAB} component={UserProfileScreen} />
        <Tab.Screen name={ADMIN_TAB} component={AdminScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <MainStack.Navigator initialRouteName={LOGINSCREEN}>
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
