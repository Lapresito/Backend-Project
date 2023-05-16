const express = require('express');
const { Server } = require('socket.io')
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')
const realTimeProductsRouter = require('./routes/realTimeProducts.router.js')
const path = require('path');
const handlebars = require('express-handlebars')

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','handlebars');

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use('/', viewsRouter);

app.use('/', realTimeProductsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(__dirname)
    console.log(`App listening on port http://localhost:${PORT}`)
});

const socketServer = new Server(httpServer);
socketServer.on('connection', (socket)=>{
    console.log(`Se abrio un canal de socket con ${socket.id}`)
    setInterval(()=>{
        socket.emit('testing_messages', {message: 'probando, estas en consola?'})
    }, 2000)
})

app.get("*", (req, res)=>{
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    })
});