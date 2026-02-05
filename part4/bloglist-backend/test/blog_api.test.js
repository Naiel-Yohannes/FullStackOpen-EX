const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../modules/blog')
const supertest = require('supertest')

const api = supertest(app)

const initialBlogs = [
    {
      title: 'Backend',
      author: 'Josh',
      url: 'https://linkden.com',
      likes: 7
    },
    {
      title: 'Frontend',
      author: 'Nabi',
      likes: 2
    }
]

beforeEach(async() => {
    await Blog.deleteMany()
    await Blog.insertMany(initialBlogs)
})

describe('tests for backend', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.length, initialBlogs.length)
    })
})

after(async() => {
    await mongoose.connection.close()
})