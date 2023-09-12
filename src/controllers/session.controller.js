import { UserDTO } from "../dao/DTO/users.dto.js";
import ProductService from "../services/products.service.js";
import { UserService } from "../services/users.service.js";
import { isValidPassword } from "../utils/bcrypt.js";
import config from "../config/config.js";
const userService = new UserService;
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
        const user = { firstName: req.session.user.firstName, lastName: req.session.user.lastName, email: req.session.user.email, rol: req.session.user.rol, cart: req.session.user.cart, purchases: req.user.purchases}
        switch (user.rol) {
            case 'admin':
                return res.render('adminprofile', {user})
            case 'premium':
                return res.render('premiumprofile', {user})
            case 'user':
                return res.render('profile', {user})
            default:
                break;
            }
    }
       
    goToLogin(req, res){
        return res.render('login', {});
    }
    login(req,res){
        try {
            if (!req.user) {
                return res.status(401).render('error', { error: 'Invalid credentials' });
              }

            if(isValidPassword( config.adminPassword , req.user.password[0])){
                req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, rol: 'admin'};
            }else{
                req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, rol: req.user.rol, cart: req.user.cart, purchases: req.user.purchases};
            }
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
        req.session.user = {_id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, rol: req.user.rol, cart: req.user.cart, purchases: req.user.purchases}
        return res.status(200).redirect('/session/login')
    }
    goToFailRegister(req, res){
        return res.status(400).render('error',{error: 'Fail to register'})

    }
    async getLogedProducts(req, res){
        try {
            const user = { firstName: req.session.user.firstName, lastName: req.session.user.lastName, email: req.session.user.email, rol: req.session.user.rol, cart: req.session.user.cart, purchases: req.user.purchases}
            const { page } = req.query;
            const query = await productService.getProductData(page);
            const { docs, ...rest } = query;
            let products = docs.map((doc) => {
              return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock };
            });
            let pagination = rest
            let productsData = {products, pagination}
    
            res.render('loggedproducts', {productsData: productsData, user: user});
        } catch (error) {
            return res.status(500).render('error', {error: error.message})
        }
    }
    async admin(req, res){
        try {
            const users = await userService.getAll()
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
        const user = req.session.user 
        const userToShow = new UserDTO(user)
        return res.status(200).json({ user: userToShow });
    }
    async myProducts(req,res){
        try {
            const userEmail = req.session.user.email
            const products = await productService.getProductByOwner(userEmail);
            return res.status(200).json({products})
        } catch (error) {
            return res.status(500).render('error', { error: error.message})
        }
    }
    async makePremium(req,res){
        try {
            
        } catch (error) {
            return res.status(500).render('error', { error: error.message})
        }
    }
}

export const sessionController = new SessionController