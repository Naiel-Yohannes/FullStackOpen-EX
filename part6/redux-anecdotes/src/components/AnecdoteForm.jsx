import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispach = useDispatch()

    const addAnecdote = e => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''
      dispach({type: 'anecdotes/createAnecdotes', payload: content})
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