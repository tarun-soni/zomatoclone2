import {
  LOGINSCREEN,
  HOMESCREEN,
  SIGNUPSCREEN,
  ORDER_TAB,
  GO_OUT_TAB,
  PRO_TAB,
  USER_PROFILE_TAB,
} from '../constants/screens'
import HomeScreen from '../screens/PrivateScreens/HomeScreen'
import LoginScreen from '../screens/PublicScreens/LoginScreen'
import SignUpScreen from '../screens/PublicScreens/SignUpScreen'
import OrderScreen from '../screens/PrivateScreens/OrderScreen'
import ProScreen from '../screens/PrivateScreens/ProScreen'
import UserProfileScreen from '../screens/PrivateScreens/UserProfileScreen'

const AppRoutes = [
  {
    name: HOMESCREEN,
    component: HomeScreen,
    options: { headerShown: false },
  },
  {
    name: LOGINSCREEN,
    component: LoginScreen,
    options: { headerShown: false },
  },
  {
    name: SIGNUPSCREEN,
    component: SignUpScreen,
    options: { headerShown: false },
  },
]

const HomeTabRoutes = [
  {
    name: ORDER_TAB,
    component: OrderScreen,
    options: { headerShown: false },
  },
  // {
  //   name: GO_OUT_TAB,
  //   component: LoginScreen,
  //   options: { headerShown: false },
  // },
  {
    name: PRO_TAB,
    component: ProScreen,
    options: { headerShown: false },
  },
  {
    name: USER_PROFILE_TAB,
    component: UserProfileScreen,
    options: { headerShown: false },
  },
]

export { AppRoutes, HomeTabRoutes }
