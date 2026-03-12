import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer.js'

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

    const vote = id => {
      dispach(newVote(id))
    }

    const orderedAnecdotes = [...anecdotesToShow].sort((a, b) => b.votes - a.votes)
console.log(orderedAnecdotes);

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