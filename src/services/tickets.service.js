import { TicketMethods, UserMethods } from "../dao/factory.js";
import { v4 as uuidv4 } from 'uuid';
export class TicketService{


    async createTicket(tk){

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
        
    }

    async getTkById(email){


        let tk = await TicketMethods.findOne(email)
        return tk

    }

}
