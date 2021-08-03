import { Grid } from "@material-ui/core"
import { Redirect, Route, Switch } from "react-router-dom"
import { SignIn } from "./signIn/SignIn"
import { SignUp } from "./signUp/SignUp"

export const AuthWrapper = () => {

  return (
    <>

      <Switch>
        <Route exact path="/auth/sign-in" component={SignIn} />
        <Route exact path="/auth/sign-up" component={SignUp} />
        <Redirect to="/auth/sign-in" />
      </Switch>

    </>
  )
}