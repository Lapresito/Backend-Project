import { MockingService } from "../services/mocking.service.js";
const mockingService = new MockingService;

class MockingController{

    async getProducts(req, res){

        let products = mockingService.getProducts()
      
        res.json({ status: "success", payload: products });
      };
}

export const mockingController = new MockingController;
