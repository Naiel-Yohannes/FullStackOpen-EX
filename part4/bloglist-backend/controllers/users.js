const userRoute = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../modules/user.js')

userRoute.get('/', async(req, res) => {
    const users = await User.find({}).populate('blogs')
    res.status(200).json(users)
})

userRoute.post('/', async(req, res) => {
    const {username, name, password} = req.body

    if(!username || username.length < 3){
        return res.status(400).json({error: 'Username must be at least 3 characters long'})
    }
    if (!password || password.length < 3) {
        return res.status(400).json({error: 'password must be at least 3 characters long'})
    }

    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
})

module.exports = userRoute