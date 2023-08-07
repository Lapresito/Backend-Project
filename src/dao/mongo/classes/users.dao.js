import { UserModel } from "../models/users.model.js";



class UserClass{
    async find(){
        const users = await UserModel.find({})
        return users
    }

    async findOne(email){
        const user = await UserModel.findOne({ email: email});
        return user;
    }
}


export const userModel = new UserClass;