import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from './components/reducers/notification'

const store = configureStore({
    reducer: {
        notification: notificationSlice
    }
})

export default store