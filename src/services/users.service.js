import { UserMethods } from "../dao/factory.js";
import { v4 as uuidv4 } from 'uuid';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import logger from "../utils/logger.js";
import transport from "../utils/mailer.js";


export class UserService{

    async getAll(){
        try {
            const users = await UserMethods.find();
            return users;
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }

    async updateUser(userTk){
        try {
            const userTicket = userTk;
            const updatedUser = await UserMethods.updateOne();
            
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }
    async findOne(email){
        try {
            const user = UserMethods.findOne(email);
            return user;
            
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }
    async getUserTks(email){
        try {
            const user = await this.findOne(email);
            let userTks = user.purchases;
            return userTks;
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }
    async makeUserPremium(email){
        try {
            const user = await this.findOne(email);
            if(user.rol === 'user'){
                await UserMethods.rolToPremium(email)
            }
            else if(user.rol === 'premium'){
                await UserMethods.rolToUser(email)
            }
            
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }
    async findInactivity(){
        try {
            const deletedUsers = await UserMethods.findInactivity();
            return deletedUsers;
            
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }
    async findAndDeleteInactivity(){
        try {
            const deletedUsers = await UserMethods.findAndDelete()
            return deletedUsers;
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }

    async uploadUserImage(email, img){
        try {
            const userImg = await UserMethods.uploadUserImage(email);
            return userImg;
        } catch (error) {
            logger.error({error: error, errorMsg: error.message})
            throw new Error(error.message);
        }
    }
    async recoverPassword(email) {
        try {
            // If exist an active code, send an advice.
            const existingCodes = await UserMethods.findCode(email);
    
            for (const code of existingCodes) {
                if (code.expire > Date.now()) {
    
                    await transport.sendMail({
                        from: process.env.GOOGLE_EMAIL,
                        to: email,
                        subject: "Recovery Code Already Exists",
                        html: `
                            <div>
                                <h1>A recovery code already exists for your account.</h1>
                                <p>Please use the existing code and try again later.</p>
                            </div>
                        `
                    });
                    return;
                }
            }
    
            //If doesnt exist any code, create new one
            const newCode = uuidv4().toString();
            const expire = Date.now() + 3600000; // date now + 1 hour
            const hashedCode = createHash(newCode);
            const createdCode = { email, code: hashedCode, expire };
            await UserMethods.createRecoveryCode(createdCode);
            await transport.sendMail({
                from: process.env.GOOGLE_EMAIL,
                to: email,
                subject: "Recovery code",
                html: `
                    <div>
                        <h1>Your verification code is:</h1>
                        <h2>${newCode}</h2>
                        <p>Remember it, and use it on here:</p>
                        <a href='${process.env.API_URL}${process.env.PORT}/session/verify-recover'>click here</a>
                    </div>
                `
            });
        } catch (error) {
            logger.error({ error: error, errorMsg: error.message });
            throw new Error(error.message);
        }
    }
    
    
    async verifyRecover(verify) {
        try {
            const realCode = await UserMethods.findCode(verify.email);
            console.log(verify, 'esteesquellega');
    
            const targetCode = verify.code;

            for (const codeObj of realCode) {
                if (isValidPassword(targetCode, codeObj.code)) {
                    console.log('¡Código encontrado!');
                    const newPassword = createHash(verify.password);
                    await UserMethods.updateUserPassword(verify.email, newPassword);
                    console.log('Password actualized')
                    break;
                }
            }
        } catch (error) {
            logger.error({ error: error, errorMsg: error.message });
            throw new Error(error.message);
        }
    }
}
