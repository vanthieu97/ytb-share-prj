const { model, Schema } = require('mongoose')

const User = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = model('User', User)
