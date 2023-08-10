import { generateProduct } from "../utils/faker.js";

export class MockingService{

    getProducts(){

        const products = [];

        for (let i = 0; i < 100; i++) {
          products.push(generateProduct());
        }
        
        return products
    }

}