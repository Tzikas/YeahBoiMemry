import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
    picture: String,
    sub: String
})

module.exports = model('User', userSchema);
