const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../modules/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const getToken = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    req.token = authorization.replace('Bearer ', '')
  }else{
    req.token = null
  }
  
  next()
}

const userExtractor = async (req, res, next) => {
  if(!req.token){
    return res.status(401).json({error: 'missing token'})
  }

  const decodedToken = await jwt.verify(req.token, process.env.SECRET)

  if(!decodedToken.id){
    return res.status(401).json({error: 'invalid token'})
  }

  req.user = await User.findById(decodedToken.id)

  if (!req.user) {
    return res.status(400).json({ error: 'userId missing or not valid' })
  }

  next()
}

module.exports = {requestLogger, getToken, userExtractor}