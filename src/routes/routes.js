// import loadable from '@loadable/component'

import { SignIn } from "features/auth/signIn/SignIn"
import { SignUp } from "features/auth/signUp/SignUp"
import { AppWrapper } from "features/app/AppWrapper"

import { 
  Recommendations,
  Settings ,
  Friends ,
  UserList ,
  UserLists ,
  Profile,
  ProfilePublic,
  Product
} from './lazy'



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
  // [ROUTES.PROFILE]: Profile,
  [ROUTES.PROFILE_PUBLIC]: ProfilePublic,
  [ROUTES.LISTS]: UserLists,
  [ROUTES.PRODUCTS_LISTS]: UserList,
  [ROUTES.PRODUCT]: Product,
  [ROUTES.FRIENDS]: Friends,
}

export const routeComponent = route => Components[route]


const ROUTER = [
  {
    path: ROUTES.SIGN_IN,
    exact: true,
    component: SignIn,
  },
  {
    path: ROUTES.SIGN_UP,
    exact: true,
    component: SignUp,
  },
  {
    path: ROUTES.PRODUCT,
    exact: true,
    component: Product,
  },
  {
    path: ROUTES.PROFILE_PUBLIC,
    exact: true,
    component: ProfilePublic,
  },
  {
    path: ROUTES.APP,
    exact: false,
    component: AppWrapper,
    isPrivate: true,
    routes: [
      {
        path: ROUTES.PROFILE,
        exact: true,
        component: Profile
      },
      {
        path: ROUTES.LISTS,
        exact: true,
        component: UserLists
      },
      {
        path: ROUTES.PRODUCTS_LISTS,
        exact: true,
        component: UserList
      },
      {
        path: ROUTES.FRIENDS,
        exact: true,
        component: Friends
      },
      {
        path: ROUTES.RECOMMENDATIONS,
        exact: true,
        component: Recommendations
      },
      {
        path: ROUTES.SETTINGS,
        exact: true,
        component: Settings
      },
    ]
  }
]

export default ROUTER