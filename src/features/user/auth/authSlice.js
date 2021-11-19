import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuth: null,
		reauth: null,
		reauthInProgress: false,
	},
	reducers: {
		requestReauth: (state) => {
			state.reauth = true
			state.reauthInProgress = true
		},
		withdrawReauth: (state) => {
			state.reauth = false
			state.reauthInProgress = false
		},
	},
})

const {
	actions: { requestReauth, withdrawReauth },
	reducer,
} = authSlice

export default reducer

export { requestReauth, withdrawReauth }
