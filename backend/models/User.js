const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
      type: String,
      trim:true,
      required: [true, 'Firstname is required']
    },

    surname: {
      type: String,
      trim:true,
      required: [true, 'Surname is required']
    },
    
    email : {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    confirmmail : {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
   
    
    
    
  },
    {
      timestamps: true
    });


const User = mongoose.model('User', userSchema)

module.exports = User