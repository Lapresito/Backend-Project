import express from 'express';
import ProductManager from '../dao/ProductManager.js';

const viewsRouter = express.Router();
const productManager = new ProductManager('./src/products.json');


viewsRouter.get('/', async (req, res)=>{
    try {
        let products = await productManager.readDataFile();
        res.render('home',{
            products: products
        });
    } catch (error) {
        throw new Error(error.message)
    }

})

export default viewsRouter;