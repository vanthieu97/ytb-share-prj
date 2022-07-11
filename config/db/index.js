const mongoose = require('mongoose')

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connect successfully!')
  } catch (error) {
    console.log('Connect failure!', error)
  }
}

module.exports = { connect }
