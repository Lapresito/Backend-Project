const express = require('express');
const ProductManager = require('./ProductManager.js')


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// app.use(express.static(path.resolve('public')));

const PORT = 8080;
const productManager = new ProductManager('./src/products.json')

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
})

app.get("/api/products", async (req, res) => {

    try {
        let limit = req.query.limit;
        const products = await productManager.getProducts();
        if (!limit) {
            return res.status(200).json(products)
        }
        limit = parseInt(limit)
        if (isNaN(limit)) {
            throw new Error('Limit query has to be a valid number')
        }
        res.status(200).json(products.slice(0, limit))
    } catch (error) {
        res.status(400).json({error: error.message})
    }

})


app.get("/api/products/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const product = await productManager.getProductsById(parseInt(id));
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

})