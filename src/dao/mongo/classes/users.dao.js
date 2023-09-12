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
    async changeRol(email){
        const user = await UserModel.findOne({ email: email});
        await UserModel.updateOne({email: email},  {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: 'premium'
        });
    }
}


export const userModel = new UserClass;