import express from 'express';
import { ProductModel } from '../dao/models/products.model.js';
import { CartService } from '../services/carts.service.js';


const cartService = new CartService;
const viewsRouter = express.Router();



viewsRouter.get('/products', async (req, res)=>{
    try {
        const { page }  = req.query
        const query = await ProductModel.paginate({},{limit: 3, page: page || 1});
        const { docs, ...rest } = query;
        let products = docs.map((doc)=>{
            return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock }
        });
        res.render('products',{ products, pagination: rest });
    } catch (error) {
        throw new Error(error.message)
    }
})

viewsRouter.get('/:cid', async (req, res)=>{
    try {
        const cid = req.params.cid
        const cart = await cartService.getCartById(cid)
        let prodsInCart = cart.products;
        const prods = prodsInCart.map(item => {
            const { idProduct, quantity } = item;
            const { title, thumbnail, category } = idProduct;
            return {
              title,
              thumbnail,
              category,
              quantity
            };
          });
        res.render('cart', {cart: cid, products: prods})
    } catch (error) {
        throw new Error(error.message)
    }
})

export default viewsRouter;