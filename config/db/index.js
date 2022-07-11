const mongoose = require('mongoose')

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/remitano', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connect successfully!')
  } catch (error) {
    console.log('Connect failure!', error)
  }
}

module.exports = { connect }
