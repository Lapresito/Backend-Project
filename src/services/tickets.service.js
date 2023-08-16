import { TicketMethods, UserMethods } from "../dao/factory.js";
import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger.js";

export class TicketService{


    async createTicket(tk){

        try {
            let ticket = {
                code: uuidv4(),
                amount: tk.amount,
                purchase_datetime: Date(),
                purchaser: tk.purchaser
                
            };
            let newTk = await TicketMethods.create(ticket);
            let user = await UserMethods.findOne(tk.purchaser);
            // toDo mandar mail del tk al purchaser utilizando nodemailer
            
            await user.purchases.push(newTk)
            await user.save();
            return newTk;
            
            
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }

    async getTkById(email){

        try {
            
            let tk = await TicketMethods.findOne(email)
            return tk
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }

    }

}
