import { createContext } from "react"
import { useReducer } from "react"

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch(action.type){
        case 'SET':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export const showNotification = (dispatch, message, seconds) => {
  dispatch({ type: 'SET', payload: message })
  setTimeout(() => {
    dispatch({ type: 'CLEAR' })
  }, seconds * 1000)
}


export const NotificationContextProvider = (prop) => {
    const [notification, dispatchNotif] = useReducer(notificationReducer, null)

    return (
    <NotificationContext.Provider value={{notification, dispatchNotif}}>
        {prop.children}
    </NotificationContext.Provider>
    )
}

export default NotificationContext