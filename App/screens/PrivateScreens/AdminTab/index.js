import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AdminTabRoutes } from '../../../config/routes/BottomIndividualRoutes'
import { ADMIN_TAB_HOMESCREEN } from '../../../constants/screens'

const AdminTab = () => {
  const AdminTabStack = createNativeStackNavigator()

  return (
    <AdminTabStack.Navigator initialRouteName={ADMIN_TAB_HOMESCREEN}>
      {AdminTabRoutes.map(route => (
        <AdminTabStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </AdminTabStack.Navigator>
  )
}

export default AdminTab
