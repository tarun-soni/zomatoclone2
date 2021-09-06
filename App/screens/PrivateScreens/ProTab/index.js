import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProTabRoutes } from '../../../config/routes/BottomIndividualRoutes'
import { PRO_TAB_HOMESCREEN } from '../../../constants/screens'

const ProTab = () => {
  const ProTabStack = createNativeStackNavigator()

  return (
    <ProTabStack.Navigator initialRouteName={PRO_TAB_HOMESCREEN}>
      {ProTabRoutes.map(route => (
        <ProTabStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </ProTabStack.Navigator>
  )
}

export default ProTab
