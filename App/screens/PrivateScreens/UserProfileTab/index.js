import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserProfileTabRoutes } from '../../../config/routes/BottomIndividualRoutes'
import { USER_PROFILE_TAB_HOMESCREEN } from '../../../constants/screens'

const UserProfileTab = () => {
  const UserProfileTabStack = createNativeStackNavigator()

  return (
    <UserProfileTabStack.Navigator
      initialRouteName={USER_PROFILE_TAB_HOMESCREEN}
    >
      {UserProfileTabRoutes.map(route => (
        <UserProfileTabStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </UserProfileTabStack.Navigator>
  )
}

export default UserProfileTab
