import { TicketMethods, UserMethods } from "../dao/factory.js";
import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger.js";
import transport from "../utils/mailer.js";

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
            await transport.sendMail({
                from: process.env.GOOGLE_EMAIL,
                to: `${tk.purchaser}`,
                subject: "E-commerce purchase",
                html: `
                          <div>
                              <h1>Your purchase was successful</h1>
                              <p>Ticket details:</p>
                              <p>Code: ${ticket.code}</p>
                              <p>Amount: $${ticket.amount}</p>
                              <p>${ticket.purchase_datetime}</p>
                              <p>Purchased by: ${ticket.purchaser}</p>
                          </div>
                      `
              });
            
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
