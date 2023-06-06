import { ChatModel } from '../dao/models/chat.model.js'

export class ChatService{
    async getAll(){
        try {
            const messages = await ChatModel.find({}).lean().exec();
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
            const newMsg = await ChatModel.create({
                user: user,
                message: msg
            });
            console.log(`New message from ${user}`);
            return newMsg;
        } catch (error) {
            throw new Error(error.message);
        }

    }
}