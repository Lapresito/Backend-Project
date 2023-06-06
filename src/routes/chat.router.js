import express from 'express';
const chatRouter = express.Router();

chatRouter.get("/", (req, res)=>{
    try {
        return res.render("chat",{});
    } catch (error) {
        throw new Error(error.message)
    }
})

export default chatRouter;
