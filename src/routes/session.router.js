import express from "express";
import { goToLogin, isAdmin, isUser } from "../middlewares/authenticator.js";
import { sessionController } from "../controllers/session.controller.js";
import passport from "passport";

const sessionRouter = express.Router();

sessionRouter.get('/logout', sessionController.logout);
sessionRouter.get('/profile', goToLogin, isUser, sessionController.goToProfile);
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/session/profile');
  });
sessionRouter.get('/login', sessionController.goToLogin);
sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/session/faillogin'}), sessionController.login)
sessionRouter.get('/faillogin', sessionController.failLogin);
sessionRouter.get('/register', sessionController.goToRegister);
sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/session/failregister'}), sessionController.register);
sessionRouter.get('/failregister', sessionController.goToFailRegister)
sessionRouter.get('/products', isUser, sessionController.getLogedProducts)
sessionRouter.get('/admin', isAdmin, sessionController.admin);
sessionRouter.get('/current', isUser, sessionController.currentSession)

  export default sessionRouter;