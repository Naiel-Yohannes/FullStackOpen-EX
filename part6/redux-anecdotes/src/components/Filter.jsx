import { useDispatch } from "react-redux"

const Filter = () => {
  const dispach = useDispatch()  
  const handleChange = (event) => {
    dispach({type: 'filter/setFilter', payload: event.target.value})
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