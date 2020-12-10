import mongoose from 'mongoose'


const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String, 
    required: [true, 'email is required'], 
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }, 
  password: {
    type: String, 
    requried: [true, 'pasword is required'], 
  }, 
  active: {
    type: Boolean
  }
})

const User = mongoose.model('User', UserSchema)

export default User