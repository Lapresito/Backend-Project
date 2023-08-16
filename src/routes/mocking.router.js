import express from 'express'
import { mockingController } from '../controllers/mocking.controller.js';


const mockingRouter = express.Router();


mockingRouter.get('/mockingProducts', mockingController.getProducts);

mockingRouter.get('/loggerTest', mockingController.loggerTest)

export default mockingRouter;