import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { likeNotification, clearNotification } from '../reducers/notification'

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

    const vote = (id, content) => {
      dispach(newVote(id))
      dispach(likeNotification(content))

      setTimeout(() => {
        dispach(clearNotification())
      }, 5000);
    }

    const orderedAnecdotes = [...anecdotesToShow].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {orderedAnecdotes.map((anecdote, index) => (
                <div key={index}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList