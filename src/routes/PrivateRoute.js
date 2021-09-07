import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, ...props}) => {
  const auth = useSelector(state => state.auth.auth);

  console.log(`auth in private route`, auth)

  // if (!auth)
  //   return <Redirect to="/signin" />

  return (
    <Route {...props} render={({location}) => {
      console.log(`location`, location)
      return auth ?  
        <Component />
        :
        <Redirect to={{
            pathname: '/signin',
            state: {
              from : location
            }
        }}/>
    }} />
  )

  
} 


export default PrivateRoute;