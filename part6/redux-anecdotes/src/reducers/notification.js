import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notify',
  initialState: null,
  reducers: {
    likeNotification(state, action){   
      state = action.payload
      return state
    },
    clearNotification(state, action){
      return null
    }
  }
})

export const {likeNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer