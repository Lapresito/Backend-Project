import { userModel } from "../dao/mongo/classes/users.dao.js";

export class UserService{

    async getAll(){
        try {
            const users = await userModel.find()
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
