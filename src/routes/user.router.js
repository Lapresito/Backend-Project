import express from 'express';
import { usersController } from '../controllers/users.controller.js';
import { uploader } from '../utils/multer.js';

const usersRouter = express.Router();

usersRouter.post("/premium/:id", usersController.makePremium);
// usersRouter.get("/", usersController.getAllUsers);
// usersRouter.get("/:id", usersController.getUserByEmail);
usersRouter.delete("/", usersController.findAndDelete);
// usersRouter.post("/profile", uploader.storageProfile.single('file'), usersController.uploadProfileImg);
// usersRouter.post("/document/:id", usersController.uploadDocument);
// usersRouter.post("/product/:id", usersController.uploadProductImg);
export default usersRouter;