import { ProductModel } from '../dao/models/products.model.js';
import { CartService } from '../services/carts.service.js';
const cartService = new CartService

export async function getProductData(req, res, next) {
  try {
    const { page } = req.query;
    const query = await ProductModel.paginate({}, { limit: 3, page: page || 1 });
    const { docs, ...rest } = query;
    let products = docs.map((doc) => {
      return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock };
    });
    res.locals.productsData = { products, pagination: rest };
    next();
  } catch (error) {
    next(error);
  }
}


//temporally// toDo
export async function getAllProductData(req, res, next) {
  try {
    const query = await ProductModel.paginate({}, {limit: 40});
    const { docs, ...rest } = query;
    let products = docs.map((doc) => {
      return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock };
    });
    res.locals.productsData = { products, pagination: rest };
    next();
  } catch (error) {
    next(error);
  }
}
// end

export async function getCartData(req, res, next) {
  try {
    const cid = req.params.cid;
    const cart = await cartService.getCartById(cid);
    const prodsInCart = cart.products;
    const prods = prodsInCart.map((item) => {
      const { idProduct, quantity } = item;
      const { title, thumbnail, category } = idProduct;
      return {
        title,
        thumbnail,
        category,
        quantity,
      };
    });
    res.locals.cartData = { cart: cid, products: prods };
    next();
  } catch (error) {
    next(error);
  }
}



