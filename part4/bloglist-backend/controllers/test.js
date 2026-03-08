const testRoute = require('express').Router()
const User = require('../modules/user.js')
const Blog = require('../modules/blog.js')

testRoute.post('/reset', async(req, res) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    res.status(204).end()
})

module.exports = testRoute