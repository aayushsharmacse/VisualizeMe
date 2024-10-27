import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.util.js";
import {User} from "../models/user.model.js";
import { createError } from "../utils/errorGenerator.util.js";
const authMiddleware=asyncHandler(async(req,res,next)=>{
    // console.log(req.cookies);
    // console.log(req.headers);
    const authheader=req.header("Authorization")
    if(!authheader || authheader.split(" ").length!=2){
        return next(createError(400,"You are not authorized to move forward !!","Authorization header/token not found in request"));
    }
    const usertoken=authheader.split(" ")[1];
    try{
    const data=jwt.verify(usertoken,process.env.ACCESS_TOKEN_SECRET);
    req.user=data;
    }
    catch(err){
        return next(createError(400,"You are not authorized to move forward !!","Was not able to verify jwt token at backend, jwt token might be wrong"))
    }
    
    return next();
});

export default authMiddleware;