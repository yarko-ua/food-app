import { Friends } from "features/app/friends/Friends"
import { Profile } from "features/app/profile/Profile"
import { ProfilePublic } from "features/app/profile/ProfilePublic"
import { UserList } from "features/app/userList/UserList"
import { UserLists } from "features/app/userLists/UserLists"
import { SignIn } from "features/auth/signIn/SignIn"
import { SignUp } from "features/auth/signUp/SignUp"
import { Product } from "features/product/Product"

export const ROUTES = {
  APP: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  PROFILE_PUBLIC: '/profile/:userID',
  LISTS: '/lists',
  PRODUCTS_LISTS: '/lists/:listID',
  PRODUCT: '/product/:productID',
  FRIENDS: '/friends',
  RECOMMENDATIONS: '/recommendations',
  SETTINGS: '/settings',
}

const Components = {
  [ROUTES.SIGN_IN]: SignIn,
  [ROUTES.SIGN_UP]: SignUp,
  [ROUTES.PROFILE]: Profile,
  [ROUTES.PROFILE_PUBLIC]: ProfilePublic,
  [ROUTES.LISTS]: UserLists,
  [ROUTES.PRODUCTS_LISTS]: UserList,
  [ROUTES.PRODUCT]: Product,
  [ROUTES.FRIENDS]: Friends,
}

export const routeComponent = route => Components[route]