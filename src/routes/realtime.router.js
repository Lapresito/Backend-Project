import express from 'express';
const realtimeRouter = express.Router();
import { ChatService } from '../services/chat.service.js'
const chatService = new ChatService;


realtimeRouter.get("/realtime", async (req, res)=>{
    try {
        let messages = await chatService.getAll();
        const user = { firstName: req.session.user.firstName, lastName: req.session.user.lastName, email: req.session.user.email, rol: req.session.user.rol, cart: req.session.user.cart}
        return res.render("realtime",{ messages: messages, user: user});
    } catch (error) {
        throw new Error(error.message)
    }
})

export default realtimeRouter;
