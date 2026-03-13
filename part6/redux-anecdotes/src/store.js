import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteReducer'
import notificationSlice from './reducers/notification'
import filterSlice from './reducers/filter'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteSlice,
        filter: filterSlice,
        notification: notificationSlice
    }
})

export default store