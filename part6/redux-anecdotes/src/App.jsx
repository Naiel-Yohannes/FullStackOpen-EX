import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteServices from './services/anecdote'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispach = useDispatch()

  useEffect(() => {
    anecdoteServices.getAll().then(
      allAnecdotes => dispach(setAnecdotes(allAnecdotes))
    )
  }, [dispach])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
