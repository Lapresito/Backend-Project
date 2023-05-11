const express = require('express');
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')
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

app.listen(PORT, () => {
    console.log(__dirname)
    console.log(`App listening on port http://localhost:${PORT}`)
});

app.get("*", (req, res)=>{
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    })
});