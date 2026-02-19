const blogsRoute = require('express').Router()
const Blog = require('../modules/blog')
const User = require('../modules/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRoute.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {blogs: 0})
    res.json(blogs)
})

blogsRoute.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
      res.status(404).end()
    }
    res.json(blog)
})

blogsRoute.post('/', userExtractor ,async (req, res) => {
  const user = req.user

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id
  })

  if(blog.title === undefined || blog.url === undefined) {
    return res.status(400).json({error: 'content missing'})
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  res.status(201).json(result)
})

blogsRoute.put('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(!blog){
    return res.status(404).end()
  }

  if(req.body.title !== undefined) blog.title = req.body.title
  if(req.body.author !== undefined) blog.author = req.body.author
  if(req.body.url !== undefined) blog.url = req.body.url
  if(req.body.likes !== undefined) blog.likes = req.body.likes

  const updatedBlog = await blog.save()
  res.status(200).json(updatedBlog)
})

blogsRoute.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)

  if(!blog){
    return res.status(404).json({error: 'blog not found'})
  }

  if(blog.user.toString() === req.user._id.toString()) {
    await Blog.findByIdAndDelete(id)
    return res.status(204).end()
  }

  return res.status(403).json({error: 'only the creator can delete this blog'})
})

module.exports = blogsRoute