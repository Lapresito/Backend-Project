import { Server } from 'socket.io';

export function connectSocket(httpServer){

  const socketServer = new Server(httpServer);
  socketServer.on('connection', async (socket) => {
      console.log(`New user connected: ${socket.id}`);
      socket.on('newProduct', async (newProduct) => {
          try {
              console.log(JSON.stringify(newProduct));
              await productManager.addProduct(newProduct); 
              const products = await productManager.readDataFile();
              socketServer.emit('updatedProducts', products);
          } catch (error) {
             throw new Error(error.message) 
          }
      });
      socket.on('deleteProduct', async (id)=>{
          try {
              await productManager.deleteProduct(id)
              const products = await productManager.readDataFile();
              socketServer.emit('updatedProducts', products);
          } catch (error) {
              throw new Error(error.message) 
          }
      })
  });
}

