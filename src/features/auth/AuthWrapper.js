import { CircularProgress, Grid } from "@material-ui/core"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import firebase from 'firebase/app'
import fbApp, { auth } from "../../app/firebase"
import { loadState } from "../../helpers/appState"
import { UserList } from "../app/userList/UserList"
import { SignIn } from "./signIn/SignIn"
import { SignUp } from "./signUp/SignUp"
import { setUser } from "./authSlice"
import { useDispatch } from "react-redux"

// export const AuthWrapper = () => {

//   return (
//     <>

//       <Switch>
//         <Route exact path="/auth/sign-in" component={SignIn} />
//         <Route exact path="/auth/sign-up" component={SignUp} />
//         <Redirect to="/auth/sign-in" />
//       </Switch>

//     </>
//   )
// }

export const AuthWrapperTest = ({children}) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useMemo( () => loadState('user'), [] )

  console.log(`user`, user)

  useEffect(() => {

    if (user) {
      const auth = firebase.auth(fbApp)

      auth.onAuthStateChanged(userCredential => {
        console.log(`user`, userCredential)

        const data = userCredential ? 
          {
            uid: userCredential.uid,
            displayName: userCredential.displayName
          }
          : null

        dispatch(setUser(data))

        if (!userCredential) {
          history.push('/signin')
        } else {
          history.push('/lists')
        }

        setTimeout(() => {
          setLoading(false)
        }, 3000)

      })

    } else {
      history.push('/signin')
      console.log(`a`)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

  }, [dispatch, history, user])

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

// const AuthContext = createContext()
// export const useAuth = () => useContext(AuthContext)


// export const AuthProvider = ({children}) => {
//   const [user, setUser] = useState(auth.currentUser)
//   const [initializing, setInitializing] = useState(Boolean(user))

//   auth.onAuthStateChanged(user => {
//     console.log('user', user)
//     setUser(user)
//   })

//   const value = {
//     user,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }