import express from 'express';
import CartsManager from '../dao/CartsManager.js';

const cartsRouter = express.Router();
const cartsManager = new CartsManager('./src/carts.json');


cartsRouter.post("/", async (req, res) => {
    try {
        let newCart = await cartsManager.addCart()
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
        const cart = await cartsManager.getCartById(parseInt(id));
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
        const pid = parseInt(req.params.pid);
        const cid = parseInt(req.params.cid);
        await cartsManager.addProductToCart(pid, cid)
        const cart = await cartsManager.getCartById(parseInt(cid));
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
        const cart = await cartsManager.deleteCart(parseInt(id));
        res.status(200).json({status:"success", message: `The cart with id: ${id} was deleted succesfully!`
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
        const pid = parseInt(req.params.pid);
        const cid = parseInt(req.params.cid);
        await cartsManager.deleteProductFromCart(pid, cid)
        const cart = await cartsManager.getCartById(parseInt(cid));
        res.status(201).json({
            status: "success",
            message: `Product with id:${pid} was deleted successfully from cart with id ${cid}`, payload: cart
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })

    }
})


export default cartsRouter;