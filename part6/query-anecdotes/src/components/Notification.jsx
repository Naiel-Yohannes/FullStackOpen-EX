import NotificationContext from "./reducers/notification.jsx"
import { useContext } from "react"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const {notification} = useContext(NotificationContext)

  if(notification === null){
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
