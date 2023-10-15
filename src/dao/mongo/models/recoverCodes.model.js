import { Schema, model } from 'mongoose';
const schema = new Schema({
  email: { type: String, required: true, max: 500 },
  code: { type: String, required: true, max: 100, unique: true },
  expire: { type: Number, required:true },
  
}, {versionKey: false});
export const RecoverCodesModel = model('recover-codes', schema);