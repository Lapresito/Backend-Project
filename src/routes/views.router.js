import express from 'express';
import { viewsController } from '../controllers/views.controller.js';

const viewsRouter = express.Router();


viewsRouter.get('/products', viewsController.productsView);
viewsRouter.get('/cart/:cid', viewsController.cartView);
viewsRouter.get('/', viewsController.homeView);


export default viewsRouter;