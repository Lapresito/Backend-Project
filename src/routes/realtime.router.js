import express from 'express';
const realtimeRouter = express.Router();
import { ProductService } from '../services/products.service.js';
const productService = new ProductService;
import { ChatService } from '../services/chat.service.js'
const chatService = new ChatService;


realtimeRouter.get("/realtime", async (req, res)=>{
    try {
        let products =  await productService.getAll();
        let messages = await chatService.getAll();
        return res.render("realtime",{products: products,
        messages: messages});
    } catch (error) {
        throw new Error(error.message)
    }
})

export default realtimeRouter;
