import express from 'express';
import { CartService } from '../services/carts.service.js';
import { getProductData, getCartData } from '../middlewares/prods.js';


const cartService = new CartService;
const viewsRouter = express.Router();



viewsRouter.get('/products', getProductData, async (req, res)=>{
    try {
        const { productsData } = res.locals
        res.render('products', productsData );
    } catch (error) {
        throw new Error(error.message)
    }
})

viewsRouter.get('/cart/:cid', getCartData, async (req, res)=>{
    try {
        const { cartData } = res.locals;
        res.render('cart', cartData)
    } catch (error) {
        throw new Error(error.message)
    }
})

export default viewsRouter;