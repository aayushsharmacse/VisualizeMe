import express from "express";
import {createResponse} from "../utils/responseGenerator.util.js";
import { createError } from "../utils/errorGenerator.util.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";

const userRouter=express.Router()

userRouter.get("/",asyncHandler(async (req,res)=>{
    console.log(req);
    console.log(res);
    return createResponse(res,{sam:5,ram:10});
}));
userRouter.get("/:userName/:password/:email",asyncHandler(async (req,res)=>{
    const data=req.params;
    const user=await User.create(data);
    return createResponse(res,{sam:5,ram:10});
}));

// userRouter.register
export default userRouter;