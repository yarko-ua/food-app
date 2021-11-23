import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { updateEmail, updatePassword } from 'features/app/profile/profileSlice';
// import { updateEmail } from 'features/app/profile/profileSlice';
import firebase from "firebase/app"
import "firebase/auth"
import fbApp, { fbdb } from "firebaseconfig/firebase"
import { objectValueByStringKey } from "helpers/objects"
import { saveState } from "helpers/appState"
import { signIn, signOut, signUp } from "./authAPI"
import { UPDATE_EMAIL, UPDATE_PASSWORD } from "./constants"

const initialState = {
	isAuth: null,
	loading: false,
	data: null,
	reauth: false,
	reauthInProgress: false,
	onReauthAction: null,
	tempData: null,
}

export const signInUser = createAsyncThunk(
	"auth/signIn",
	async ({ email, password }) => {
		// try {
		const user = await signIn(email, password)

		console.log("signin response", user)

		saveState("user", { uid: user.uid })

		await new Promise((res) => {
			setTimeout(() => {
				res(1)
			}, 2500)
		})

		console.log(`signin end`)

		return user
		// } catch (e) {
		//   console.log(`e`, e)
		//   throw new Error(e)
		// }
	}
)

export const signUpUser = createAsyncThunk(
	"auth/signUp",
	async ({ email, password, name, photo }) => {
		try {
			const user = await signUp(email, password, name, photo)

			saveState("user", { uid: user.uid })

			console.log("signup response", user)

			return user
		} catch (error) {
			console.log(`error`, error)
			throw new Error(error)
		}
	}
)

export const signOutUser = createAsyncThunk("auth/signOut", async () => {
	const response = await signOut()

	saveState("user", null)

	console.log(`signout response`, response)
})

export const updateUser = createAsyncThunk("auth/updateUser", async (data) => {
	try {
		const user = firebase.auth(fbApp).currentUser

		console.log(`user`, user)

		const userOptions = {
			photoURL: data.photoURL,
		}

		const response = await user.updateProfile(userOptions)
		console.log(`response`, response)
		return true
	} catch (error) {
		console.log(`error`, error)
		throw new Error(error.message)
	}
})

export const updatePassword = createAsyncThunk(
	"auth/updatePassword",
	async ({ password }, thunkAPI) => {
		if (password) {
			const user = firebase.auth(fbApp).currentUser

			try {
				const updatingPass = await user.updatePassword(password)

				console.log(`updatingPass`, updatingPass)

				return {
					reauth: false,
					password,
				}
			} catch (error) {
				console.log(`error`, error)

				if (error.code === "auth/requires-recent-login") {
					console.log("show login modal")

					const reauth = thunkAPI.dispatch({
						type: "auth/requestReauth",
						payload: UPDATE_PASSWORD,
					})

					console.log(`reauth`, reauth)

					return {
						reauth: true,
						password,
					}
				}
			}
		}

		throw new Error("Fill the password field, please")
	}
)

export const updateEmail = createAsyncThunk(
	"auth/updateEmail",
	async ({ email, onSuccess = null }, thunkAPI) => {
		if (email) {
			const user = firebase.auth(fbApp).currentUser

			console.log(`user`, user)

			try {
				const updatingEmail = await user.updateEmail(email)
				console.log(`updatingEmail`, updatingEmail) // undefined when success

				const userRef = fbdb.doc(`users/${user.uid}`)

				const updatingUser = await userRef.update({ email })

				console.log(`updatingUser`, updatingUser) // undefined when success

				console.log(`onSuccess`, onSuccess)

				if (onSuccess) onSuccess()

				return {
					reauth: false,
					email,
				}
			} catch (error) {
				console.log(`error`, error)

				if (error.code === "auth/requires-recent-login") {
					console.log("show login modal")

					const reauth = thunkAPI.dispatch({
						type: "auth/requestReauth",
						payload: UPDATE_EMAIL,
					})

					console.log(`reauth`, reauth)

					return {
						reauth: true,
						email,
					}
				}

				throw new Error(error.message)
			}
		}

		throw new Error("Fill the email field, please")
	}
)

export const reauthUser = createAsyncThunk(
	"auth/reauth",
	async ({ password, stateDataPath = null }, thunkAPI) => {
		// console.log(`actionCreator`, actionCreator)

		try {
			const user = firebase.auth(fbApp).currentUser
			const state = thunkAPI.getState()
			const { email } = state.user.data
			const { onReauthAction } = state

			const credential = await firebase.auth.EmailAuthProvider.credential(
				email,
				password
			)

			console.log(`credential`, credential)

			// firebase recomment use it before specific actions like updatePassword
			const reauthResponse = await user.reauthenticateWithCredential(credential)

			console.log(`reauthResponse`, reauthResponse)

			// if (actionCreator) {
			//   const actionData = objectValueByStringKey(state, stateDataPath)
			//   console.log(`actionData`, actionData)

			//   const dispatch = await thunkAPI.dispatch(actionCreator(actionData))

			//   console.log(`dispatch`, dispatch)
			//   // thunkAPI.dispatch(updateEmail())
			// }

			if (stateDataPath && onReauthAction) {
				const actionData = objectValueByStringKey(state, stateDataPath)
				console.log(`actionData`, actionData)

				const retryOperation =
					(onReauthAction === UPDATE_EMAIL && updateEmail) ||
					(onReauthAction === UPDATE_PASSWORD && updatePassword) ||
					null

				// const dispatch = await thunkAPI.dispatch(
				// 	specificActions[onReauthAction](actionData)
				// )

				console.log(`retryOperation`, retryOperation)

				if (retryOperation) {
					const dispatch = await thunkAPI.dispatch(retryOperation(actionData))

					console.log(`dispatch`, dispatch)
				}
			}

			/** reuturn ??? */
			return true
		} catch (error) {
			console.log(`error`, error)
			throw new Error(error.message)
		}
	}
)

const authReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			console.log(`action`, action)
			state.data = action.payload
			state.isAuth = Boolean(action.payload)
		},
		requestReauth: (state, action) => {
			state.reauth = true
			state.reauthInProgress = true
			state.onReauthAction = action.payload
		},
		withdrawReauth: (state) => {
			state.reauth = false
			state.reauthInProgress = false
			state.onReauthAction = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signInUser.pending, (state) => {
				state.loading = true
			})
			.addCase(signInUser.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
				state.isAuth = true
			})
			.addCase(signInUser.rejected, (state) => {
				state.loading = false
				state.data = null
			})

			.addCase(signUpUser.pending, (state) => {
				state.loading = true
			})
			.addCase(signUpUser.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
				state.isAuth = true
			})
			.addCase(signUpUser.rejected, (state, action) => {
				state.loading = false
				state.data = action.payload
			})

			.addCase(signOutUser.pending, (state) => {
				state.loading = true
			})
			.addCase(signOutUser.fulfilled, (state) => {
				state.loading = false
				state.data = null
				state.isAuth = false
			})
			.addCase(signOutUser.rejected, (state) => {
				state.loading = false
			})

			.addCase(reauthUser.fulfilled, (state) => {
				state.reauth = false
			})

			.addCase(updatePassword.fulfilled, (state, action) => {
				if (action.payload.reauth)
					state.tempData = { password: action.payload.password }
			})

			.addCase(updateEmail.fulfilled, (state, action) => {
				if (action.payload.reauth)
					state.tempData = { email: action.payload.email }

				if (!action.payload.reauth) {
					state.data.email = action.payload.email
					state.tempData = null
				}
			})
	},
})

export const {
	actions: { setUser, requestReauth, withdrawReauth },
	reducer,
} = authReducer

export default reducer
