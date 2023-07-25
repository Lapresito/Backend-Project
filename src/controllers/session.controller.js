import { UserModel } from "../dao/models/users.model.js";
import ProductService from "../services/products.service.js";
const productService = new ProductService;
class SessionController{
    logout(req, res){
        req.session.destroy((err) =>{
            if(err){
                return res.status(500).render('error', { error: 'Your session could not be closed'})
            }
            return res.redirect('/session/login');
        });
    }
    goToProfile(req, res){
        const user = { firstName: req.session.user.firstName, lastName: req.session.user.lastName, email: req.session.user.email, rol: req.session.user.rol, cart: req.session.user.cart}
        console.log(req.session);
        return res.render('profile', { user });
    }
    goToLogin(req, res){
        return res.render('login', {});
    }
    login(req,res){
        try {
            if (!req.user) {
                return res.status(401).render('error', { error: 'Invalid credentials' });
              }
              req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, rol: req.user.rol, cart: req.user.cart};
            
              return res.status(200).redirect('/session/profile');
        } catch (error) {
            return res.status(500).render('error', { error: error.message});
        }
    }
    failLogin(req, res){
        return res.status(400).render('error',{ error: 'Fail to login' });
    }
    goToRegister(req, res){
        return res.render('register', {});
    }
    register(req, res){
        if(!req.user){
            return res.status(400).render('error', { error: error.message });
        }
        req.session.user = {_id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, rol: req.user.rol, cart: req.user.cart}
        return res.status(200).redirect('/session/login')
    }
    goToFailRegister(req, res){
        return res.status(400).render('error',{error: 'Fail to register'})

    }
    async getLogedProducts(req, res){
        try {
            const user = { firstName: req.session.user.firstName, lastName: req.session.user.lastName, email: req.session.user.email, rol: req.session.user.rol, cart: req.session.user.cart}
            const { page } = req.query;
            const query = await productService.getProductData(page);
            const { docs, ...rest } = query;
            let products = docs.map((doc) => {
              return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock };
            });
            let pagination = rest
            let productsData = {products, pagination}
            console.log(productsData)
    
            res.render('loggedproducts', {productsData: productsData, user: user});
        } catch (error) {
            return res.status(500).render('error', {error: error.message})
        }
    }
    async admin(req, res){
        try {
            const users = await UserModel.find({})
            const usersPlain = users.map(user => {
                return {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  rol: user.rol,
                  cart: user.cart
                }
              })
            res.render('adminview', {users: usersPlain} );
        } catch (error) {
            return res.status(500).render('error', { error: error.message})
        }
    }
    currentSession(req, res){
        return res.status(200).json({ user: req.session.user });
    }
}

export const sessionController = new SessionController