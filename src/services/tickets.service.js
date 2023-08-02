import { TicketMethods } from "../dao/factory.js";

export class TicketService{


    async createTicket(tk){

        const newTk = TicketMethods.create(tk);
        return newTk
        
    }

}
