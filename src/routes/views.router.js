import express from 'express';
import { ProductModel } from '../dao/models/products.model.js';

const viewsRouter = express.Router();



viewsRouter.get('/products', async (req, res)=>{
    try {
        const { page}  = req.query
        const query = await ProductModel.paginate({},{limit: 3, page: page || 1});
        const { docs, ...rest } = query;
        let products = docs.map((doc)=>{
            return { title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock }
        });
        res.render('products',{ products, pagination: rest });
    } catch (error) {
        throw new Error(error.message)
    }
})

export default viewsRouter;