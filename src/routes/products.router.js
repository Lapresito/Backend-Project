import express from 'express';
import { ProductService } from '../services/products.service.js';

const productsRouter = express.Router();
const productService = new ProductService();

productsRouter.get("/", async (req, res) => {
    try {
        let {limit = 4, page = 1, query, sort} = req.query
        if(sort && (sort !== 'asc' && sort !== 'desc')){
            sort = ''
        } 
        const payload = await productService.getAll(page, limit, sort, query);
        res.status(200).json({
            status: "success",
            payload: payload
        })
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
        const product = await productService.getProductById(id);
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
        await productService.addProduct(product)
        res.status(201).json({status:"success",message: 'Added successfuly', payload: product })
    } catch (error) {
        res.status(400).json({status: "error", error: error.message})
    }
})
productsRouter.delete("/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        const product = await productService.deleteProduct(id);
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
        const product = await productService.updateProduct(id, productByUser);
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