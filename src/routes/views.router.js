import express from 'express';
import { getProductData, getCartData } from '../middlewares/prods.js';


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

viewsRouter.get('/', (req, res)=>{
    try {
        return res.status(200).render('home', {})
    } catch (error) {
        return res.status(500).render('error',{error: error.message})
    }
})
export default viewsRouter;