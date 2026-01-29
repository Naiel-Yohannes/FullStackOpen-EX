require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

if (!url) {
  console.log('no url found')
  process.exit(1)
}

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v){
        return /\d{2,3}-d+/.test(v)
      },
      message: props => `${props.value} is not a vaalid number`
    }
  }
})

personsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personsSchema)