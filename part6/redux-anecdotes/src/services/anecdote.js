const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await fetch(baseURL)

    if(!response.ok){
        throw new Error('Failed to fetch notes')  
    }

    return await response.json()
}

const createNew = async(content) => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({content, votes: 0})
    })

    if(!response.ok){
        throw new Error('Failed to fetch anecdotes')  
    }

    return await response.json()
}

const update = async(id, content, votes) => {
    const response = await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content, votes: votes +1})
    })

    if(!response.ok){
        throw new Error(`failed to find anicdote with ${id} id`)
    }

    const data = await response.json()
    return data
}

export default {createNew, getAll, update}