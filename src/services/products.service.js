import { ProductModel } from "../dao/models/products.model.js";

export class ProductService {
    async getAll() {
        try {
            const products = await ProductModel.find({}).lean().exec();
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async productValidation(title, description, price, thumbnail, code, stock, category) {
        try {
            if (!code || !title || !description || !price || !thumbnail || !stock || !category) {
                throw new Error('Empty fields, please add all the statements');
            }
        } catch (error) {
            console.log(error)
            throw new Error(error.message);

        }
    }
    async addProduct(product) {
        try {
            await this.productValidation(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category);
            let products = await this.getAll()
            let checkCode = products.find((pCode) => pCode.code === product.code);
            if (checkCode) {
                throw new Error('Already exists a product with that code');
            }
            const newProduct = await ProductModel.create({
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                status: true,
                category: product.category,
                
            });
            console.log(`Product ${product.title} added succesfully`);
            return newProduct;
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message);
        }
    }
    async getProductById(_id) {
        try {
            const product = await ProductModel.findOne({ _id });
            return product;
        } catch (error) {
            throw new Error(error.message);
        }

    }
    async updateProduct(_id, product) {
        try {
            if (!_id) throw new Error('Invalid _id');
            this.productValidation(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category);
            const updatedProduct = await ProductModel.updateOne(
            {_id: _id}, 
            {
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                category: product.category,
                status: true
            });
            console.log(`The product with id: ${_id} was updated succesfully!`);
            return updatedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteProduct(_id) {
        try {
            const deletedProduct = await ProductModel.deleteOne({
                _id: _id
            });
            console.log(`The product with id: ${_id} was deleted succesfully!`);
            return deletedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default ProductService;