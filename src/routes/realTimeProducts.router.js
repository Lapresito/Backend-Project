const express = require('express');
const rTProducts = express.Router();
const ProductManager = require('../ProductManager');

const productManager = new ProductManager('./src/products.json');

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




module.exports = rTProducts;