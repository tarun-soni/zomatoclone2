import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { BottomTabRoutes } from '../../config/routes/BottomTabRoutes'
import colors from '../../constants/colors'
import {
  ADMIN_TAB,
  DINE_OUT_TAB,
  ORDER_TAB,
  PRO_TAB,
  USER_PROFILE_TAB,
} from '../../constants/screens'

const HomeScreen = () => {
  const Tab = createBottomTabNavigator()

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
      {BottomTabRoutes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  )
}

export default HomeScreen
