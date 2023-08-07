import { Schema, model } from 'mongoose';

const schema = new Schema({
      code: {
      type: String,
      required: true,
    },purchase_datetime: {
      type: String,
      required: true,
      max: 100,
    },amount: {
      type: Number,
      required: true
    },purchaser: {
      type: String,
      max: 100,
    }
  }, {versionKey: false});
  export const TicketModel = model('tickets', schema);