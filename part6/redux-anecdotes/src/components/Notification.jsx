import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const message = useSelector(state => state.notification)

  return (
    <div>
      {message && <div style={style}>You voted '{message}'</div>}
    </div>
  )
}

export default Notification
