import { v4 as uuidv4 } from 'uuid';

export class ProductDTO{

    constructor(product){
        
            this.title =  product.title,
            this.description =  product.description, 
            this.price =  product.price,
            this.thumbnail =  product.thumbnail,
            this.code =  product.code || uuidv4(),
            this.stock =  product.stock  || 0,
            this.category  =  product.category
            this.owner = product.owner || 'admin'
        
    }
}