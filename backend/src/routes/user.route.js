import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
import "mongoose";
import {
    SignUp,
    SignIn,
    SignOut,
    GetAllUserPortfolios,
    DeletePortfolioById,
    SubmitPortfolioForm,
    SubmitPortfolioResume
} from "../controllers/UserControllers/user.controllers.js";

const userRouter=express.Router()

userRouter.post("/signup",SignUp)
userRouter.post("/signin",SignIn)
userRouter.get("/signout",authMiddleware,SignOut)
userRouter.get("/getuserportfolios",authMiddleware,GetAllUserPortfolios);
userRouter.delete("/deleteportfolio/:_id",authMiddleware,DeletePortfolioById);
userRouter.post('/submitportfolioform',authMiddleware,upload.any(),SubmitPortfolioForm)
userRouter.post('/submitportfolioresume',authMiddleware,upload.single("resume"),SubmitPortfolioResume)

export default userRouter;