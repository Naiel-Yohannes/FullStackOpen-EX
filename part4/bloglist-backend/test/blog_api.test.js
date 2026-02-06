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
      url: 'https://w3schools.com',
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
            url: 'https://pinterest.com',
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
            url: 'https://wikipidia.com',
            author: 'Sunny'
        }

        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const request = await api.get('/api/blogs')

        assert.strictEqual(request.body[request.body.length - 1].likes, 0)
    }),
    test('missing data can not be sent', async() => {
        const newBlog = {
            author: 'Nemphis',
            likes: 50
        }

        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

        const response = await api.get('/api/blogs')
        const title = response.body.map(b => b.author)
        assert(!title.includes('Nemphis'))
    }),
    test('delition of blog', async() => {
        const blogs = await Blog.find({})
        const blog = blogs[0]

        await api.delete(`/api/blogs/${blog.id}`)
        .expect(204)

        const response = await api.get('/api/blogs')

        const idExists = response.body.map(b => b.id)
        assert(!idExists.includes(blog.id))
        assert.strictEqual(response.body.length, blogs.length - 1)
    })
})

after(async() => {
    await mongoose.connection.close()
})