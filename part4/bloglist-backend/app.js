const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const morgan = require('morgan')
const requestLogger = require('./utils/middleware')
const mongoose = require('mongoose')
const blogsRoute = require('./controllers/blogs')
const userRoute = require('./controllers/users')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.json())
app.use(requestLogger)
app.use(morgan('dev'))

app.use('/api/users', userRoute)
app.use('/api/blogs', blogsRoute)

module.exports = app