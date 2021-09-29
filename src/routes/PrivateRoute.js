import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";
import { isAuthSelector } from "selectors/auth";
import { ROUTES } from "./routes";

const PrivateRoute = ({
  component: Component,
  children = null,
  ...props
}) => {
  const isAuth = useSelector(isAuthSelector);

  return (
    <Route {...props} render={({location, ...subprops}) => {
      return isAuth ?  
        ( 
          Component ? <Component {...subprops} /> : children
        )
        :
        <Redirect to={{
            pathname: ROUTES.SIGN_IN,
            state: {
              from : location
            }
        }}/>
    }} />
  )

  
} 


export default PrivateRoute;