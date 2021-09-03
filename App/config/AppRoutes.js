import {
  EDIT_RESTO_SCREEN,
  HOMESCREEN,
  LOGINSCREEN,
  SIGNUPSCREEN,
} from '../constants/screens'
import EditRestoScreen from '../screens/PrivateScreens/EditRestoScreen'
import HomeScreen from '../screens/PrivateScreens/HomeScreen'
import LoginScreen from '../screens/PublicScreens/LoginScreen'
import SignUpScreen from '../screens/PublicScreens/SignUpScreen'

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
  {
    name: EDIT_RESTO_SCREEN,
    component: EditRestoScreen,
    options: { headerShown: true },
  },
]

export { AppRoutes }
