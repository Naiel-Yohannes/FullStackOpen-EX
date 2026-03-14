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

const {likeNotification, clearNotification} = notificationSlice.actions

export const notification = (message, time) => {
    return async (dispatch) => {
        dispatch(likeNotification(message))
    
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000);
    }
}

export default notificationSlice.reducer