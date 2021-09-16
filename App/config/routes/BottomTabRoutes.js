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
    options: {},
  },
  {
    name: DINE_OUT_TAB,
    component: DineOutTabHomeScreen,
    options: {},
  },
  {
    name: RECIPE_TAB,
    component: RecipeTab,
    options: {},
  },
  {
    name: USER_PROFILE_TAB,
    component: UserProfileTab,
    options: {},
  },
]
const AdminBottomTabRoutes = [
  ...BottomTabRoutes,
  {
    name: ADMIN_TAB,
    component: AdminTab,
    options: {},
  },
]

export { BottomTabRoutes, AdminBottomTabRoutes }
