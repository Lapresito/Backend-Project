import { generateProduct } from "../utils/faker.js";
import logger from "../utils/logger.js";

export class MockingService{

    getProducts(){

        const products = [];

        for (let i = 0; i < 100; i++) {
          products.push(generateProduct());
        }
        
        return products
    }

    loggerTest(){

      logger.info('Lets see what happend when we do something wrong 😲😲 ')
      logger.warn('Something very Wrong Happend')
      logger.error('Something very very Wrong Happend')
      logger.fatal('Something very very very Wrong Happend')

      throw new Error ('did you see? please dont mess up with errors')
    }

}