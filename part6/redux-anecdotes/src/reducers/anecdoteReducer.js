import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action){
      return action.payload
    },
    createAnecdotes (state, action) {
      const content = action.payload
      state.push(content)
    },
    newVote(state, action) {
      const id = action.payload
      const selected = state.find(a => a.id === id)
      selected.votes += 1
    }
  }
})

export const {createAnecdotes, newVote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer