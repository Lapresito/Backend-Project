import { TicketModel } from "../models/tickets.model.js";


class TicketClass{

    async create(newTicket){
        const newTk = await TicketModel.create(newTicket)
    }


}


export const ticketModel = new TicketClass;