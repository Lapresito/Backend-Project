import express from "express";
import { UserModel } from "../dao/models/users.model.js";
import { goToLogin, isAdmin, isUser } from "../middlewares/authenticator.js";
import { getProductData } from "../middlewares/prods.js";
import passport from "passport";

const sessionRouter = express.Router();

sessionRouter.get('/logout', (req, res)=>{
    req.session.destroy((err) =>{
        if(err){
            return res.status(500).render('error', { error: 'Your session could not be closed'})
        }
        return res.redirect('/session/login');
    });
});

sessionRouter.get('/profile', goToLogin, isUser, (req,res)=>{
    const user = { firstName: req.session.user.firstName, lastName: req.session.user.lastName, email: req.session.user.email, rol: req.session.user.rol, cart: req.session.user.cart}
    console.log(req.session);
    return res.render('profile', { user });
});

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/session/profile');
  });

sessionRouter.get('/login', (req, res)=>{
    return res.render('login', {});
});

sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/session/faillogin'}), async (req, res)=>{
    try {
        if (!req.user) {
            return res.status(401).render('error', { error: 'Invalid credentials' });
          }
          req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, rol: req.user.rol, cart: req.user.cart};
        
          return res.status(200).redirect('/session/profile');
    } catch (error) {
        return res.status(500).render('error', { error: error.message});
    }
})

sessionRouter.get('/faillogin', async (req, res) => {
    return res.status(400).render('error',{ error: 'Fail to login' });
  });

sessionRouter.get('/register', (req, res) => {
    return res.render('register', {});
  });

sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/session/failregister'}), (req, res) => { 
    if(!req.user){
        return res.status(400).render('error', { error: error.message });
    }
    req.session.user = {_id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, rol: req.user.rol, cart: req.user.cart}
    return res.status(200).redirect('/session/login')
    
  });

  sessionRouter.get('/failregister', async (req, res) =>{
    return res.status(400).render('error',{error: 'Fail to register'})
  })


  sessionRouter.get('/products', isUser, getProductData, async(req, res)=>{
    try {
        const user = { firstName: req.session.user.firstName, lastName: req.session.user.lastName, email: req.session.user.email, rol: req.session.user.rol, cart: req.session.user.cart}
        const { productsData } = res.locals

        res.render('loggedproducts', {productsData: productsData, user: user});
    } catch (error) {
        return res.status(500).render('error', {error: error.message})
    }
  })

  sessionRouter.get('/admin', isAdmin, async (req, res)=>{
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
  });

  sessionRouter.get('/current', isUser, (req, res)=>{
    console.log(req.session);
    return res.status(200).json({ user: req.session.user });
  })

  export default sessionRouter;