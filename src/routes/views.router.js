import express from 'express';
import { isPremium, isUser } from '../middlewares/authenticator.js';
import { viewsController } from '../controllers/views.controller.js';

const viewsRouter = express.Router();


viewsRouter.get('/products', viewsController.productsView);
viewsRouter.get('/cart/:cid', isUser, viewsController.cartView);
viewsRouter.get('/uploadproduct', isPremium, viewsController.uploadProductView);
viewsRouter.get('/', viewsController.homeView);
viewsRouter.get('/myproducts', isUser, isPremium, viewsController.myProductsView);


export default viewsRouter;