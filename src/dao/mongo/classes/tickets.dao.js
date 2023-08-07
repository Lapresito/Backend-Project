import { TicketModel } from "../models/tickets.model.js";


class TicketClass{

    async create(newTicket){
        const newTk = await TicketModel.create(newTicket)
        return newTk;
    }

    async findOne(id){
        const tk = await TicketModel.findOne({_id: id})
        return tk;
    }


}


export const ticketModel = new TicketClass;