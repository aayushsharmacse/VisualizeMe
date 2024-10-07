import express from "express";
import {createResponse} from "../utils/responseGenerator.util.js";
// import { createError } from "../utils/errorGenerator.util.js";
const userRouter=express.Router()

userRouter.get("/",(req,res)=>{
    return createResponse(res,{sam:5,ram:10});
});

export default userRouter;