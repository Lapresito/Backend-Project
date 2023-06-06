import express from 'express';
const rTProducts = express.Router();
import { ProductService } from '../services/products.service.js';

const productService = new ProductService;

//BACK-END

rTProducts.get("/realtimeproducts", async (req, res) => {
    try {
        let products = await productService.getAll();
        return res.render('realtimeproducts', {
            products: products
        })
    } catch (error) {
        throw new Error(error.message)
    }
})




export default rTProducts;