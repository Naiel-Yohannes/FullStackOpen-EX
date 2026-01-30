const blogsRoute = require('express').Router()
const Blog = require('../modules/blog')

blogsRoute.get('/', (req, res) => {
    Blog.find({})
    .then(blogs => {
        res.json(blogs)
    })
})

blogsRoute.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(result => {
    res.status(201).json(result)
  })
})

module.exports = blogsRoute