import logger from "../../../utils/logger.js";
import { UserModel } from "../models/users.model.js";
import { RecoverCodesModel } from "../models/recoverCodes.model.js"



class UserClass {
    async find() {
        const users = await UserModel.find({})
        return users
    }

    async findOne(email) {
        const user = await UserModel.findOne({
            email: email
        });
        return user;
    }
    async rolToPremium(email) {
        const user = await UserModel.findOne({
            email: email
        });
        await UserModel.updateOne({
            email: email
        }, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: 'premium'
        });
    }
    async rolToUser(email) {
        const user = await UserModel.findOne({
            email: email
        });
        await UserModel.updateOne({
            email: email
        }, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: 'user'
        });
    }
    async findInactivity(){
        const deadlineTime = Date.now() - 172800000; // 2 days in miliseconds
        const inactivityUsers = await UserModel.find({ last_connection: { $lt: new Date(deadlineTime) } });
        return inactivityUsers
    }
    async findAndDelete(){
            const deadlineTime = Date.now() - 172800000; // 2 days in miliseconds
        
            // Find and Delete users with last_connection minor than 2 days before
            const usersWithNoActivity = await UserModel.deleteMany({ last_connection: { $lt: new Date(deadlineTime) } });
        
            if (usersWithNoActivity.deletedCount > 0) {
              logger.warn(`${usersWithNoActivity.deletedCount} inactivity users were deleted.`);
            } else {
              logger.info('There are no inactive users');
            }
    }

    async uploadUserImage(email, img){

        const userImg = await UserModel.find({email: email});
    }
    async createRecoveryCode(code){
        await RecoverCodesModel.create(code);
    }
    async findCode(email){
        const findedCode = await RecoverCodesModel.find({email: email});
        return findedCode;
    }
    async updateUserPassword(email, newPassword){
        await UserModel.updateOne({email}, {$set:{password: newPassword}});
    }
}


export const userModel = new UserClass;