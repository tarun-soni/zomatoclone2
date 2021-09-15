import {
  ORDER_TAB,
  PRO_TAB,
  USER_PROFILE_TAB,
  ADMIN_TAB,
  DINE_OUT_TAB,
} from '../../constants/screens'
import AdminTab from '../../screens/PrivateScreens/AdminTab'
import DineOutTabHomeScreen from '../../screens/PrivateScreens/DineOutTab/DineOutTabHomeScreen'
import OrderTab from '../../screens/PrivateScreens/OrderTab'
import ProTab from '../../screens/PrivateScreens/ProTab'
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
    name: PRO_TAB,
    component: ProTab,
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
