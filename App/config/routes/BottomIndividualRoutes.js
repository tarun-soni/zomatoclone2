import {
  ADMIN_TAB_HOMESCREEN,
  DINEOUT_TAB_HOMESCREEN,
  EDIT_RESTO_SCREEN,
  ORDER_TAB_HOMESCREEN,
} from '../../constants/screens'
import AdminTabHomeScreen from '../../screens/PrivateScreens/AdminTab/AdminTabHomeScreen'
import EditRestoScreen from '../../screens/PrivateScreens/AdminTab/EditRestoScreen'
import DineOutTabHomeScreen from '../../screens/PrivateScreens/DineOutTab/DineOutTabHomeScreen'
import OrderTabHomeScreen from '../../screens/PrivateScreens/OrderTab/OrderTabHomeScreen'

const DineOutRoutes = [
  {
    name: DINEOUT_TAB_HOMESCREEN,
    component: DineOutTabHomeScreen,
    options: { headerShown: true },
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

export { OrderRoutes, AdminTabRoutes, DineOutRoutes }
