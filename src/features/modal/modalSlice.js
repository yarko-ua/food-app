const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
  renderPath: null
}

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    add: (state, action) => {
      state.renderPath = action.payload
    }
  }
})

export default modal.reducer