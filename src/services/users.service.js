import { UserMethods } from "../dao/factory.js";

export class UserService{

    async getAll(){
        try {
            const users = await UserMethods.find();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateUser(userTk){
        try {
            const userTicket = userTk;
            const updatedUser = await UserMethods.updateOne();
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(email){
        try {
            const user = UserMethods.findOne(email);
            return user;
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getUserTks(email){
        try {
            const user = await this.findOne(email);
            let userTks = user.purchases;
            return userTks;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
