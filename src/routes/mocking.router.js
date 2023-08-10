import express from 'express'
import { mockingController } from '../controllers/mocking.controller.js';


const mockingRouter = express.Router();


mockingRouter.get('/', mockingController.getProducts);

export default mockingRouter;