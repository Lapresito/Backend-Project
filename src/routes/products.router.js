import express from 'express';
import ProductManager from '../ProductManager.js'

const productsRouter = express.Router();
const productManager = new ProductManager('./src/products.json');

productsRouter.get("/", async (req, res) => {
    try {
        let limit = req.query.limit;
        const products = await productManager.readDataFile();
        if (!limit) {
            return res.status(200).json({status: "success",
            message: "Products list",
            payload: products})
        }
        limit = parseInt(limit)
        if (isNaN(limit)) {
            throw new Error('Limit query has to be a valid number')
        }
        res.status(200).json(products.slice(0, limit))
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })
    }
})
productsRouter.get("/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const product = await productManager.getProductsById(parseInt(id));
        res.status(200).json({status:"success",
        message: `Product with id:${id}`, payload: product})

    } catch (error) {
        res.status(400).json({status: "error",
            error: error.message
        })
    }
})
productsRouter.post("/", async (req, res) => {
    try {
        const product = req.body
        await productManager.addProduct(product)
        res.status(201).json({status:"success",message: 'Added successfuly', payload: product })
    } catch (error) {
        res.status(400).json({status: "error", error: error.message})
    }
})
productsRouter.delete("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const product = await productManager.deleteProduct(parseInt(id));
        res.status(200).json({status:"success", message: `The product with id: ${id} was deleted succesfully!`, payload: product
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        }) 
    }
})
productsRouter.put("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const productByUser = req.body
        const product = await productManager.updateProducts(parseInt(id), productByUser);
        res.status(200).json({status: "success", message: `The product with id: ${id} was updated succesfully!`, payload: product
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        }) 
    }
})

export default productsRouter;