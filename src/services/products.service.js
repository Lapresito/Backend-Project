import { ProductMethods } from "../dao/factory.js";
import Errors from "../errors/enums.js";
import CustomError from "../errors/custom-error.js";
import { generateProductErrorInfo } from "../errors/product-error.js";

export class ProductService {
    async getAll(page, limit, sort, query) {
        try {

            const queryResult = await ProductMethods.getAll(page, limit, sort, query)
            const {
                docs,
                ...rest
            } = queryResult;
            let products = docs.map((doc) => {
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
            let product = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                category: category
            }
            if (!code || !title || !description || !price || !thumbnail || !stock || !category) {
                CustomError.createError({
                    name: "Empty fields",
                    cause: generateProductErrorInfo(product),
                    message: "Empty fields, please check it",
                    code: Errors.EMPTY_FIELDS,
                });
            }
        } catch (error) {
            console.log(error)
            throw new Error(error.message);

        }
    }
    async addProduct(product) {
        try {
            await this.productValidation(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category);
            let customA = {}
            let customB = {
                limit: 40
            }
            const query = await ProductMethods.paginate(customA, customB);
            const {
                docs,
                ...rest
            } = query;
            let products = docs.map((doc) => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    thumbnail: doc.thumbnail,
                    price: doc.price,
                    stock: doc.stock
                };
            });
            let checkCode = products.find((pCode) => pCode.code === product.code);
            if (checkCode) {
                throw new Error('Already exists a product with that code');
            }
            const newProduct = await ProductMethods.create({
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
            const product = await ProductMethods.findOne(_id);
            return product;
        } catch (error) {
            CustomError.createError({
                name: "That product doesnt exist",
                cause: "The product you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
                message: "The product you have looking for doesnt exist.",
                code: Errors.NO_PRODUCT,
            })
        }

    }
    async updateProduct(_id, product) {
        try {
            if (!_id) {
                CustomError.createError({
                    name: "That product doesnt exist",
                    cause: "The product you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
                    message: "The product you have looking for doesnt exist.",
                    code: Errors.NO_PRODUCT,
                });
            }
            this.productValidation(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category);
            const updatedProduct = await ProductMethods.updateOne(_id, product);
            console.log(`The product with id: ${_id} was updated succesfully!`);
            return updatedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteProduct(_id) {
        try {
            const deletedProduct = await ProductMethods.deleteProduct(_id);
            console.log(`The product with id: ${_id} was deleted succesfully!`);
            return deletedProduct;
        } catch (error) {
            CustomError.createError({
                name: "That product doesnt exist",
                cause: "The product you have looking for doesnt exist in db. Error in find it, it could be a wrong id, please check it",
                message: "The product you have looking for doesnt exist.",
                code: Errors.NO_PRODUCT,
            });
        }
    }
    async getProductData(page) {
        let customA = {}
        let customB = {
            page: page || 1,
            limit: 3
        }
        const query = await ProductMethods.paginate(customA, customB);
        return query
    }

    async getArrProductsData(arr) {
        const productsData = [];

        for (const id of arr) {
            const product = await this.getProductById(id);
            productsData.push(product);
        }

        return productsData;
    }

}

export default ProductService;