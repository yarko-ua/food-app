import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		data: {
			photoURL: null,
			id: "",
			email: "",
			firstName: "",
			lastName: "",
			address: "",
			city: "",
			friends: null,
		},
		current: {
			photoURL: null,
			id: "",
			email: "",
			firstName: "",
			lastName: "",
			address: "",
			friends: null,
		},
		tempData: null,
	},
	reducers: {
		clearCurrentUser: (state) => {
			state.current = {
				photoURL: null,
				id: "",
				email: "",
				firstName: "",
				lastName: "",
				address: "",
				friends: null,
			}
		},
	},
})

const {
	// actions: { clearCurrentUser },
	reducer,
} = profileSlice

export default reducer
