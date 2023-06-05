import { Schema, model } from 'mongoose';

const schema = new Schema({products: [{idProduct: { type: String}, quantity:{ type: Number }, _id: false}]}, { versionKey: false });

export const CartModel = model("carts", schema);
