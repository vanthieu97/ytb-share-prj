const { model, Schema } = require('mongoose')

const SharedVideo = new Schema({
  title: { type: String, require: true },
  desc: { type: String, require: true },
  url: { type: String, required: true },
  sharedBy: { type: String, required: true },
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  likes: { type: Array, default: [] },
  dislikes: { type: Array, default: [] },
})

module.exports = model('SharedVideo', SharedVideo)
