import ProductService from "../services/products.service.js";
import { CartService } from "../services/carts.service.js";
const cartService = new CartService;
const productService = new ProductService

class ViewsController{

    async productsView(req, res){
        try {
            const { page } = req.query;
            const query = await productService.getProductData(page);
            const { docs, ...rest } = query;
            let products = docs.map((doc) => {
              return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock};
            });
            res.status(200).render('products', { products, pagination: rest });
          } catch (error) {
            return res.status(500).render('error', {error: error.message})
          }
    }

    async cartView(req, res){
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
        res.status(200).render('cart', { cart: cid, products: prods }) ;
      } catch (error) {
        return res.status(500).render('error', {error: error.message})
      }
    }
    homeView(req, res){
      try {
        return res.status(200).render('home', {})
    } catch (error) {
        return res.status(500).render('error',{error: error.message})
    }
    }
    uploadProductView(req, res){
      try {
        const email = req.session.user.email
        return res.status(200).render('uploadproduct', { email })
      } catch (error) {
        return res.status(500).render('error',{error: error.message})
      }
    }
    async myProductsView(req, res){
      try {
        const email = req.session.user.email
        const products = await productService.getProductByOwner(email);
        const prods = products.map((item) => ({
          id: item._id.toString(),
          title: item.title,
          thumbnail: item.thumbnail,
          category: item.category,
          stock: item.stock,
          price: item.price
        }))
        return res.status(200).render('myproducts', { prods })
      } catch (error) {
        return res.status(500).render('error',{error: error.message})
      }

    }
}

export const viewsController = new ViewsController