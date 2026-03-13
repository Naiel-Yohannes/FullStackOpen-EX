import { useSelector, useDispatch } from 'react-redux'

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
      dispach({type: 'anecdotes/newVote', payload: id})
      dispach({type: 'notify/likeNotification', payload: content})

      setTimeout(() => {
        dispach({type: 'notify/clearNotification'})
      }, 5000);
    }

    const orderedAnecdotes = [...anecdotesToShow].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {orderedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
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