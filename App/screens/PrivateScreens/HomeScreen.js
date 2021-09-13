import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { firestore } from '../../config/firebase'
import {
  AdminBottomTabRoutes,
  BottomTabRoutes,
} from '../../config/routes/BottomTabRoutes'
import colors from '../../constants/colors'
import {
  ADMIN_TAB,
  DINE_OUT_TAB,
  LOGINSCREEN,
  ORDER_TAB,
  PRO_TAB,
  USER_PROFILE_TAB,
} from '../../constants/screens'
import {
  selectGlobalUser,
  updateGlobalUser,
} from '../../redux/slices/appReducer'

const HomeScreen = ({ navigation }) => {
  const Tab = createBottomTabNavigator()
  const user = useSelector(selectGlobalUser)
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUser() {
      try {
        if (user.id) {
          const usersCollection = await firestore()
            .collection('users')
            .doc(user.id)
            .get()

          if (!usersCollection._data) {
            Alert.alert('Error in fetching user details')
          }

          const { displayName, phoneNumber, isAdmin, email } =
            usersCollection._data
          setIsUserAdmin(isAdmin)
          dispatch(
            updateGlobalUser({ displayName, email, phoneNumber, isAdmin }),
          )
        } else {
          navigation.replace(LOGINSCREEN)
        }
      } catch (error) {
        console.log(`error`, error)
      }
    }

    getUser()
  }, [dispatch, navigation, user?.id])

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
      {isUserAdmin ? (
        <>
          {AdminBottomTabRoutes.map(route => (
            <Tab.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={route.options}
            />
          ))}
        </>
      ) : (
        <>
          {BottomTabRoutes.map(route => (
            <Tab.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={route.options}
            />
          ))}
        </>
      )}
    </Tab.Navigator>
  )
}

export default HomeScreen
