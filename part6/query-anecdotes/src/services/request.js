const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await fetch(baseURL)

    if(!response.ok){
        throw new Error('unable to get fetch anecdotes')
    }

    return await response.json()
}

const createNew = async(newAnecdote) => {
    const response = await fetch(baseURL, {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newAnecdote)
    })

    if(!response.ok){
        throw new Error('unable to create new anecdotes')
    }

    return await response.json()
}

const update = async(updateAnecdote) => {
    const response = await fetch(`${baseURL}/${updateAnecdote.id}`, {
        method:'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({...updateAnecdote, votes: updateAnecdote.votes + 1})
    })

    if(!response.ok){
        throw new Error('unable to get fetch anecdotes')
    }

    return await response.json()
}

export default {getAll, createNew, update}