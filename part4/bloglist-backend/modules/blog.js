const mongoose = require('mongoose')

const blogPost = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

blogPost.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogPost)

module.exports = Blog