import { CircularProgress, Grid } from "@material-ui/core"
import { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import firebase from "firebase/app"
import fbApp from "firebaseconfig/firebase"
import { loadState } from "helpers/appState"
import { useDispatch, useSelector } from "react-redux"
import { getUserFullInfo } from "features/app/profile/profileSlice"
import { isAuthSelector } from "selectors/auth"
import { setUser } from "./authSlice"

const AuthWrapper = ({ children }) => {
	const authState = useSelector(isAuthSelector)

	console.log(`auth in authWrapp`, authState)

	const [loading, setLoading] = useState(true)
	const [isAuth, setIsAuth] = useState(authState)
	const dispatch = useDispatch()

	const user = useMemo(() => loadState("user"), [])

	console.log(`user`, user)

	useEffect(() => {
		if (user) {
			const auth = firebase.auth(fbApp)

			auth.onAuthStateChanged((userCredential) => {
				console.log(`userCredential`, userCredential)

				const data = userCredential
					? {
							uid: userCredential.uid,
							displayName: userCredential.displayName,
					  }
					: null

				dispatch(setUser(data))
				// wait for setting user !!!!
				// dispatch(getUserFullInfo())

				setIsAuth(true)

				// setTimeout(() => {
				//   setLoading(false)
				// }, 1000)
			})
		} else {
			// history.push('/signin')
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		}
	}, [dispatch, user])

	useEffect(() => {
		if (isAuth) {
			dispatch(getUserFullInfo())

			setTimeout(() => {
				setLoading(false)
			}, 1000)
		}
	}, [dispatch, isAuth])

	if (loading) {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ height: "100%", width: "100%" }}
			>
				<CircularProgress />
			</Grid>
		)
	}

	return { children }
}

AuthWrapper.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AuthWrapper
