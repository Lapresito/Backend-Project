import { Schema, model } from 'mongoose'

const schema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 100000000 },
    thumbnail: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100, unique: true },
    stock: { type: Number, required: true, max: 200000000 },
    category: { type: String, required: true, max: 100 }
});

export const ProductModel = model("products", schema);