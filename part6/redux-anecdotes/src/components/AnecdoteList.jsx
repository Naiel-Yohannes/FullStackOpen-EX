import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notification'

const AnecdoteList = () => {
    const anecdotesToShow = useSelector(({anecdotes, filter}) => {
        if(filter === 'ALL'){
            return anecdotes
        }
        if(filter !== ''){
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        }
        return anecdotes
    })
    const dispach = useDispatch()

    const vote = (id, content, votes) => {
      dispach(updateVote(id, content, votes))
      dispach(notification(`you voted '${content}'`, 5))
    }

    const orderedAnecdotes = [...anecdotesToShow].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {orderedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList