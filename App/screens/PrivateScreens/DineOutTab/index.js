import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { DineOutRoutes } from '../../../config/routes/BottomIndividualRoutes'
import { DINEOUT_TAB_HOMESCREEN } from '../../../constants/screens'

const DineOutTab = () => {
  const DineOutTabStack = createNativeStackNavigator()

  return (
    <DineOutTabStack.Navigator initialRouteName={DINEOUT_TAB_HOMESCREEN}>
      {DineOutRoutes.map(route => (
        <DineOutTabStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </DineOutTabStack.Navigator>
  )
}

export default DineOutTab
