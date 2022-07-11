const { model, Schema } = require('mongoose')

const SharedVideo = new Schema({
  url: { type: String, required: true },
  sharedBy: { type: String, required: true },
})

module.exports = model('SharedVideo', SharedVideo)
