import express from "express";
import {createResponse} from "../utils/responseGenerator.util.js";
import { createError } from "../utils/errorGenerator.util.js";
import { User } from "../models/user.model.js";
import { UserInfo } from "../models/userInfo.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import authMiddleware from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"
import runGemini from "../utils/Gemini.util.js";
import uploadOnCloudinary from "../utils/cloudinary.util.js";
import "mongoose";
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
    // const options={
    //     httpOnly:true,
    //     secure:true
    // }

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
    if(user && user.userInfo && user.userInfo.length!==0){
    // console.log(user.userInfo)
        return createResponse(res,{userInfo:user.userInfo});
    }
    else{
        // return next(createError(400, "No user" ,"UserInfo not found from backend"));
        return createResponse(res,{});
    }
}));

userRouter.get("/getsingleuserportfolio/:_id",authMiddleware,asyncHandler(async (req,res)=>{
    // const user=await User.findOne({_id:req.user._id});
    // if(user && user.userInfo && user.userInfo.length!==0){
    console.log("entered gets ingle portfolio user, search for id=",req.params._id)
        const userInfo=await UserInfo.findById(req.params._id);
        return createResponse(res,{userInfo:userInfo});
    // }
    // else{
        // return next(createError(400, "No user" ,"UserInfo not found from backend"));
        // return createResponse(res,{});
    // }
}));

userRouter.delete("/deleteportfolio/:_id",authMiddleware,asyncHandler(async (req,res)=>{
    const user=await User.findOne({_id:req.user._id});
    if(user && user.userInfo){
        console.log("user.userInfo=",user.userInfo)
            user.userInfo=user.userInfo.filter((portfolioId)=>{
                //check here string vs objectId case
                //console.log("portfolioId.equals(req.params._id)",portfolioId.equals(req.params._id))
                return !portfolioId.equals(req.params._id)
            });
            await user.save();
        console.log("user.userInfo=",user.userInfo)
        await UserInfo.findByIdAndDelete(req.params._id);
        return createResponse(res,{userInfo:user.userInfo});
    }
    else{
        return createResponse(res,{});
    }
}));

// userRouter.get('/createportfolioform',asyncHandler(async(req,res)=>{
//     return createResponse(res,req.body);
// }))
userRouter.post('/submitportfolioform',authMiddleware,upload.any(),asyncHandler(async(req,res)=>{
    console.log("came at babckend submit portfolio by form")
    // console.log(JSON.parse(req.body.portfolio))
    const parsedObjectPortfolio=JSON.parse(req.body.portfolio);
    if(parsedObjectPortfolio.hasOwnProperty("_id")){
        let userInfo=parsedObjectPortfolio;
        for(let file of req.files){
            const resultURL=await uploadOnCloudinary(file.path);
            console.log(file.fieldname,resultURL.url);
            if(file.fieldname==="profileImage"){
                userInfo.profileImage={
                    imageURI:resultURL.url
                }
            }else{
                const [_,sectionIndex,bulletIndex]=file.fieldname.split("_");
                userInfo.sections[sectionIndex].bullets[bulletIndex].bulletDisplayImage={
                    imageURI:resultURL.url
                }
            }
        }
        const newuserInfo=await UserInfo.findByIdAndUpdate({_id:parsedObjectPortfolio._id},userInfo,{new:true})
        return createResponse(res, newuserInfo);
    }
    const userInfo=await UserInfo.create(parsedObjectPortfolio);
    // console.log(userInfo.sections[0].bullets)
    // console.log("req.file=\n",req.files)
    for(let file of req.files){
        const resultURL=await uploadOnCloudinary(file.path);
        console.log(file.fieldname,resultURL.url);
        if(file.fieldname==="profileImage"){
            userInfo.profileImage={
                imageURI:resultURL.url
            }
        }else{
            const [_,sectionIndex,bulletIndex]=file.fieldname.split("_");
            userInfo.sections[sectionIndex].bullets[bulletIndex].bulletDisplayImage={
                imageURI:resultURL.url
            }
        }
    }
    userInfo.save();
    const {_id}=userInfo;
    const user=await User.findById(req.user._id);
    user.userInfo.push(_id);
    await user.save();
    return createResponse(res, userInfo);
}))
// userRouter.get('/createportfolioresume',authMiddleware,asyncHandler(async(req,res)=>{
//     return createResponse(res,req.body);
// }))
userRouter.post('/submitportfolioresume',authMiddleware,upload.single("resume"),asyncHandler(async(req,res)=>{
    // console.log("received call here at submitportfolioresume");
    const result=await runGemini(req.file);
    const parsedResult=JSON.parse(result);
    const resultURL=await uploadOnCloudinary(req.file.path);
    const {_id}=await UserInfo.create(parsedResult);
    // console.log(_id);
    const user=await User.findById(req.user._id);
    // console.log(user)
    user.userInfo.push(_id);
    await user.save();
    // console.log(user)
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