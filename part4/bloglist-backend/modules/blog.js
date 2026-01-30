const mongoose = require('mongoose')

const blogPost = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog', blogPost)

module.exports = Blog