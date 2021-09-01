import { CircularProgress, Grid } from "@material-ui/core"
import { useEffect, useMemo, useState } from "react"
// import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import fbApp, { auth } from "../../app/firebase"
import { loadState } from "../../helpers/appState"
// import { UserList } from "../app/userList/UserList"
// import { SignIn } from "./signIn/SignIn"
// import { SignUp } from "./signUp/SignUp"
import { setUser } from "./authSlice"
import { useDispatch } from "react-redux"

export const AuthWrapper = ({children}) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  // const history = useHistory()

  const user = useMemo( () => loadState('user'), [] )

  console.log(`user`, user)

  useEffect(() => {

    if (user) {
      const auth = firebase.auth(fbApp)

      auth.onAuthStateChanged(userCredential => {
        console.log(`userCredential`, userCredential)

        const data = userCredential ? 
          {
            uid: userCredential.uid,
            displayName: userCredential.displayName
          }
          : null

        dispatch(setUser(data))

        // if (!userCredential) {
        //   history.push('/signin')
        // } else {
        //   history.push('/lists')
        // }

        setTimeout(() => {
          setLoading(false)
        }, 1000)

      })

    } else {
      // history.push('/signin')
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

  }, [dispatch, user])

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{height: '100%', width: '100%'}}>
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <>
      { children }
    </>
  )
}