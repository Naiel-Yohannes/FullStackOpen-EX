require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/persons')
const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(errorHandler)

const path = require('path')

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(allPeople => {
    res.json(allPeople)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    if(person){
      res.json(person)
    }else{
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  const d = new Date()
  Person.countDocuments({}).then(count => {
    res.send(`<div>
            <p>phonebook has info for ${count} people</p>
            <p>${d}</p>
        </div>`)
  })

})

app.post('/api/persons', async (req, res, next) => {
  const body = req.body
  const exists = await Person.findOne({ name: body.name })
  if(exists){
    res.status(409).json({ error: 'name already exists' })
  } else if(body.name && body.number){
    const person = new Person ({
      name: body.name,
      number: body.number
    })
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
      .catch(error => next(error))
  } else {
    res.status(400).json({ error: 'content missing' })
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findById(req.params.id).then(person => {
    if(!person){
      return res.status(404).end()
    }
    if (name !== undefined) person.name = name
    if (number !== undefined) person.number = number

    return person.save().then(person => {
      res.json(person)
    })
      .catch(error => next(error))
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(() => res.status(204).end())
    .catch(error => next(error))
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)


app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})