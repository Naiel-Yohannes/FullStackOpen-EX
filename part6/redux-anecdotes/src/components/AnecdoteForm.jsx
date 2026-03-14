import { useDispatch } from 'react-redux'
import { createAnecdotes } from '../reducers/anecdoteReducer'
import anecdoteServices from '../services/anecdote'

const AnecdoteForm = () => {
    const dispach = useDispatch()

    const addAnecdote = async(e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''
      const response = await anecdoteServices.createNew(content)
      dispach(createAnecdotes(response))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm