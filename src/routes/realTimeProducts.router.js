import express from 'express';
const rTProducts = express.Router();
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager('./src/products.json');

//BACK-END

rTProducts.get("/realTimeProducts", async (req, res) => {
    try {
        let products = await productManager.readDataFile();
        return res.render('realTimeProducts', {
            products: products
        })
        
    } catch (error) {
        throw new Error(error.message)
    }
})




export default rTProducts;