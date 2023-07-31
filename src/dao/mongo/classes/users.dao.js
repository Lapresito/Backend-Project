import { UserModel } from "../models/users.model.js";



class UserClass{
    async find(){
        const users = await UserModel.find({})
        return users
    }
}


export const userModel = new UserClass;