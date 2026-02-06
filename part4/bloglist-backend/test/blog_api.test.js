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
    }),
    test('identifier property of the blog posts is named id', async() => {
        const response = await api.get('/api/blogs')
        const blog = response.body
        
        blog.forEach(b => {
            assert(b.id)
            assert.strictEqual(b._id, undefined)
        })
    }), 
    test('1 new blog added', async() => {
        const newBlog = {
            title: 'Test',
            author: 'FSO',
            likes: 8
        }

        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const title = response.body.map(b => b.title)
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
        assert(title.includes('Test'))
    }),
    test('missing property of likes is set to 0', async() => {
        const newBlog = {
            title: 'Shadow slave',
            author: 'Sunny'
        }

        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const request = await api.get('/api/blogs')

        assert.strictEqual(request.body[request.body.length - 1].likes, 0)
    })
})

after(async() => {
    await mongoose.connection.close()
})