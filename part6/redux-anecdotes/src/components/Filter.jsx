import { useDispatch } from "react-redux"
import { filter } from "../reducers/anecdoteReducer"

const Filter = () => {
  const dispach = useDispatch()  
  const handleChange = (event) => {
    dispach(filter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={e => handleChange(e)} />
    </div>
  )
}

export default Filter