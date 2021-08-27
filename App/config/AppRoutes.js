import { LOGINSCREEN, HOMESCREEN } from '../constants/screens'
import HomeScreen from '../screens/PrivateScreens/HomeScreen'
import LoginScreen from '../screens/PublicScreens/LoginScreen'

const AppRoutes = [
  {
    name: HOMESCREEN,
    component: HomeScreen,
    options: { headerShown: false },
  },

  {
    name: LOGINSCREEN,
    component: LoginScreen,
    options: {},
  },
]

export default AppRoutes
