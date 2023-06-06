import { Schema, model } from 'mongoose';

const schema = new Schema({
  user: { type: String, required: true, max: 100, unique: true },
  message: { type: String, required: true, max: 500 },
}, {versionKey: false});

export const ChatModel = model('messages', schema);