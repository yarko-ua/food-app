import { combineReducers } from "redux"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authReducer from "features/user/auth/authSlice"
import profileReducer from "features/user/profile/profileSlice"
import { signIn, signUp, signOut } from "firebaseconfig/authActions"
import { saveState } from "helpers/appState"

const initialState = {
	id: null,
	displayName: null,
}

export const signInUser = createAsyncThunk(
	"user/signIn",
	async ({ email, password }) => {
		try {
			const user = await signIn(email, password)

			console.log("signin response", user)

			saveState("user", { uid: user.uid })

			return user
		} catch (e) {
			console.log(`e`, e)
			throw new Error(e.message)
		}
	}
)

export const signUpUser = createAsyncThunk(
	"user/signUp",
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

export const signOutUser = createAsyncThunk("user/signOut", async () => {
	const response = await signOut()

	saveState("user", null)

	console.log(`signout response`, response)
})

export const updatePassword = createAsyncThunk(
	"profile/updatePassword",
	async ({ password }, thunkAPI) => {
		const user = firebase.auth(fbApp).currentUser

		if (password) {
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

					const reauth = thunkAPI.dispatch(requestReauth(UPDATE_PASSWORD))

					console.log(`reauth`, reauth)

					return {
						reauth: true,
						password,
					}
				}
			}
		}
	}
)

export const updateEmail = createAsyncThunk(
	"profile/updateEmail",
	async ({ email, onSuccess = null }, thunkAPI) => {
		const user = firebase.auth(fbApp).currentUser

		console.log(`user`, user)

		if (email) {
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

					const reauth = thunkAPI.dispatch(requestReauth(UPDATE_EMAIL))

					console.log(`reauth`, reauth)

					return {
						reauth: true,
						email,
					}
				}
			}
		}

		return undefined
	}
)

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		initUser: (state, action) => action.payload,
		destroyUser: () => initialState,
	},
})

const { reducer } = userSlice

export default combineReducers({
	_default: reducer,
	auth: authReducer,
	profile: profileReducer,
})
