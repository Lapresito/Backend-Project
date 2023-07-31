import { chatModel } from '../dao/mongo/classes/chat.dao.js';

export class ChatService{
    async getAll(){
        try {
            const messages = await chatModel.findLeaned();
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
            const newMsg = await chatModel.create(newMessage);
            console.log(`New message from ${user}`);
            return newMsg;
        } catch (error) {
            throw new Error(error.message);
        }

    }
}