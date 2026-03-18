import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteServices from './services/request'
import { useDispatch } from 'react-redux'
import NotificationContent from './components/reducers/notification.jsx'
import { useContext } from 'react'
import { showNotification } from './components/reducers/notification.jsx'

const App = () => {
  const {dispatchNotif} = useContext(NotificationContent)

  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteServices.getAll,
    refetchOnWindowFocus: false, 
    retry: false
  })

  const updateMutation = useMutation({
    mutationFn: anecdoteServices.update,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(dispatchNotif, `updated ${updated.content}`, 5)
    }
  })

  if(result.isLoading) {
    return <div>Loading...</div>
  }

  if(result.error) {
    return <div>{result.error.message}</div>
  }

  const anecdotes = [...result.data].sort((a, b) => b.votes - a.votes)
  
  const handleVote = (anecdote) => {
    updateMutation.mutate(anecdote)
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
