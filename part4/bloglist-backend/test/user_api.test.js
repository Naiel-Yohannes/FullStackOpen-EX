const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const User = require('../modules/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const users = [
    {
        "username": "lisa@lome",
        "name": "lis",
        "password": "kceoqwde123"
    }
]

beforeEach(async() => {
    await User.deleteMany()
    await User.insertMany(users)
})

describe('checking if user can be created', () => {
    test('username less than 3', async() => {
        const newUser = {
            "username": "al",
            "name": "alex",
            "password": "bvf21"
        }

        await api.post('/api/users')
        .send(newUser)
        .expect(400)
    })
    test('password less than 3', async() => {
        const newUser = {
            "username": "kabi_ti",
            "name": "habib",
            "password": "e8"
        }

        await api.post('/api/users')
        .send(newUser)
        .expect(400)
    })
})

after(async() => {
    await mongoose.connection.close()
})