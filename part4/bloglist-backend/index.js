require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Blog = require('./mongo')
const app = express()

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
app.use(cors())
app.use(morgan('dev'))

app.get('/api/blogs', (req, res) => {
    Blog.find({})
    .then(blogs => {
        res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(result => {
    res.status(201).json(result)
  })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})