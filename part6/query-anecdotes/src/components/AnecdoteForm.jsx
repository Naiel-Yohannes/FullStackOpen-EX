import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useDispatch } from 'react-redux';
import {notificationState} from './reducers/notification'
import anecdoteServices from "../services/request";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const anecdoteMutation = useMutation({
    mutationFn: anecdoteServices.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch(notificationState(`Added ${newAnecdote.content} to anecdotes`, 5))
    },
    onError: (error) => {
      dispatch(notificationState(error.message, 5))
    }

  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm