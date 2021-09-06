import { HOMESCREEN, LOGINSCREEN, SIGNUPSCREEN } from '../../constants/screens'
import LoginScreen from '../../screens/PublicScreens/LoginScreen'
import SignUpScreen from '../../screens/PublicScreens/SignUpScreen'
import HomeScreen from '../../screens/PrivateScreens/HomeScreen'

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

export { AppRoutes }
