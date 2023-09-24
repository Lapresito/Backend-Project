import { Schema, model } from 'mongoose';

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 100,
  },lastName: {
    type: String,
    required: true,
    max: 100,
  },email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },password: {
    type: [String, null],
    max: 100,
  },rol: {
    type: String,
    required: true,
  },
  cart: {
    type: String,
    required: false
  },
  last_connection: { 
    type: String,
    requeried: false
  },
  purchases:[],
  documents:[{name: String, link: String}]
}, {versionKey: false});
export const UserModel = model('users', schema)