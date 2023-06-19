import express from "express";
import { UserModel } from "../dao/models/users.model.js";
import { goToLogin, isAdmin, isUser } from "../middlewares/authenticator.js";
import { getProductData } from "../middlewares/prods.js";

const sessionRouter = express.Router();

sessionRouter.get('/logout', (req, res)=>{
    req.session.destroy((err) =>{
        if(err){
            return res.status(500).render('error', { error: 'Your session could not be closed'})
        }
        return res.redirect('/session/login');
    });
});

sessionRouter.get('/profile', goToLogin ,isUser, (req,res)=>{
    const user = { firstName: req.session.firstName, lastName: req.session.lastName, email: req.session.email, rol: req.session.rol}
    console.log(req.session);
    return res.render('profile', { user });
});

sessionRouter.get('/login', (req, res)=>{
    return res.render('login', {});
});

sessionRouter.post('/login', async (req, res)=>{
    try {
        const { email, password } = req.body;
        if( !email || !password ){
            return res.status(400).render('error', {error: 'You have to insert your credentials'})
        };
        const foundUser = await UserModel.findOne({email: email})
        if(foundUser && foundUser.password === password){
            req.session.email = foundUser.email;
            req.session.rol = foundUser.rol;
            req.session.firstName = foundUser.firstName;
            req.session.lastName = foundUser.lastName;
            return res.redirect('/session/profile');
        }else{
            return res.status(401).render('error', { error: 'Wrong email or password'});
        };
    } catch (error) {
        return res.status(500).render('error', { error: error.message});
    }
})
sessionRouter.get('/register', (req, res) => {
    return res.render('register', {});
  });

sessionRouter.post('/register', async (req, res) => { 
    try {
        const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).render('error', { error: 'Empty fields, please add all the statements' });
    }
        if( email === "adminCoder@coder.com" &&  password=== "adminCod3r123" && firstName=== firstName && lastName=== lastName){
            await UserModel.create({ email: email, password: password, firstName: firstName, lastName: lastName, rol: 'admin' })
            return res.redirect('/session/profile');
        }else{
            await UserModel.create({ email: email, password: password, firstName: firstName, lastName: lastName, rol: 'user' });
            return res.redirect('/session/profile');
        }

    } catch (error) {
      return res.status(400).render('error', { error: 'This email already exists, please try with otherone', message: error.message});
    }
  });

  sessionRouter.get('/products',isUser, getProductData, async(req, res)=>{
    try {
        const user = { firstName: req.session.firstName, lastName: req.session.lastName, email: req.session.email, rol: req.session.rol}
        const { productsData } = res.locals

        res.render('loggedproducts', {productsData: productsData, user: user} );
    } catch (error) {
        return res.status(500).render('error', { error: error.message})
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
              rol: user.rol
            }
          })
        res.render('adminview', {users: usersPlain} );
    } catch (error) {
        return res.status(500).render('error', { error: error.message})
    }
  })

  export default sessionRouter;