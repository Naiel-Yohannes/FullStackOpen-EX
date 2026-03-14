import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdote'

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
      const changedAnecdote = action.payload
      return state.map(a => a.id === changedAnecdote.id ? changedAnecdote : a)
    }
  }
})

const {setAnecdotes, createAnecdotes, newVote} = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const allAnecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(allAnecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const created = await anecdoteServices.createNew(content)
    dispatch(createAnecdotes(created))
  }
}

export const updateVote = (id, content, votes) => {
  return async(dispatch) => {
    const updatedAnecdote = await anecdoteServices.update(id, content, votes)
    dispatch(newVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer