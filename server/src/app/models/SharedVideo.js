import { model, Schema } from 'mongoose'

const SharedVideo = new Schema({
  url: { type: String, required: true },
  sharedBy: { type: String, required: true },
})

export default model('SharedVideo', SharedVideo)
