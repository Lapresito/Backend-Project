import { Server } from 'socket.io';
import { ProductService } from '../services/products.service.js';
const productService = new ProductService();
import { ChatService } from '../services/chat.service.js';
const chatService = new ChatService();
import { ProductModel } from "../dao/models/products.model.js";

export function connectSocket(httpServer){
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
      console.log(`New user connected: ${socket.id}`);
      socket.on('newProduct', async (newProduct) => {
          try {
              console.log(JSON.stringify(newProduct));
              await productService.addProduct(newProduct); 
              const query = await ProductModel.paginate({}, {limit: 40});
                const { docs, ...rest } = query;
                let products = docs.map((doc) => {
                return { _id: doc._id, title: doc.title, description: doc.description,thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock, category: doc.category, code: doc.code };
                });
              socketServer.emit('updatedProducts', products);
          } catch (error) {
             throw new Error(error.message);
          }
      });
      socket.on('deleteProduct', async (_id)=>{
          try {
              await productService.deleteProduct(_id);
              const products = await productService.getAll();
              socketServer.emit('updatedProducts', products);
          } catch (error) {
              throw new Error(error.message); 
          }
      });
      socket.on('newMessage', async (msg)=>{
        try {
            await chatService.newMessage(msg.user, msg.message);
            const allMsgs = await chatService.getAll();
            socketServer.emit('updatedMessages', allMsgs);
        } catch (error) {
            throw new Error(error.message); 
        }
      })
  });
}

