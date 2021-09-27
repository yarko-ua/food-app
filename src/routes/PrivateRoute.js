import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";
import { isAuthSelector } from "selectors/auth";
import { ROUTES } from "./routes";

const PrivateRoute = ({component: Component, ...props}) => {
  const isAuth = useSelector(isAuthSelector);

  console.log(`auth in private route`, isAuth)

  // if (!auth)
  //   return <Redirect to="/signin" />

  return (
    <Route {...props} render={({location}) => {
      console.log(`location`, location)
      return isAuth ?  
        <Component />
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