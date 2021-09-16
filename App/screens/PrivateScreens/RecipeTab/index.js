import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RecipeTabRoutes } from '../../../config/routes/BottomIndividualRoutes'
import { RECIPE_TAB_HOMESCREEN } from '../../../constants/screens'

const RecipeTab = () => {
  const RecipeTabStack = createNativeStackNavigator()

  return (
    <RecipeTabStack.Navigator initialRouteName={RECIPE_TAB_HOMESCREEN}>
      {RecipeTabRoutes.map(route => (
        <RecipeTabStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </RecipeTabStack.Navigator>
  )
}

export default RecipeTab
