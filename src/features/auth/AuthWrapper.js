import { CircularProgress, Grid } from "@material-ui/core"
import { useEffect, useMemo, useState, useContext, useCallback } from "react"
import PropTypes from "prop-types"
import firebase from "firebase/app"
import fbApp from "firebaseconfig/firebase"
import { loadState } from "helpers/appState"
import { useDispatch, useSelector } from "react-redux"
import { getUserFullInfo } from "features/app/profile/profileSlice"
import { isAuthSelector } from "selectors/auth"
import { ModalContext } from "features/modal/Modal"
import ReauthPassword from "components/forms/reauthPassword/ReauthPassword"
import { reauthUser, setUser, withdrawReauth } from "./authSlice"

const AuthWrapper = ({ children }) => {
	const authState = useSelector(isAuthSelector)
	const { reauth: isRequireReauth, reauthInProgress } = useSelector(
		(state) => state.auth
	)
	console.log(`auth in authWrapp`, authState)

	const [loading, setLoading] = useState(true)
	const [isAuth, setIsAuth] = useState(authState)
	const dispatch = useDispatch()

	const user = useMemo(() => loadState("user"), [])

	const modal = useContext(ModalContext)
	console.log(`MODAL`, modal)

	console.log(`user`, user)

	const handleReauth = useCallback(
		({ password }) => {
			dispatch(
				reauthUser({
					password,
					stateDataPath: "user.tempData",
				})
			)
		},
		[dispatch]
	)

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
				// TODO: wait for setting user !!!!
				// dispatch(getUserFullInfo())

				setIsAuth(true)
			})
		} else {
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

	useEffect(() => {
		modal.setCloseCallback(() => {
			dispatch(withdrawReauth())
		})
	}, [modal, dispatch])

	// Handling auth specific data with reauthentication a user
	useEffect(() => {
		if (isRequireReauth) {
			modal.setContentRender(() => (
				<ReauthPassword handleSubmit={handleReauth} />
			))
			modal.setIsOpen(true)
		}

		if (!isRequireReauth && reauthInProgress) {
			modal.handleClose()
			dispatch(withdrawReauth())
		}

		return () => {
			console.log(`authWrapper unmount / modal: `, modal)
			// modal.handleClose()
		}
	}, [modal, isRequireReauth, handleReauth, reauthInProgress, dispatch])

	console.log(`loading`, loading)

	return loading ? (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			style={{ height: "100%", width: "100%" }}
		>
			<CircularProgress />
		</Grid>
	) : (
		<> {children}</>
	)
}

AuthWrapper.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AuthWrapper
