import { TicketMethods } from "../dao/factory.js";
import { v4 as uuidv4 } from 'uuid';
export class TicketService{


    async createTicket(tk){

        let ticket = {
            title: "title",
            description:"desc",
            code: uuidv4(),
            amount: tk.amount,
            products: tk.products,
            quantity: tk.quantity,
            purchase_datetime: Date(),
            purchaser: tk.purchaser
            
        };
        let newTk = await TicketMethods.create(ticket);
        return newTk;
        
    }

}
