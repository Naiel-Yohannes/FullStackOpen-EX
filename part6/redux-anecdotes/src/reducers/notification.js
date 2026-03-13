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

export default notificationSlice.reducer