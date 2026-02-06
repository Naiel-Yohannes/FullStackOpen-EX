const blogsRoute = require('express').Router()
const Blog = require('../modules/blog')

blogsRoute.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRoute.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
      res.status(404).end()
    }
    res.json(blog)
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

blogsRoute.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

module.exports = blogsRoute