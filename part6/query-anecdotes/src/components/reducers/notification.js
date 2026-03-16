import { createSlice } from "@reduxjs/toolkit"; 


const notificationSlice = createSlice({
    name: 'notify',
    initialState: null,
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        clearNotification(state, action){
            return null
        }
    }
})

const {setNotification, clearNotification} = notificationSlice.actions

export const notificationState = (message, second) => {
    return dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, second * 1000);
    } 
}

export default notificationSlice.reducer