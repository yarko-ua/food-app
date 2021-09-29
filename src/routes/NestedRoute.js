import { Route } from "react-router"
import PrivateRoute from "./PrivateRoute"

const NestedRoute = ({
  isPrivate = false,
  component: Component,
  routes = null,
  ...props
}) => {

  if (isPrivate) {
    if (routes)
      return <PrivateRoute {...props} >
        <Component routes={routes} />
      </PrivateRoute>

    return <PrivateRoute {...props} component={Component} />
  }

  if (routes)
    return <Route {...props}>
      <Component routes={routes}/>
    </Route>


  return <Route {...props} component={Component} />
} 


export default NestedRoute;