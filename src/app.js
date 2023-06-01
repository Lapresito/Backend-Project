import express from 'express';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import path from 'path';
import handlebars from 'express-handlebars';
import { __dirname, connectMongo} from "./utils.js";

import ProductManager from "./ProductManager.js";
const productManager = new ProductManager('./src/products.json');

const app = express();
const PORT = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use('/', viewsRouter);
app.use('/', realTimeProductsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`App listening on port http://localhost:${PORT}`);
});

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

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    });
});