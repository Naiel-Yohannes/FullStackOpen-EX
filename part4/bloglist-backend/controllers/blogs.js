const blogsRoute = require('express').Router()
const Blog = require('../modules/blog')

blogsRoute.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRoute.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  })

  if(blog.title === undefined || blog.url === undefined) {
    return res.status(400).json({error: 'content missing'})
  }

  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRoute