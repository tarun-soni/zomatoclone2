import {
  ADMIN_TAB_HOMESCREEN,
  DINEOUT_TAB_HOMESCREEN,
  EDIT_RESTO_SCREEN,
  ORDER_TAB_HOMESCREEN,
  RECIPE_INFO_SCREEN,
  RECIPE_TAB_HOMESCREEN,
  USER_PROFILE_TAB_HOMESCREEN,
} from '../../constants/screens'
import AdminTabHomeScreen from '../../screens/PrivateScreens/AdminTab/AdminTabHomeScreen'
import EditRestoScreen from '../../screens/PrivateScreens/AdminTab/EditRestoScreen'
import DineOutTabHomeScreen from '../../screens/PrivateScreens/DineOutTab/DineOutTabHomeScreen'
import OrderTabHomeScreen from '../../screens/PrivateScreens/OrderTab/OrderTabHomeScreen'
import RecipeInfoScreen from '../../screens/PrivateScreens/RecipeTab/RecipeInfoScreen'
import RecipeTabHomeScreen from '../../screens/PrivateScreens/RecipeTab/RecipeTabHomeScreen'
import UserProfileTabHomeScreen from '../../screens/PrivateScreens/UserProfileTab/UserProfileTabHomeScreen'

const DineOutRoutes = [
  {
    name: DINEOUT_TAB_HOMESCREEN,
    component: DineOutTabHomeScreen,
    options: { headerShown: false },
  },
]

const AdminTabRoutes = [
  {
    name: ADMIN_TAB_HOMESCREEN,
    component: AdminTabHomeScreen,
    options: { headerShown: true },
  },
  {
    name: EDIT_RESTO_SCREEN,
    component: EditRestoScreen,
    options: { headerShown: true },
  },
]

const OrderRoutes = [
  {
    name: ORDER_TAB_HOMESCREEN,
    component: OrderTabHomeScreen,
    options: { headerShown: true },
  },
]

const RecipeTabRoutes = [
  {
    name: RECIPE_TAB_HOMESCREEN,
    component: RecipeTabHomeScreen,
    options: { headerShown: false },
  },
  {
    name: RECIPE_INFO_SCREEN,
    component: RecipeInfoScreen,
    options: { headerShown: false },
  },
]

const UserProfileTabRoutes = [
  {
    name: USER_PROFILE_TAB_HOMESCREEN,
    component: UserProfileTabHomeScreen,
    options: { headerShown: true },
  },
]

export {
  OrderRoutes,
  AdminTabRoutes,
  DineOutRoutes,
  RecipeTabRoutes,
  UserProfileTabRoutes,
}
