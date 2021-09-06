import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OrderRoutes } from '../../../config/routes/BottomIndividualRoutes'
import { ORDER_TAB_HOMESCREEN } from '../../../constants/screens'

const OrderTab = () => {
  const OrderTabSctak = createNativeStackNavigator()

  return (
    <OrderTabSctak.Navigator initialRouteName={ORDER_TAB_HOMESCREEN}>
      {OrderRoutes.map(route => (
        <OrderTabSctak.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </OrderTabSctak.Navigator>
  )
}

export default OrderTab
