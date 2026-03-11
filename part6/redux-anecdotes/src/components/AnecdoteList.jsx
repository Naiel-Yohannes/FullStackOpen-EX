import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer.js'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispach = useDispatch()

    const vote = id => {
      dispach(newVote(id))
    }

    const orderedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {orderedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList