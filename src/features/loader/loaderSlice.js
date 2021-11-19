import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	loading: false,
}

const loaderReducer = createSlice({
	name: "loader",
	initialState,
	extraReducers: (builder) => {
		builder.addCase()
	},
})
