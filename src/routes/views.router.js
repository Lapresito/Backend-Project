const express = require('express');
const viewsRouter = express.Router();
const ProductManager = require('../ProductManager');

const productManager = new ProductManager('./src/products.json');


viewsRouter.get('/', async (req, res)=>{
    try {
        let products = await productManager.readDataFile();
        res.render('products',{
            products: products
        });
    } catch (error) {

    }

})

module.exports = viewsRouter;