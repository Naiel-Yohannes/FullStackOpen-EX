const logger = require('./logger')

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

module.exports = {requestLogger, getToken}