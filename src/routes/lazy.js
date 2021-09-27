import loadable from '@loadable/component'
// import Loadable from 'react-loadable'
import { ROUTES } from './routes'

export const ComponentsPath = {
  [ROUTES.SIGN_IN]: "features/auth/signIn/SignIn",
  [ROUTES.SIGN_UP]: "features/auth/signUp/SignUp",
  [ROUTES.PROFILE]: "features/app/profile/Profile",
  [ROUTES.PROFILE_PUBLIC]: "features/app/profile/ProfilePublic",
  [ROUTES.LISTS]: "features/app/userLists/UserLists",
  [ROUTES.PRODUCTS_LISTS]: "features/app/userList/UserList",
  [ROUTES.PRODUCT]: "features/product/Product",
  [ROUTES.FRIENDS]: "features/app/friends/Friends",

}

export const lazyRouteComponent = route => loadable(() => import(ComponentsPath[route]))

// export const lazyRouteComponent = (route) => Loadable({
//   loader: () => import(`${ComponentsPath[route]}`),
//   loading(){return <div>Loading...</div>}
// })

console.log(`lazyRouteComponent`, lazyRouteComponent(ROUTES.LISTS) )