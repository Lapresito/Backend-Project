import express from 'express';
import { usersController } from '../controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.post("/premium/:id", usersController.makePremium);
// usersRouter.get("/", usersController.getAllUsers);
// usersRouter.get("/:id", usersController.getUserByEmail);
usersRouter.delete("/", usersController.findAndDelete);
// usersRouter.post("/:id/documents", usersController.updateDocuments);

export default usersRouter;