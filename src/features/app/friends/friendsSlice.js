import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fbdb } from "../../../app/firebase";
import { getUserFullInfo } from "../profile/profileSlice";

const initialState = {
  data: [],
  suggestion: null,
  loading: false
}

export const getFriends = createAsyncThunk(
  'friends/get',
  async (_, thunkAPI) => {
    const { friends } = thunkAPI.getState().user.data

    const promises = []

    if (friends && friends.length > 0) {
      for (let i = 0; i < friends.length; i++) {
        const friendID = friends[i];

        promises.push(
          thunkAPI.dispatch(getUserFullInfo(friendID))
        )
      }

      const friendsList = (await Promise.allSettled(promises))
        .filter(promise => promise.status === 'fulfilled')
        .map(promise => promise.value)

        console.log(`getFriends friendsList`, friendsList)

      return {
        data: friendsList,
        type: 'data'
      }
    } else {
      const sugested = await thunkAPI.dispatch(getSuggestedPeople())

      console.log(`sugested`, sugested)

      return {
        data: sugested.payload,
        type: 'suggestion'
      }
    }
  }
)

export const getSuggestedPeople = createAsyncThunk(
  'friends/suggested',
  async (_, thunkAPI) => {
    const user = thunkAPI.getState().user.data

    try {
      const listOfUsers = await fbdb.collection('users').where('__name__', '!=', user.id ).get()
      // comment for above: __name__ represents document(-s) name(key/id)

      const data = listOfUsers.empty ? null : listOfUsers.docs.map(user => ({
        ...user.data(),
        id: user.id
      }))

      console.log(`data`, data)

      return data
    } catch (error) {
      console.log(`getSuggested error`, error)
      throw new Error(error.message)
    }
    
  }
)

const friends = createSlice({
  name: 'friends',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getFriends.pending, state => {state.loading = true})
      .addCase(getFriends.rejected, state => {state.loading = false})
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false
        const { payload } = action
        state[payload.type] = payload.data
      })

      .addCase(getSuggestedPeople.pending, state => {state.loading = true})
      .addCase(getSuggestedPeople.rejected, state => {state.loading = false})
      .addCase(getSuggestedPeople.fulfilled, (state, action) => {
        state.loading = false
        state.suggestion = action.payload
      })
  }
})

export default friends.reducer