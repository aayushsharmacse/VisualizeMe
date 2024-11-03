import {createResponse} from "../../utils/responseGenerator.util.js";
import { createError } from "../../utils/errorGenerator.util.js";
import { User } from "../../models/user.model.js";
import { UserInfo } from "../../models/userInfo.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import runGemini from "../../utils/Gemini.util.js";
import uploadOnCloudinary from "../../utils/cloudinary.util.js";
import "mongoose";


const SignUp=asyncHandler(async(req,res,next)=>{
    const {userName,email,password}=req.body;
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
});

const SignIn=asyncHandler(async(req,res,next)=>{
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
    const {userName:uN, email:e,_id}=user;
    return res.status(200)
            .json({success:true,result:{accessToken:accessToken,userName:uN,email:e,_id}});
});

const SignOut=asyncHandler(async(req,res,next)=>{
    return res.status(200)
            .json({success:true,result:{accessToken:"",userName:"",email:"",_id:""}});
});

const GetAllUserPortfolios=asyncHandler(async (req,res)=>{
    const user=await User.findOne({_id:req.user._id});
    if(user && user.userInfo && user.userInfo.length!==0){
        return createResponse(res,{userInfo:user.userInfo});
    }
    else{
        return createResponse(res,{});
    }
})

const DeletePortfolioById=asyncHandler(async (req,res)=>{
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
})

const SubmitPortfolioForm=asyncHandler(async(req,res)=>{
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
});

const SubmitPortfolioResume=asyncHandler(async(req,res)=>{
    const result=await runGemini(req.file);
    const parsedResult=JSON.parse(result);
    const resultURL=await uploadOnCloudinary(req.file.path);
    const {_id}=await UserInfo.create(parsedResult);
    const user=await User.findById(req.user._id);
    user.userInfo.push(_id);
    await user.save();
    return createResponse(res, parsedResult);
});

export {
    SignUp,
    SignIn,
    SignOut,
    GetAllUserPortfolios,
    DeletePortfolioById,
    SubmitPortfolioForm,
    SubmitPortfolioResume
};