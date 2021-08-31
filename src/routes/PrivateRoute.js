import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, ...props}) => {
  const auth = useSelector(state => state.user.auth);

  console.log(`auth in private route`, auth)

  if (!auth)
    return <Redirect to="/auth" />

  return <Route {...props} component={Component}/>

  
} 


export default PrivateRoute;