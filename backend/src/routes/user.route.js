import express from "express";
import {createResponse} from "../utils/responseGenerator.util.js";
import { createError } from "../utils/errorGenerator.util.js";
import { User } from "../models/user.model.js";
import { UserInfo } from "../models/userInfo.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"
import runGemini from "../utils/Gemini.util.js";
import uploadOnCloudinary from "../utils/cloudinary.util.js"
const userRouter=express.Router()

userRouter.post("/signup",asyncHandler(async(req,res,next)=>{
    const {userName,email,password}=req.body;
    console.log("reached backed request for signup")
    if(!userName){
        return next(createError(400,`All fields must be filled. Username can not empty!`,
            "Field/s not filled from frontend side, validation checked from backend."));
    }
    if(!email){
        return next(createError(400,`All fields must be filled. Email can not empty!`,
            "Field/s not filled from frontend side, validation checked from backend."));
    }
    if(!String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            return next(createError(400,`Email format is not correct!! Please recheck email address. `,
                "Field/s filled with wrong format from frontend side, validation checked from backend."));
    }
    if(!password){
        return next(createError(400,`All fields must be filled. Password can not empty!`,
            "Field/s not filled from frontend side, validation checked from backend."));
    }
    const data=await User.findOne({email});
    if(data){
        return next(createError(400,"Email is already in use. Please login instead of signup.",
            "User already exists in database, validation checked from backend."
        ));
    }
    const user=await User.create({userName,email,password});
    const {userName:uN,email:e}=user;
    return createResponse(res,{userName:uN,email:e});
}))
userRouter.post("/signin",asyncHandler(async(req,res,next)=>{
    console.log("reached request for sign in")
    console.log(req.body)
    const {email,password}=req.body;
    if(!email){
        return next(createError(400,`All fields must be filled. Email can not empty!`,
            "Field/s not filled from frontend side, validation checked from backend."));
    }
    if(!String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            return next(createError(400,`Email format is not correct!! Please recheck email address. `,
                "Field/s filled with wrong format from frontend side, validation checked from backend."));
    }
    if(!password){
        return next(createError(400,`All fields must be filled. Password can not empty!`,
            "Field/s not filled from frontend side, validation checked from backend."));
    }
    const user=await User.findOne({email});
    // console.log(email);
    // console.log(user);
    if(!user){
        return next(createError(400,"User does not exists, Please check your email id!!",
            "User with following email does not exists in db, validation checked from backend."));
    }
    if(! await user.comparePassword(password) ) {
        return next(createError(400,"Password does not match for this email_id. Please correct your password.",
            "Validation checked from backend"
        ));
    }
    const accessToken=await user.generateAccessToken();
    // const refreshToken=await user.generateRefreshToken();
    const {userName:uN, email:e,_id}=user;
    // const options={
    //     httpOnly:true,
    //     secure:true
    // }
    return res.status(200)
            // .cookie("refreshToken",refreshToken,options)
            .json({success:true,result:{accessToken:accessToken,userName:uN,email:e,_id}});
}))

userRouter.get("/signout",authMiddleware,asyncHandler(async(req,res,next)=>{
    // console.log("here")
    // await User.findByIdAndUpdate(req.body._id,
    //     {
    //         $unset:{
    //             refreshToken:1,
    //         }
    //     },
    //     {
    //         new:true
    //     }
    // )
    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200)
            // .clearCookie("refreshToken",options)
            .json({success:true,result:{accessToken:"",userName:"",email:"",_id:""}});
}))


// userRouter.get("/profile",authMiddleware,asyncHandler(async (req,res)=>{
//     const {userName,email}=req.user;
//     return createResponse(res,{userName,email});
// }));
userRouter.get("/getuserportfolios",authMiddleware,asyncHandler(async (req,res)=>{
    const user=await User.findOne({_id:req.user._id});
    if(user && user.userInfo){
    // console.log(user.userInfo)
        return createResponse(res,{userInfo:user.userInfo});
    }
    else{
        // return next(createError(400, "Node user" ,"UserInfo not found from backend"));
        return createResponse(res,{});
    }
}));
// userRouter.get('/createportfolioform',asyncHandler(async(req,res)=>{
//     return createResponse(res,req.body);
// }))
userRouter.post('/submitportfolioform',authMiddleware,asyncHandler(async(req,res)=>{
    // const {_id}=await UserInfo.create(req.body);
    // const user=await User.findOneAndUpdate(
    //     {_id:req.user._id},
    //     {userInfo:_id}
    // )
    console.log("here submit by form reached")
    console.log(req.body);
    return createResponse(res, req.body);
}))
// userRouter.get('/createportfolioresume',authMiddleware,asyncHandler(async(req,res)=>{
//     return createResponse(res,req.body);
// }))
userRouter.post('/submitportfolioresume',authMiddleware,upload.single("resume"),asyncHandler(async(req,res)=>{
    console.log("received call here at submitportfolioresume");
    console.log(req.file)
    const result=await runGemini(req.file);
    const parsedResult=JSON.parse(result);
    const resultURL=await uploadOnCloudinary(req.file.path);
    console.log("resultURL",resultURL.secure_url); 
    console.log("result",result);
    const {_id}=await UserInfo.create(parsedResult);
    const user=await User.findOneAndUpdate(
        {_id:req.user._id},
        {userInfo:_id}
    )
    return createResponse(res, parsedResult);
}))

export default userRouter;
// {
//     "userName": "xyz",
//     "email": "aa@gmail.com",
//     "profileImage_imageURI": "",
//     "profileImage_dimensionX": "",
//     "profileImage_dimensionY": "",
//     "profileImageCaption": "",
//     "profileImageSubCaption": "",
//     "sections_sectionHeader": "",
//     "sections_bullets_bulletDisplayImage_imageURI": "",
//     "sections_bullets_bulletDisplayImage_dimensionX": "",
//     "sections_bullets_bulletDisplayImage_dimensionY": "",
//     "sections_bullets_bulletDisplayImage_bulletHeader": "",
//     "sections_bullets_bulletDisplayImage_bulletText": ""
// }