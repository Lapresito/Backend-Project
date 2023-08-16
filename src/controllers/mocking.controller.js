import { MockingService } from "../services/mocking.service.js";
import logger from "../utils/logger.js";
const mockingService = new MockingService;

class MockingController{

    async getProducts(req, res){

        let products = mockingService.getProducts()
      
        res.json({ status: "success", payload: products });
      };

      async loggerTest(req,res){
        logger.http('HTTP request was successful')
        logger.debug(`The error test is working?`)
        let errorTest = mockingService.loggerTest();
        res.json({error: 'error test', message: errorTest})
      }
}

export const mockingController = new MockingController;
