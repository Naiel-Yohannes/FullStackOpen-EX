const blogsRoute = require('express').Router()
const Blog = require('../modules/blog')

blogsRoute.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRoute.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRoute