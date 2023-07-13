import { ProductModel } from "../dao/models/products.model.js";

export class ProductService {
    async getAll(page, limit, sort, query) {
        try {
            const options = {
                page: page || 1,
                limit: limit || 4,
                sort: sort || "asc"
            };
            const queryOptions = {};
            if(query){
                queryOptions.$text = {$search: query}
            }
            if(sort){
                options.sort = {
                    price: sort
                }
            }
            const queryResult = await ProductModel.paginate(queryOptions, options)
            const {docs, ...rest } = queryResult;
            let products = docs.map((doc)=>{
                return {
                    title: doc.title,
                    description: doc.description,
                    price: doc.price,
                    stock: doc.stock,
                    category: doc.category,
                    thumbnail: doc.thumbnail,
                    id: doc._id.toString()
                }
            })
            let prevPage = rest.prevPage
            let prevLink = prevPage ? `/products?page=${prevPage}` : null;
            let nextPage = rest.nextPage
            let nextLink = nextPage ? `/products?page=${nextPage}` : null;
            let links = {
                prevLink: prevLink,
                nextLink: nextLink
            }
            const data = {
                products: products,
                pagination: rest,
                links: links
            }
            return data;
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
            const query = await ProductModel.paginate({}, {limit: 40});
            const { docs, ...rest } = query;
            let products = docs.map((doc) => {
              return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock };
            });
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