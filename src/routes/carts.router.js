import express from 'express';
import { CartService } from '../services/carts.service.js';

const cartsRouter = express.Router();
const cartService = new CartService

cartsRouter.get("/", async (req, res) => {
    try {
        let carts = await cartService.getAll()
        res.status(200).json({
            status: "success",
            message: 'Carts list',
            payload: carts
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })
    }
});


cartsRouter.post("/", async (req, res) => {
    try {
        let newCart = await cartService.addCart()
        res.status(201).json({
            status: "success",
            message: 'Cart created successfuly',
            payload: newCart
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })
    }
});

cartsRouter.get("/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const cart = await cartService.getCartById(id);
        res.status(200).json({
            status: "success",
            message: `Cart with id:${id}`,
            payload: cart
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        await cartService.addProductToCart(pid, cid)
        const cart = await cartService.getCartById(cid);
        res.status(201).json({
            status: "success",
            message: `Product with id:${pid} was added successfully to cart with id ${cid}`,
            payload: cart
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })

    }
})

cartsRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await cartService.deleteCart(id);
        res.status(200).json({status:"success", message: `The cart with id: ${id} was deleted succesfully!`, payload: cart
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })

    }
})

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        await cartService.deleteProductFromCart(pid, cid)
        const cart = await cartService.getCartById(cid);
        console.log(cart)
        res.status(201).json({
            status: "success",
            message: `Product with id:${pid} was deleted successfully from cart with id ${cid}`, 
            payload: cart
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })

    }
})

cartsRouter.put("/:cid/product/:pid", async (req, res)=>{
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        await cartService.updateCart(cid, pid, req.body);
        const cart = await cartService.getCartById(cid);
        res.status(201).json({
            status: "success",
            message: `Cart with id ${cid} was uploaded successfuly`, 
            payload: cart
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })
    }
})
cartsRouter.put("/:cid", async (req, res)=>{
    try {
        const cid = req.params.cid;
        await cartService.updateCart(cid, null, req.body);
        const cart = await cartService.getCartById(cid);
        res.status(201).json({
            status: "success",
            message: `Cart with id ${cid} was uploaded successfuly`, 
            payload: cart
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })
    }
})


export default cartsRouter;