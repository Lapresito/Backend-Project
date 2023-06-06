import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import realTimeProductsRouter from './routes/real.time.products.router.js';
import chatRouter from './routes/chat.router.js';
import path from 'path';
import handlebars from 'express-handlebars';
import { __dirname } from "./utils/dirname.js";
import { connectMongo } from './utils/mongo.js';
import { connectSocket } from './utils/sockets.js';



const app = express();
const PORT = 8080;


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
app.use('/', chatRouter);

const httpServer = app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`App listening on port http://localhost:${PORT}`);
});

connectMongo();
connectSocket(httpServer);

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    });
});