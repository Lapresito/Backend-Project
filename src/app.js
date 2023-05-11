const express = require('express');
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

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