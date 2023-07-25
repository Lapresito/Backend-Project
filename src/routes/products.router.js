import express from 'express';
import { productController } from '../controllers/products.controller.js';

const productsRouter = express.Router();

productsRouter.get("/", productController.getWithQuerys);
productsRouter.get("/:id", productController.getProductById);
productsRouter.post("/", productController.addProduct);
productsRouter.delete("/:id", productController.delete);
productsRouter.put("/:id", productController.updateProduct);

export default productsRouter;