import {useMutation, useQueryClient} from '@tanstack/react-query'
import NotificationContext, {showNotification} from './reducers/notification.jsx'
import anecdoteServices from "../services/request";
import { useContext } from 'react';

const AnecdoteForm = () => {
  const {dispatchNotif} = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const anecdoteMutation = useMutation({
    mutationFn: anecdoteServices.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      showNotification(dispatchNotif, `Added ${newAnecdote.content} to anecdotes`, 5)
    },
    onError: (error) => {
      showNotification(dispatchNotif, 'too short anecdote, must have length 5 or more', 5)
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