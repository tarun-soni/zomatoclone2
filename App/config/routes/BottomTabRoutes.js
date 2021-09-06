import {
  ORDER_TAB,
  PRO_TAB,
  USER_PROFILE_TAB,
  ADMIN_TAB,
} from '../../constants/screens'
import AdminTab from '../../screens/PrivateScreens/AdminTab'
import OrderTab from '../../screens/PrivateScreens/OrderTab'
import ProTab from '../../screens/PrivateScreens/ProTab/ProTab'
import UserProfileTab from '../../screens/PrivateScreens/UserProfileTab/UserProfileTab'

const BottomTabRoutes = [
  {
    name: ORDER_TAB,
    component: OrderTab,
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
  {
    name: ADMIN_TAB,
    component: AdminTab,
    options: {},
  },
]

export { BottomTabRoutes }
