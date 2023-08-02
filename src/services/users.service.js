import { UserMethods } from "../dao/factory.js";

export class UserService{

    async getAll(){
        try {
            const users = await UserMethods.find()
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
