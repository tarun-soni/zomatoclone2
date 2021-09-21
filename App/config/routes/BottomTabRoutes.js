import {
  ORDER_TAB,
  USER_PROFILE_TAB,
  ADMIN_TAB,
  DINE_OUT_TAB,
  RECIPE_TAB,
} from '../../constants/screens'
import AdminTab from '../../screens/PrivateScreens/AdminTab'
import DineOutTabHomeScreen from '../../screens/PrivateScreens/DineOutTab/DineOutTabHomeScreen'
import OrderTab from '../../screens/PrivateScreens/OrderTab'
import RecipeTab from '../../screens/PrivateScreens/RecipeTab'
import UserProfileTab from '../../screens/PrivateScreens/UserProfileTab'

const BottomTabRoutes = [
  {
    name: ORDER_TAB,
    component: OrderTab,
    options: { headerShown: false },
  },
  {
    name: DINE_OUT_TAB,
    component: DineOutTabHomeScreen,
    options: { headerShown: false },
  },
  {
    name: RECIPE_TAB,
    component: RecipeTab,
    options: { headerShown: false },
  },
  {
    name: USER_PROFILE_TAB,
    component: UserProfileTab,
    options: { headerShown: false },
  },
]
const AdminBottomTabRoutes = [
  ...BottomTabRoutes,
  {
    name: ADMIN_TAB,
    component: AdminTab,
    options: { headerShown: false },
  },
]

export { BottomTabRoutes, AdminBottomTabRoutes }
