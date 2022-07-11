const mongoose = require('mongoose')

const connect = async () => {
  try {
    // await mongoose.connect('mongodb://localhost:27017/remitano', {
    await mongoose.connect(
      'mongodb+srv://vanthieu97:thieu1997@cluster0-nzbrz.gcp.mongodb.net/remitano?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    console.log('Connect successfully!')
  } catch (error) {
    console.log('Connect failure!', error)
  }
}

module.exports = { connect }
