import { UserService } from "../services/users.service.js";
import config from '../config/config.js';

const usersService = new UserService


class UserController {
    async makePremium(req,res){
        try {
            const email = req.params.id;
            const user = await usersService.makeUserPremium(email);
            res.status(200).json({
                status: "success",
                message: 'Rol changed correctly',
                payload: user
            })
            
        } catch (error) {
            return res.status(500).render('error', { error: error.message})
        }
    }
    async findAndDelete(req,res){
        try {
            const deletedUsers = await usersService.findInactivity();
            await usersService.findAndDeleteInactivity();
            res.status(200).json({
                status: "success",
                message: 'Inactive users were deleted successfully',
                payload: deletedUsers
            })
        } catch (error) {
            return res.status(500).render('error', { error: error.message})
        }
    }

    async uploadProfileImg(req, res){
        try {
            const img = req.body;
            img.picture = `${config.apiUrl}${config.port}/` + req.file.filename;
            
            
            res.status(200).json({
                status: "success",
                message: 'Profile image was uploaded successfully',
                payload: { name: img.name, link: img.picture }
            })
            
        } catch (error) {
            return res.status(500).render('error', { error: error.message})
        }
    }

}

export const usersController = new UserController;