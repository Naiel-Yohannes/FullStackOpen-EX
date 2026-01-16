const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const path = require('path');

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(e => e.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const d = new Date()
    res.send(`<div>
            <p>phonebook has info for ${persons.length} people</p>
            <p>${d}</p>
        </div>`)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const exists = persons.find(e => e.name.toLowerCase() === body.name.toLowerCase())
    if(exists){
        res.status(409).json({error: 'name already exists'})
    } else if(body.name && body.number){
        const newPerson = {
            id: Math.floor(Math.random() * 1000).toString(),
            name: body.name,
            number: body.number
        }
        persons = persons.concat(newPerson)
        res.json(newPerson)
    } else {
        res.status(400).json({error: 'content missing'})
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(e => e.id !== id)
    res.status(204).end()
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})