import {Schema, model} from 'mongoose'

const postSchema = new Schema({
    post: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Post', postSchema);