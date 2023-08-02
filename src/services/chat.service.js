import { ChatMethods } from '../dao/factory.js';

export class ChatService{
    async getAll(){
        try {
            const messages = await ChatMethods.findLeaned();
            return messages;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async newMessage(user, msg){
        try {
            const allMsgs = await this.getAll();
            let checkUser = allMsgs.find((usr) => usr.user === user);
            if (checkUser) {
                checkUser.message.concat(msg);
            }
            const newMessage = {user: user, message: msg}
            const newMsg = await ChatMethods.create(newMessage);
            console.log(`New message from ${user}`);
            return newMsg;
        } catch (error) {
            throw new Error(error.message);
        }

    }
}