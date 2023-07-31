import { ProductModel } from "../models/products.model.js";

class ProductClass{
    async getAll(page, limit, sort, query){
        const options = {
            page: page || 1,
            limit: limit || 4,
            sort: sort || "asc"
        };
        const queryOptions = {};
        if(query){
            queryOptions.$text = {$search: query}
        };
        if(sort){
            options.sort = {
                price: sort
            }
        };
        let queryResult = await ProductModel.paginate(queryOptions,options);

        return queryResult;
    }
    async create(product){
        const newProduct = await ProductModel.create(product);
        return newProduct;
    }
    async paginate(customA, customB){
       let paginated = await ProductModel.paginate(customA, customB);
       return paginated;
    }
    async findOne(id){
        const product = await ProductModel.findOne({ _id: id});
        return product;
    }
    async updateOne(id, product){
        await ProductModel.updateOne({_id: id},  {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: true
        });
    }
    async deleteProduct(id){
        const deletedProduct = await ProductModel.deleteOne({_id: id});
        return deletedProduct;
    }

}


export const productModel = new ProductClass;